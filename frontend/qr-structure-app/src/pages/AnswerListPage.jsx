import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; 

export default function AnswerListPage() {
  const [answers, setAnswers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    axios
      .get("/api/answers/summaries")
      .then((res) => {
        const sorted = res.data.sort((a, b) => b.id - a.id);
        setAnswers(sorted);
      })
      .catch((err) => console.error("❌ Error fetching summaries:", err));
  }, []);

  const visibleAnswers = answers.slice(0, visibleCount);
  const hasMore = visibleCount < answers.length;

  return (
    <div className="container py-5">
      {/* ✅ 타이틀 애니메이션 */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center text-5xl font-bold mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
      >
        PLAY-CE (놀場)
      </motion.h2>

      {/* ✅ 카드 목록 */}
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {visibleAnswers.map((answer, i) => (
          <motion.div
            key={answer.id}
            className="card shadow border-0 rounded-4"
            style={{ width: "30rem" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
          >
            <div className="card-header bg-light fw-bold fs-5 text-center rounded-top-4">
              <span className="text-primary">{answer.keyword}</span>
            </div>
            <ul className="list-group list-group-flush px-4 py-3 text-start">
              <li className="list-group-item border-0 px-0">
                <strong>벽 :</strong> {answer.wall || "정보 없음"}
              </li>
              <li className="list-group-item border-0 px-0">
                <strong>기둥 :</strong> {answer.structureColumn || "정보 없음"}
              </li>
              <li className="list-group-item border-0 px-0">
                <strong>슬라브 :</strong> {answer.slab || "정보 없음"}
              </li>
            </ul>
          </motion.div>
        ))}
      </div>

      {/* 더 보기 버튼 */}
      {hasMore && (
        <div className="text-center mt-5">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="btn btn-outline-primary px-5 py-2 rounded-pill shadow-sm"
          >
            더 보기
          </button>
        </div>
      )}

      {/* 돌아가기 버튼 */}
      <div className="text-center mt-3">
        <button
          onClick={() => (window.location.href = "/")}
          className="btn btn-outline-secondary px-4 py-2 rounded-pill"
        >
          글쓰기로 돌아가기
        </button>
      </div>
    </div>
  );
}
