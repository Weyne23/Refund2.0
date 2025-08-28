import { Routes } from "./routes";

export function App() {
  return (
    <div>
      {/* Routes é chamado aqui e não no main.tsx para eu conseguir dividir qual caminho de rotas o usuário vai poder acessar */}
      <Routes />
    </div>
  )
}