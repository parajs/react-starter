import React from "react";
import router from "@/router";
import { useUserStore } from "@/stores";


export const withAuthentication = <P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.ComponentType<P> => {
    return (props: P) => {
        const { token } = useUserStore()

        if (!token) {
            router.navigate('/login');
            return null;
        }

        return <WrappedComponent {...props}  />;
    };
};

