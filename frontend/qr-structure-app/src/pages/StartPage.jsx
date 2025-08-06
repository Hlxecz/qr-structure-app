import { useRef, useState } from "react";
import Header from "../components/Header";
import WritePage from "../pages/WritePage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnswerListPage from "../pages/AnswerListPage";
import ipadImg from "../../assets/img/ipad.png";

export default function StartPage() {
  const writeRef = useRef(null);
  const [submitted, setSubmitted] = useState(false); // 👉 작성 완료 여부

  return (
    <>
      <Navbar />

      <header className="masthead w-full h-screen d-flex align-items-center" id="page-top">
        <div className="container d-flex h-100 align-items-center justify-content-center">
          <div className="text-center">
            <Header />
<h1 className="text-white text-6xl font-bold">
  XYZ
</h1>

<h2 className="text-white text-3xl font-semibold mt-3 mb-4">
  PLAY-CE (놀場)
</h2>

<p className="text-white text-lg leading-relaxed mb-10">
  QR로 접속하여 질문에 답하고<br />
  벽/기둥/슬라브 아이디어를 공유해보세요!
</p>
            <button
              onClick={() => writeRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="btn btn-primary fw-semibold"
            >
              시작하기
            </button>
          </div>
        </div>
      </header>

      <section
        className="write-section text-center"
        id="write-section"
        ref={writeRef}
        style={{ paddingTop: "2rem" }}
      >
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-lg-10">
              {/* ✅ 이 자리에만 부분 렌더링 */}
              {submitted ? (
                <AnswerListPage />
              ) : (
                <WritePage onSubmit={() => setSubmitted(true)} />
              )}
            </div>
          </div>
          <img src={ipadImg} alt="ipad" />
        </div>
      </section>

      <section id="contact">
        <Footer />
      </section>
    </>
  );
}
