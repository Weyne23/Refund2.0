import { useState } from "react"
import { useNavigate, useParams } from "react-router"

import fileSvg from "../assets/file.svg"

import { Input } from "../Components/Input"
import { Select } from "../Components/Select"
import { Upload } from "../Components/Upload"
import { Button } from "../Components/Button"

import { CATEGORIES_KEYS, CATEGORIES } from "../utils/categories"

export function Refund() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [filename, setFilename] = useState<File | null>(null);

    const navigate = useNavigate();
    const params = useParams<{id:string}>();

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if(params.id)
            return navigate(-1)
        //Aqui mando para pagina de confirm que a requisição foi via submit, mais explicação na pagina confirm
        navigate("/confirm", { state: { fromSubmit: true }})
        console.log(name, amount, category, isLoading, filename);
    }

    return (
        <form onSubmit={onSubmit} className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]">
            <header>
                <h1 className="text-xl font-bold text-gray-100">Solicitação de reembolso</h1>
                <p className="text-sm text-gray-200 mt-2 mb-4">Dados da despesa para solicitar reembolso.</p>
            </header>
            {/* Aqui tem duas "!" para fazer a negação da negação pois o JS não entende que quero um boleando quando mando somente "params.id"" */}
            <Input required legend="Nome da solicitação" value={name} onChange={(e) => setName(e.target.value)} disabled={!!params.id}/>
            <div className="flex gap-4">
                <Select required legend="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} disabled={!!params.id}>
                    {
                        CATEGORIES_KEYS.map((category) => (
                            <option key={category} value={category}>
                                {CATEGORIES[category].name}
                            </option>
                        ))
                    }
                </Select>
                <Input legend="valor" required value={amount} onChange={(e) => setAmount(e.target.value)} disabled={!!params.id}/>
            </div>

            {
                //o "_blank" em target serve para abrir o link em uma nova pagina
                params.id ? (<a href="https://www.youtube.com/watch?v=XoodunTw0kw&list=RDXoodunTw0kw&start_radio=1" target="_blank" className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear">
                    <img src={fileSvg} alt="Ícone de arquivo" />
                    Abrir Comprovante
                </a>) :
                (<Upload filename= {filename && filename.name} onChange={(e) => e.target.files && setFilename(e.target.files[0])}/>)
            }
            <Button type="submit" isLoading={isLoading}>
                {params.id ? "Voltar" : "Enviar" }
            </Button>
        </form>
    )
}