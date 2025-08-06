import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import QrCode from './components/QrCode';
import AnswerListPage from "./pages/AnswerListPage";





function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/qr" element={<QrCode />} />
      <Route path="/board" element={<AnswerListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
