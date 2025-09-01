import { useState } from "react"

import searchSvg from "../assets/search.svg"
import { CATEGORIES } from "../utils/categories";

import { Input } from "../Components/Input"
import { Button } from "../Components/Button";
import { RefundItem } from "../Components/RefundItem";

const REFFUND_EXEMPLE = {
    id: "123",
    name: "Weyne",
    category: "Transporte",
    amount: "34.50",
    categoryImg: CATEGORIES["transport"].icon
}

export function Dashboard() {
    const [name, setName] = useState("");

    function fetchRefunds(e: React.FormEvent) {
        e.preventDefault();
        console.log(name);
    }   

    return (
        <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
            <h1 className="flex-1 text-gray-100 font-bold text-xl">Solicitações</h1>
            <form onSubmit={fetchRefunds} action="" className="flex flex-1 items-center justify-between pb-6 border-b-[1px] border-b-gray-400 md:flex-row gap-2 mt-6">
                <Input placeholder="Pesquisar pelo nome" onChange={(e) => setName(e.target.value)}/>
                <Button variant="icon" type="submit">
                    <img src={searchSvg} alt="Ícone de pesquisar" className="w-5" />
                </Button>
            </form>

            <div>
                <RefundItem data={REFFUND_EXEMPLE} />
            </div>
        </div>
    )
}