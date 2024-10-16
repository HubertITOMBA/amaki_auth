"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";


export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);
    
    if (!validatedFields.success) {
        return { error: "Email invalide !"};
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    console.log(existingUser);

    if (!existingUser) {
        return { error: "Adresse email non trouvé !"};
    }

    const passwordResetToken = await generatePasswordResetToken(email);
        console.log(passwordResetToken);
        await sendPasswordResetEmail( 
        passwordResetToken.email,
        passwordResetToken.token
    )     
    
    return { success: "Le mail de réinitialisation a été envoyé !"}
}