import { useState } from "react";
import { motion } from "framer-motion";

const API_BASE_URL = "https://your-backend-domain.com"; // ← 실제 API 서버 주소로 바꿔주세요

export default function WritePage({ onSubmit }) {
  const [firstAnswer, setFirstAnswer] = useState("");
  const [wallAnswer, setWallAnswer] = useState("");
  const [slabAnswer, setSlabAnswer] = useState("");
  const [columnAnswer, setColumnAnswer] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    if (!firstAnswer || !wallAnswer || !columnAnswer || !slabAnswer) {
      setShowModal(true);
      return;
    }

    const payload = {
      keyword: firstAnswer,
      wall: wallAnswer,
      structureColumn: columnAnswer,
      slab: slabAnswer,
    };

    try {
      const url = `${API_BASE_URL}/api/answers`;
      console.log("➡️ 요청 URL:", url);
      console.log("📦 전송 데이터:", payload);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include", // 필요 없으면 제거해도 됨
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ 서버 에러 응답:");
        console.error("🔸 상태 코드:", response.status);
        console.error("🔸 상태 메시지:", response.statusText);
        console.error("🔸 응답 내용:", errorText);
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ 전송 성공:", result);
      onSubmit();
    } catch (err) {
      console.error("❌ 전송 실패:", err.message);
      alert(`오류 발생: ${err.message}`);
    }
  };

  return (
    <div id="about-section" className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-white my-3">
          당신이{" "}
          <span className="text-primary">
            {firstAnswer || "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
          </span>{" "}
          을 한다면?
        </h1>
        <input
          type="text"
          className="form-control form-control-lg mt-4 mx-auto w-75"
          placeholder="첫 번째 질문에 대한 답변을 입력하세요"
          value={firstAnswer}
          onChange={(e) => setFirstAnswer(e.target.value)}
        />
      </div>

      {firstAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center mb-4">
            <h2 className="h4 fw-semibold text-white">
              <span className="text-danger">벽</span> /{" "}
              <span className="text-primary">기둥</span> /{" "}
              <span className="text-warning">슬라브</span>를 어떻게 이용하였나요?
            </h2>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <textarea
                className="form-control"
                rows={5}
                placeholder="벽을 어떻게 활용했나요?"
                value={wallAnswer}
                onChange={(e) => setWallAnswer(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <textarea
                className="form-control"
                rows={5}
                placeholder="기둥을 어떻게 활용했나요?"
                value={columnAnswer}
                onChange={(e) => setColumnAnswer(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <textarea
                className="form-control"
                rows={5}
                placeholder="슬라브를 어떻게 활용했나요?"
                value={slabAnswer}
                onChange={(e) => setSlabAnswer(e.target.value)}
              />
            </div>
          </div>

          <div className="text-center">
            <button
              className="btn btn-primary btn-lg px-4 py-3 my-5 fw-semibold"
              onClick={handleSubmit}
            >
              <span style={{ fontSize: "15px" }}>전송</span>
            </button>
          </div>
        </motion.div>
      )}

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center p-4">
                <p className="mb-4">모든 질문에 답변을 입력해주세요.</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
