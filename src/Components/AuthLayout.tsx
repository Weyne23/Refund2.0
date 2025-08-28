//Vai colocar as rotas em que eu quero compartilhar o layout
import { Outlet } from "react-router";

import logoSvg from "../assets/logo.svg"

export function AuthLayout() {
    return (
        //w-screen é o widht: 100vw e o h-screen é o height: 100hv
        <div className="w-screen h-screen bg-gray-400 flex flex-col justify-center items-center text-gray-100">
            {/* "md:" é o mobile para fazer e o min-w-[462px] tamanho mínimo da largura definindo entre [] o tamanho */}
            <main className="bg-gray-500 p-8 rounded-md flex items-center flex-col md:min-w-[462px]">
                <img src={logoSvg} alt="logo"  className="my-8"/>
                <Outlet />
            </main>
            
        </div>
    )
}