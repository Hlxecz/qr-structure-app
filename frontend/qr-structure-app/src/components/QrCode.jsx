import { useEffect, useRef } from 'react';

const QrCode = () => {
  const qrRef = useRef(null);

  useEffect(() => {
    if (qrRef.current && window.QRCode) {
      new window.QRCode(qrRef.current, {
        text: 'https://architen.netlify.app/',
        width: 150,
        height: 150,
      });
    }
  }, []);

  return <div ref={qrRef} />;
};

export default QrCode;
