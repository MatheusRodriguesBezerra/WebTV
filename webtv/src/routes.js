import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { MainGrid } from "./components/main";
import { VideoPage } from "./components/videoPage";
import { Footer } from "./components/footer";
import { AdmPage } from "./components/admin";
import { PageNotFound } from "./components/page404";

export function AppRoutes() {
    return (
        <div>
            <Header />

            <Router>
                <Routes>
                    <Route path="/" element={<MainGrid />} />
                    <Route path="/:type" element={<MainGrid />} />
                    <Route path="/streams/:cardId" element={<VideoPage />} />
                    <Route path="/admin" element={<AdmPage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>

            <Footer />
        </div>
    );
}