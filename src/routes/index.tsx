//Aqui vou definir qual rota vou entrar dependendo se o usuário ta logado ou não
import { BrowserRouter } from "react-router";

import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";

export function Routes() {
    return (
        //e aqui que fica meu BrowserRouter pra eu conseguir dividir os acessos do meu usuário a partir dos acessos do mesmo
        <BrowserRouter>
            <EmployeeRoutes />
        </BrowserRouter>
    )
}