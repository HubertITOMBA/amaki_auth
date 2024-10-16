import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    await resend.emails.send({
        //  from: "webmaster.amaki@amaki.com",
        from: "onboarding@resend.dev",
        to: email,
        subject: "Votre code d'authetification 2FA",
        html: `<p>Votre code 2FA: ${token}</p>`
    })
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
     const resetLink = `${domain}/auth/new-password?token=${token}`;
    // const resetLink = `http://localhost:3001/auth/new-password?token=${token}`;
    
    await resend.emails.send({
      //  from: "webmaster.amaki@amaki.com",
        from: "onboarding@resend.dev",
        to: email,
        subject: "Renitialiser votre mot de passe",
        html: `<p>Cliquer<a href="${resetLink}"> ici </a> pour renitialiser votre mot de passe.</p>`
    })
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    // const confirmLink = `http://localhost:3001/auth/new-verification?token=${token}`;

    await resend.emails.send({
        //from: "webmaster.amaki@amaki.com",
       from: "onboarding@resend.dev",
        to: email,
        subject: "Confirmation de votre adresse email",
        html: `<p>Cliquer<a href="${confirmLink}"> ici </a> pour confirmer votre adresse email.</p>`
    });
}