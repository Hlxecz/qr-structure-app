import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import WritePage from "./pages/WritePage";
import AnswerListPage from "./pages/AnswerListPage";
import AnswerDetailPage from "./pages/AnswerDetailPage";


function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/write" element={<WritePage />} />
      <Route path="/board" element={<AnswerListPage />} />
      <Route path="/answers/:id" element={<AnswerDetailPage />} />
      <Route path="/detail/:id" element={<AnswerDetailPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
