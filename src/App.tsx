import { AuthContext, AuthProvider } from "./context/AuthContext";

import { Routes } from "./routes";

export function App() {
  return (
    <div>
      <AuthProvider>
        {/* Routes é chamado aqui e não no main.tsx para eu conseguir dividir qual caminho de rotas o usuário vai poder acessar */}
        <Routes />
      </AuthProvider>
    </div>
  )
}