import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* 상단 프로필 헤더 */}
      <Header />

      {/* 콘텐츠 영역 */}
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">XYZ 팀</h1>
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">PLAY-CE (놀場)</h2>
        <p className="text-gray-700 mb-8 leading-relaxed">
          QR로 접속하여 질문에 답하고<br />
          벽/기둥/슬라브 아이디어를 공유해보세요!
        </p>
        <button
          onClick={() => navigate("/write")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
