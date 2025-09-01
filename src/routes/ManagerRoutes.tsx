import { Route, Routes } from "react-router";
import { Dashboard } from "../pages/Dashboard";
import { AppLayout } from "../Components/AppLayout";
import { NotFound } from "../pages/NotFound";

export function ManagerRoutes() {
    return(
        <Routes>
            <Route path="/" element={<AppLayout/>}>
                <Route path="/" element={<Dashboard/>}/>
            </Route>

            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}