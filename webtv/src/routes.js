import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importe seu contexto de autenticação
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { AuthProvider } from './contexts/authContext';
import { ProtectedRoute } from './contexts/protectedRoute';
import { Main } from "./pages/main";
import { VideoPage } from "./pages/videoPage";
import { AdmPage } from "./pages/admin";
import { PageNotFound } from "./pages/page404";
import { Login } from "./pages/login"; // Adicione a página de login
import "./index.css"


export function AppRoutes() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen m-0 p-0 font-sans bg-[#f2f2f2] text-[#333]">
                    <Header />

                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/search/:term" element={<Main />} />
                        <Route path="/stream/:id" element={<VideoPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route 
                            path="/admin" 
                            element={
                                <ProtectedRoute>
                                    <AdmPage />
                                </ProtectedRoute>
                            } 
                        />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>

                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}