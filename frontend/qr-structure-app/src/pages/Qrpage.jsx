import { useEffect, useRef } from "react";

const QrPage = () => {
  const qrRef = useRef(null);

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      new window.QRCode(qrRef.current, {
        text: "https://architen.netlify.app/",
        width: 200,
        height: 200,
      });
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <div ref={qrRef} style={{ width: "200px", height: "200px" }} />
    </div>
  );
};

export default QrPage;
