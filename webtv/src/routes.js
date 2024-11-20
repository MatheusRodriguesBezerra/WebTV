import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importe seu contexto de autenticação
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Main } from "./pages/main";
import { VideoPage } from "./pages/videoPage";
import { AdmPage } from "./pages/admin";
import { PageNotFound } from "./pages/page404";
import { Login } from "./pages/login"; // Adicione a página de login
import "./index.css"


export function AppRoutes() {
    return (
        <Router>
            <div className="min-h-screen m-0 p-0 font-sans bg-[#f2f2f2] text-[#333]">
                <Header />

                <Routes>
                    {/* Rotas públicas */}
                    <Route path="/" element={<Main />} />
                    <Route path="/search/:term" element={<Main />} />
                    <Route path="/stream/:id" element={<VideoPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<AdmPage />} />
                    
                    {/* Rota protegida */}
                    {/* <Route element={<PrivateRoute />}>
                        <Route path="/admin" element={<AdmPage />} />
                    </Route> */}
                        
                    {/* Rota 404 */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}