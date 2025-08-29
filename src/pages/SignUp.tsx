import { Input } from "../Components/Input"
import { Button } from "../Components/Button"
import { useState } from "react";

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(e:React.FormEvent) {
        e.preventDefault();
    }

    return ( 
        <form onSubmit={onSubmit} action="" className="w-full flex flex-col gap-4">
            <Input required legend="Nome" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome"/>
            <Input required legend="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="seu@email.com"/>
            <Input required legend="Senha" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="123456"/>
            <Input required legend="Confirme a Senha" value={password} onChange={(e) => setPasswordConfirm(e.target.value)} type="password" placeholder="123456"/>

            <Button type="submit" isLoading={isLoading}>Cadastrar</Button>
            <a href="/" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Já tenho uma conta</a>
        </form>
     )
}