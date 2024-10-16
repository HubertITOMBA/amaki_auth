"use client"

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

const AdminPage = () => {
    const role = useCurrentRole();

    const onServerActionClick = () => {
        admin()
        .then((data) => {
            if (data.error) {
                toast.error(data.error);
            }

            if (data.success) {
                toast.success(data.success);
            }
        })
   };

    const onApiRouteClick = () => {
        fetch("/api/admin")
            .then((response) => {
                if (response.ok) {
                    toast.success("API Route autorisé")
                } else {
                    toast.error("API Route Non autorisé");
                }
             })
   };

    return (
        <div>
            Page d'administration - Tableau de bord
            <div>
            <Card className="w-[600px]">
        <CardHeader>
          Current role:{role}
          <p className="text-2xl font-semibold text-center">🛂  Administrateur </p>
        </CardHeader>
        <CardContent className="space-y-4">
            <RoleGate allowedRole={UserRole.ADMIN}>
                 <FormSuccess message="Vous êtes autorisé à voir ce contenu !"/>
            </RoleGate>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only API Route
          </p>
          <Button onClick={onApiRouteClick}>
            Click to test
          </Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only Server Action
          </p>
          <Button onClick={onServerActionClick}>
            Click to test
          </Button>
        </div>
        </CardContent>
    </Card>
            </div>
        </div>
    )
}

export default AdminPage;