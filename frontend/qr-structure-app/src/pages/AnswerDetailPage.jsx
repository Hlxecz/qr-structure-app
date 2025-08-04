import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ⬅️ navigate 추가
import axios from "axios";

export default function AnswerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // ⬅️ navigate hook
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/answers/${id}/detail`)
        .then(res => setDetail(res.data))
        .catch(err => console.error("Error fetching detail:", err));
    }
  }, [id]);

  if (!detail) return <p>로딩 중...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">상세 내용</h2>
      <p><strong>벽:</strong> {detail.wall}</p>
      <p><strong>기둥:</strong> {detail.structureColumn}</p>
      <p><strong>슬라브:</strong> {detail.slab}</p>

      {/* 🔙 리스트로 돌아가는 버튼 */}
      <button
        onClick={() => navigate("/board")}
        className="mt-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
      >
        목록으로 돌아가기
      </button>
    </div>
  );
}
