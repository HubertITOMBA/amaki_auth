"use server"

import * as z from "zod";
import  { db } from "@/lib/db";
import { LoginSchema } from "@/schemas"

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { 
  sendVerificationEmail, 
  sendTwoFactorTokenEmail
} from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { 
    generateVerificationToken, 
    generateTwoFactorToken 
} from "@/lib/token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";


export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null,) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
          return { error: "Informations de connexion invalides !"}
    }

    const { email, password, code  } = validatedFields.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
          return { error: "L'email n'existe pas !" }
    }

    if (!existingUser.emailVerified) {
      const verificationToken = generateVerificationToken(existingUser.email);

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      )

      return { success: "E-mail de confirmation envoyé !"}
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
          const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );
          if (!twoFactorToken) {
            return { error: "Code invalide !"}
          }

          if (twoFactorToken.token !== code) {
            return { error: "Code invalide !"}
          }

          const hasExpired = new Date(twoFactorToken.expires) < new Date();
          if (hasExpired) {
            return { error: "Code expiré !"}
          }

          await db.twoFactorToken.delete({
             where: { id: twoFactorToken.id }
          });   

          const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
          if (existingConfirmation){
            await db.twoFactorConfirmation.delete({
              where: { id: existingConfirmation.id }
            });
          }

          await db.twoFactorConfirmation.create({
            data: {
              userId: existingUser.id,
            }
          })

    } else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email)
          await sendTwoFactorTokenEmail(
            twoFactorToken.email,
            twoFactorToken.token
          );
        return { twoFactor: true };
        } 
    }  

    try {
      await signIn("credentials", {
          email, 
          password, 
          redirectTo : callbackUrl || DEFAULT_LOGIN_REDIRECT,
      })

      console.log(email, password, DEFAULT_LOGIN_REDIRECT);


      } catch (error) {
          if (error instanceof AuthError) {
              switch (error.type) {
                case "CredentialsSignin":
                  return { error: "Informations d'identification invalides !" }
                default:
                  return { error: "Quelque chose s'est mal passée !" }
              }
            }
            throw error;
      }

}