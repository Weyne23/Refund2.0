import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { useState } from "react";
import { z, ZodError } from "zod";

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

    function onSubmit(e:React.FormEvent) {
        e.preventDefault();

        try {
            setIsLoading(true);

            const data = signUpSchema.parse({
                name,
                email,
                password,
                passwordConfirm
            })
        }
        catch(error) {
            if(error instanceof ZodError)
                return alert(error.issues[0].message)

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