import  { useState } from "react";
import QRCode from "react-qr-code";

const QrCode = () => {
  const [qrCode, setQrCode] = useState("");
  const [input, setInput] = useState("");

  const handleGenerateQrCode = () => {
    setQrCode(input)
  }


  return (
    <div>
      <h1>QR code Generator</h1>
      <div>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          name="qr-code"
          placeholder="Enter your value here"
        />
        <button disabled={input && input.trim() !== "" ? false : true} onClick={handleGenerateQrCode}>Generate</button>
      </div>
      <div>
        <QRCode id="qr-code-value" value={qrCode} size={400} bgColor="#fff"/>
      </div>
    </div>
  );
};

export default QrCode;
