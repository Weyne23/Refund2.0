import { Input } from "../Components/Input";
import { Button } from "../Components/Button";

import { api } from "../services/api";

import { useState } from "react";
import { useNavigate } from "react-router";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

const signUpSchema = z.object({
    name: z.string().trim().min(1, {message: "Informe o nome!"}),
    email: z.string().email({message: "Email invalido!"}),
    password: z.string({}).min(6, { message: "Senha deve ter pelo menos 6 dígitos!" }),
    passwordConfirm: z.string({message: "Confirme a senha!"})
}).refine( //Recupera os dados que foram passados 
    (data) => data.password === data.passwordConfirm, {
    message: "As senhas não são iguais!",
    path: ["passwordConfirm"]
});

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function onSubmit(e:React.FormEvent) {
        e.preventDefault();

        try {
            setIsLoading(true);

            const data = signUpSchema.parse({
                name,
                email,
                password,
                passwordConfirm
            })

            await api.post("/users", data);

            if(confirm("Usuário cadastrado com sucesso, deseja ir para tela inicial?")){
                navigate("/");
            }
        }
        catch(error) {
            console.log(error)
            if(error instanceof ZodError)
                return alert(error.issues[0].message)

            if(error instanceof AxiosError)
                return alert(error.response?.data.message)


            alert("Não foi possível cadastrar!")
        }
        finally {
            setIsLoading(false);
        }
    }

    return ( 
        <form onSubmit={onSubmit} action="" className="w-full flex flex-col gap-4">
            <Input required legend="Nome" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome"/>

            <Input required legend="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="seu@email.com"/>

            <Input required legend="Senha" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="123456"/>

            <Input required legend="Confirme a Senha" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} type="password" placeholder="123456"/>

            <Button type="submit" isLoading={isLoading}>Cadastrar</Button>
            <a href="/" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Já tenho uma conta</a>
        </form>
     )
}