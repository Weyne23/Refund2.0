import { Input } from "../Components/Input"
import { Button } from "../Components/Button"

//import { useState } from "react";
import { useActionState } from "react";
import { promise } from "zod";

export function SignIn() {
    //Foram removidos para usar o action que não precisa utilizar estados
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    //const [isLoading, setIsLoading] = useState(false);

    //Para o array que o "useActionState" retorna a primeira posição é o estado atual do formulário,  a segunda é qual action será executada e a terceira é se a requisição ainda está pendente ou não.

    //Já os parâmetros do "useActionState" são a função que iremos executar e conteúdo padrão que o "useActionState" tera respectivamente.
    const [state, formAction, isLoading] = useActionState(signIn, {
        email: "",
        password: ""
    });

    //prevState é o estado anterior do formulário e o formDate é ds dados do formulário
    async function signIn(prevState: any, formData : FormData) {
        const email = formData.get("email");
        const password = formData.get("password");

        return { email, password }
    }

    return ( 
        //Esse action é uma novidade do react 19
        <form action={formAction} className="w-full flex flex-col gap-4">
            <Input name="email" required legend="E-mail" type="email" placeholder="seu@email.com" defaultValue={String(state?.email)}/>

            <Input name="password" required legend="Senha" type="password" placeholder="123456" defaultValue={String(state?.password)}/>

            <Button type="submit" isLoading={isLoading}>Entrar</Button>
            <a href="/signup" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Criar conta</a>
        </form>
     )
}