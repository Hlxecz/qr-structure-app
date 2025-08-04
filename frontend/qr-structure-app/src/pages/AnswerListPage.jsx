// src/pages/AnswerListPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function AnswerListPage() {
    
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/answers/summaries")
        .then(res => {
    console.log("응답 구조 확인:", res.data);  // ✅ 이거로 실제 형태 확인
    setAnswers(res.data);
  })
      .catch(err => console.error("Error fetching summaries:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">답변 목록</h2>
      <ul className="space-y-2">
        {answers.map(answer => (
          <li
            key={answer.id}
            onClick={() => navigate(`/answers/${answer.id}`)}
            className="cursor-pointer text-blue-700 underline hover:text-blue-900"
          >
            {answer.keyword}
          </li>
        ))}
      </ul>
                {/* 🔙 메인으로 돌아가는 버튼 */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
      >
        글쓰기로 돌아가기
      </button>
    </div>

    
  );
}
