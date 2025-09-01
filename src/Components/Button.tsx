import { classMerge } from "../utils/classMerge"

type Props = React.ComponentProps<"button"> & {
    isLoading?: boolean,
    variant?: "base" | "icon" | "iconSmall"
}

const variants = {
    button: {
        base: "h-12 ",
        icon: "h-12 w-12",
        iconSmall: "h-8 w-8"
    }
}

export function Button({isLoading, children, type="button", variant="base", className, ...rest} : Props) {
    return(
        <button 
            type={type} 
            disabled={isLoading} 
            {...rest} 
            //esse className dentro do className é o className que vem de fora caso queira alterar alguma coisa bem pontual no componente
            className={
                classMerge(["flex items-center justify-center bg-green-100 rounded-lg text-white cursor-pointer hover:bg-green-200 transition ease-linear disabled:opacity-50"], 
                variants.button[variant],
                isLoading && "cursor-progress",
                className)}
        >
            {children}
        </button>
    )
}