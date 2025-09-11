//Aqui vou definir qual rota vou entrar dependendo se o usuário ta logado ou não
import { BrowserRouter } from "react-router";

import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./ManagerRoutes";

import { Loading } from "../Components/Loading";

const isLoading = false;

const session = {
    user: {
        role: "",
    }
}

export function Routes() {
    function Route() {
        switch (session?.user.role) {
            case "employee":
                return <EmployeeRoutes />
            case "manager":
                return <ManagerRoutes />
            default:
                return <AuthRoutes />
        }
    }

    if(isLoading) {
        return <Loading />
    }

    return (
        //e aqui que fica meu BrowserRouter para eu conseguir dividir os acessos do meu usuário a partir dos acessos do mesmo
        <BrowserRouter>
            <Route />
            {/* {Route() /** Também funciona*/}
        </BrowserRouter>
    )
}