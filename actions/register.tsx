"use server"

import * as z from "zod";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

import { RegisterSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user";

import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";


export const register = async (values: z.infer<typeof RegisterSchema>, callbackUrl?: string | null,) => {
    const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
        return { error: "Informations de connexion invalides !"}
   }

   const { email, password, name } = validatedFields.data;
   const hashedPassword = await bcrypt.hash(password, 10);
    
   const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Cet email est déjà utilisé !"}
    }
 
    await db.user.create({
      data: {
          name,
          email,
          password: hashedPassword,
      },
    });
  
    const verificationToken = await generateVerificationToken(email);
      await sendVerificationEmail(
          verificationToken.email,
          verificationToken.token,
      );    
  
    return { success: "E-mail de confirmation envoyé !"}

}