import foodSvg from "../assets/food.svg"
import othersSvg from "../assets/others.svg"
import servicesSvg from "../assets/services.svg"
import TransportSvg from "../assets/transport.svg"
import AccommodationSvg from "../assets/accommodation.svg"

export const CATEGORIES = {
    food: {
        name: "Alimentação",
        icon: foodSvg
    },
    others: {
        name: "Outros",
        icon: othersSvg
    },
    services: {
        name: "Serviços",
        icon: servicesSvg
    },
    transport: {
        name: "Transporte",
        icon: TransportSvg
    },
    accommodation: {
        name: "Hospedagem",
        icon: AccommodationSvg
    }
}

//Aqui retornar as keys da categoria
export const CATEGORIE_KEYS = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>