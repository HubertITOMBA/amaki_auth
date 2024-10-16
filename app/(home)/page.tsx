
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
import HeaderLayout from "@/components/home/HeaderLayout";


const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})




export default function Home() {
  return (
         
    <>
     {/* <main className="flex w-full h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800"> */}
     <main className="flex w-full h-full flex-col items-center justify-center">
        <div className="space-y-6 text-center">
            <h1 className={cn(
              "text-6xl font-semibold text-white drop-shadow-md", 
              font.className,
              )}
            >
                🔐 Connexion
            </h1>
        
            <p className="text-white text-lgexit">Amicale des anciens élèves de Kipako depuis (home)</p>
            <div>
                <LoginButton  mode="modal"  asChild>
                  <Button variant="secondary" size="lg">
                    Se connecter
                  </Button>
               </LoginButton>
            </div>
        </div>      

    </main>
    </>
    
  );
}
