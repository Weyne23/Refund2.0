import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

import { api } from "../services/api"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"

import fileSvg from "../assets/file.svg"

import { Input } from "../Components/Input"
import { Select } from "../Components/Select"
import { Upload } from "../Components/Upload"
import { Button } from "../Components/Button"

import { CATEGORIES_KEYS, CATEGORIES } from "../utils/categories"
import { formatCurrency } from "../utils/formatCurrency"

const refundSchema = z.object({ 
    name: z.string().min(3, { message: "Informe um nome claro para sua solicitação!" }),
    category: z.string().min(1, {message: "Informe a categoria!"}),
    amount: z.coerce.number({message: "Informe um valor válido"}).positive( { message: "informe um valor válido e superior a zero!"} )
})

export function Refund() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileURL, setFileURL] = useState<string | null>(null);

    const navigate = useNavigate();
    const params = useParams<{id:string}>();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if(params.id)
            return navigate(-1)
        
        try{
            setIsLoading(true);
            
            if(!file)
                return alert("Selecione um arquivo de comprovante!");
            
            const fileUploadForm = new FormData();
            fileUploadForm.append("file", file);
            
            const response = await api.post("/uploads", fileUploadForm);
            
            const data = refundSchema.parse({
                name,
                category,
                amount: amount.replace(",", "."),
            })
            
            await api.post("/refunds", {...data, filename: response.data.filename});
            
            //Aqui mando para pagina de confirm que a requisição foi via submit, mais explicação na pagina confirm
            navigate("/confirm", { state: { fromSubmit: true }})
        }
        catch(error){
            console.log(error);

            if(error instanceof ZodError)
                return alert(error.issues[0].message)

            if(error instanceof AxiosError)
                return alert(error.response?.data.message)

            return alert("Erro ao fazer a solicitação de reembolso!")
        }
        finally{
            setIsLoading(false)
        }
    }

    async function fetchRefunds(id: string) {
        try{
            const { data } = await api.get<RefundAPIResponse>(`/refunds/${id}`);

            setName(data.name);
            setCategory(data.category);
            setAmount(formatCurrency(data.amount));
            setFileURL(data.filename);
        } 
        catch(error) {
            console.log(error)

            if(error instanceof AxiosError)
                return alert(error.response?.data.message)
            
            alert("Erro ao carregar dados da solicitação, tente novamente!")
        }
    }

    useEffect(() => { 
        if(params.id)
            fetchRefunds(params.id) 
    }, [params.id])

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
                (params.id && fileURL) ? (
                    <a href={`http://localhost:3333/uploads/${fileURL}`} target="_blank" className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear">
                        <img src={fileSvg} alt="Ícone de arquivo" />
                        Abrir Comprovante
                    </a>) 
                : (
                    <Upload filename= {file && file.name} onChange={(e) => e.target.files && setFile(e.target.files[0])}/>)
            }
            <Button type="submit" isLoading={isLoading}>
                {params.id ? "Voltar" : "Enviar" }
            </Button>
        </form>
    )
}