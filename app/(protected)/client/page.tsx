"use client"

// import React from "react";
// import { currentUser } from "@/lib/auth";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
    //const user = await currentUser()
    const user = useCurrentUser();

    return (
         <UserInfo 
              label = "🔐 Client Component "
              user={user}
          />
    );
}
export default ClientPage;

