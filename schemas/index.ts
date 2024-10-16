import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }
            return true;
        }, {
            message: "Le nouveau mot de passe est obligatoire !",
            path: ["newPassword"]
    })
    .refine((data) => {
        if (data.newPassword && !data.password) {
          return false;
        }
    
        return true;
      }, {
        message: "Le mot de passe est obligatoire !",
        path: ["password"]
    })

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Un mot de passe est requis"
    }),
    password: z.string().min(1, {
        message: "Un mot de passe est requis"
    }),
    code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "L'adresse e-mail est requise"
    }),
    password: z.string().min(6, {
        message: "Un minimum de 6 caractères requis"
    }),
    name: z.string().min(3, {
        message: "Le nom est obligatoire" 
    }),
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "L'adresse email est obligatoire"
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Un minimum de 6 caractères requis"
    }),
});
