import { useState, useEffect } from "react"
import { AxiosError } from "axios";

import searchSvg from "../assets/search.svg"
import { CATEGORIES } from "../utils/categories";
import { formatCurrency } from "../utils/formatCurrency";

import { api } from "../services/api";

import { Input } from "../Components/Input"
import { Button } from "../Components/Button";
import { RefundItem, type RefundItemProps } from "../Components/RefundItem";
import { Pagination } from "../Components/Pagination";

export function Dashboard() {
    const [name, setName] = useState("");
    const [page, setPage] = useState(1);
    const [totalOfPage, setTotalOfPage] = useState(0);
    const [refunds, setRefunds] = useState<RefundItemProps[]>([]);

    const PER_PAGE : number = 5;

    async function fetchRefunds() {
        try{
            //Passa os querys params como se fosse em uma URL mesmo
            const response = await api.get<RefundsPaginationAPIResponse>(`/refunds?name=${name.trim()}&page=${page}&perPage=${PER_PAGE}`);

            setRefunds(
                response.data.refunds.map((refund) => ({
                    id: refund.id,
                    name: refund.user.name,
                    description: refund.name,
                    amount: formatCurrency(refund.amount),
                    categoryImg: CATEGORIES[refund.category].icon 
                }))
            )

            console.log(response)

            setTotalOfPage(response.data.pagination.totalPages)
        }
        catch (error){
            console.log(error)

            if(error instanceof AxiosError)
                return alert(error.response?.data.message)

            return alert("Não foi possível retornar as requisições de reembolso, tente novamente!")
        }
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        fetchRefunds();
    }

    function handlePagination(action: "next" | "previous") {
        setPage((prevPage) => {
            if(action === "next" && prevPage < totalOfPage)
                return prevPage + 1;
            else if(action === "previous" && prevPage > 1)
                return prevPage - 1;

            return prevPage
        })
    }

    useEffect(() => {
        fetchRefunds();
    }, [page])

    return (
        <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
            <h1 className="flex-1 text-gray-100 font-bold text-xl">Solicitações</h1>
            <form onSubmit={onSubmit} action="" className="flex flex-1 items-center justify-between pb-6 border-b-[1px] border-b-gray-400 md:flex-row gap-2 mt-6">
                <Input placeholder="Pesquisar pelo nome" onChange={(e) => setName(e.target.value)}/>
                <Button variant="icon" type="submit">
                    <img src={searchSvg} alt="Ícone de pesquisar" className="w-5" />
                </Button>
            </form>

            <div className="my-6 flex flex-col gap-4 max-h-[342px] overflow-y-scroll">
                {
                    refunds.map((item) => (
                        <RefundItem key={item.id} data={item} href={`/refund/${item.id}`}/>
                    ))
                }
            </div>

            <Pagination 
                current={page}
                total={totalOfPage}
                onPrevious={() => handlePagination("previous")}
                onNext={() => handlePagination("next")}
            />
        </div>
    )
}