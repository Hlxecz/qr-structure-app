import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";

import AnswerListPage from "./pages/AnswerListPage";





function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<StartPage />} />
        
      <Route path="/board" element={<AnswerListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
