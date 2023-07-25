import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { MainGrid } from "./components/main";
import { VideoPage } from "./components/videoPage";
import { Footer } from "./components/footer";
import { AdmPage } from "./components/admin";

export function AppRoutes() {
    return (
        <div>
            <Header />

            <Router>
                <Routes>
                    <Route path="/" element={<MainGrid />} />
                    <Route path="/stream" element={<VideoPage />} />
                    <Route path="/admin" element={<AdmPage />} />
                </Routes>
            </Router>

            <Footer />
        </div>
    );
}