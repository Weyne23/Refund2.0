import { Input } from "../Components/Input"
import { Button } from "../Components/Button"
import { useState } from "react";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(e:React.FormEvent) {
        e.preventDefault();
    }

    return ( 
        <form onSubmit={onSubmit} action="" className="w-full flex flex-col gap-4">
            <Input required legend="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="seu@email.com"/>
            <Input required legend="Senha" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="123456"/>

            <Button type="submit" isLoading={isLoading}>Entrar</Button>
            <a href="/signup" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Criar conta</a>
        </form>
     )
}