import { Header } from "./components/header";
import { MainGrid } from "./components/main";
import { Footer } from "./components/footer";
import './components/all.css';
import { VideoPage } from "./components/videoPage";

function App() {
  return (
    <div>
      <Header />
      
      <VideoPage />

      <Footer />
    </div>
  );
}

export default App;
