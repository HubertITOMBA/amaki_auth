"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners"
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
 


export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
     // console.log(token);
        
        if (success || error ) return;
     
        if (!token) {
            setError("Jeton manquant !!")
            return;
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Quelque chose s'est mal passée !")
            })

    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);
    
    return (
        <CardWrapper
            headerLabel= "Confirmer votre vérification"
            backButtonLabel="Retour à la connexion"
            backButtonHref="/auth/login"
        >
      <div className="flex items-center w-full justify-center">
        {!success && !error && (<BeatLoader />)}
         <FormSuccess message={success} />
         {!success && (
            <FormError message={error} /> 
         )}   
      </div> 
        </CardWrapper>
    )
}