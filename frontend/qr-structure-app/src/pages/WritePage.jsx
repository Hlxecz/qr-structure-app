import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WritePage() {
  const [firstAnswer, setFirstAnswer] = useState("");
  const [wallAnswer, setWallAnswer] = useState("");
  const [slabAnswer, setSlabAnswer] = useState("");
  const [columnAnswer, setColumnAnswer] = useState("");
  const [showModal, setShowModal] = useState(false); // ✅ 모달 상태

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!firstAnswer || !wallAnswer || !columnAnswer || !slabAnswer) {
      setShowModal(true); // ✅ alert 대신 모달
      return;
    }

    const payload = {
      keyword: firstAnswer,
      wall: wallAnswer,
      structureColumn: columnAnswer,
      slab: slabAnswer,
    };

    try {
      const response = await fetch("http://localhost:8080/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }

      const result = await response.json();
      console.log("전송 성공:", result);
      navigate("/board");
    } catch (err) {
      console.error("전송 실패:", err);
      alert("전송 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10 relative">
      {/* 질문 1 */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        당신이 <span className="underline decoration-indigo-500">{firstAnswer || "___"}</span>을 한다면?
      </h1>
      <input
        type="text"
        value={firstAnswer}
        onChange={(e) => setFirstAnswer(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md mb-8"
        placeholder="첫 번째 질문에 대한 답변을 입력하세요"
      />

      {/* 질문 2 */}
      {firstAnswer && (
        <>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            벽 / 기둥 / 슬라브를 어떻게 이용하였나요?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">벽</label>
              <textarea
                value={wallAnswer}
                onChange={(e) => setWallAnswer(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 h-32"
                placeholder="벽을 어떻게 활용했나요?"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">기둥</label>
              <textarea
                value={columnAnswer}
                onChange={(e) => setColumnAnswer(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 h-32"
                placeholder="기둥을 어떻게 활용했나요?"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">슬라브</label>
              <textarea
                value={slabAnswer}
                onChange={(e) => setSlabAnswer(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 h-32"
                placeholder="슬라브를 어떻게 활용했나요?"
              />
            </div>
          </div>

          {/* 전송 버튼 */}
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            전송
          </button>
        </>
      )}

      {/* ✅ 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-80 text-center">
            {/* <h2 className="text-lg font-bold mb-2 text-red-600">입력 누락!</h2> */}
            <p className="text-sm text-gray-700 mb-4">
              모든 질문에 답변을 입력해주세요.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
