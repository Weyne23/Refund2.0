import { Input } from "../Components/Input"
import { Button } from "../Components/Button"

//import { useState } from "react";
import { useActionState } from "react";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

import { api } from "../services/api";

const signInScheme = z.object({
    email: z.string().email({ message: "E-mail inválido!"}),
    password: z.string().trim().min(1, {message: "Informe a senha!"})
})

export function SignIn() {
    //Foram removidos para usar o action que não precisa utilizar estados
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    //const [isLoading, setIsLoading] = useState(false);

    //Para o array que o "useActionState" retorna a primeira posição é o estado atual do formulário,  a segunda é qual action será executada e a terceira é se a requisição ainda está pendente ou não.

    //Já os parâmetros do "useActionState" são a função que iremos executar e conteúdo padrão que o "useActionState" tera respectivamente.
    const [state, formAction, isLoading] = useActionState(signIn, null);

    //prevState é o estado anterior do formulário e o formDate é ds dados do formulário
    async function signIn(_: any, formData : FormData) {
        try {
            const data = signInScheme.parse({
                email: formData.get("email"),
                password : formData.get("password")
            })

            const response = await api.post("/sessions", data)

        } 
        catch (error) {
            console.log(error)

            if(error instanceof ZodError)
                return { message: error.issues[0].message }

            if(error instanceof AxiosError)
                return { message: error.response?.data.message }

            return { message: "Erro ao efetuar login!" }
        }
    }

    return ( 
        //Esse action é uma novidade do react 19
        <form action={formAction} className="w-full flex flex-col gap-4">
            <Input name="email" required legend="E-mail" type="email" placeholder="seu@email.com"/>
            
            <Input name="password" required legend="Senha" type="password" placeholder="123456"/>
            
            <p className="text-sm text-red-600 text-center my-4 font-medium">{state?.message}</p>

            <Button type="submit" isLoading={isLoading}>Entrar</Button>
            <a href="/signup" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Criar conta</a>
        </form>
     )
}