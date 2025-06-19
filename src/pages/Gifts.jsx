import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function ScratchCard({ qrValue = "https://app.gopay.co.id/NF8p/pfa07i9a" }) {
  const scratchCanvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const [showScratchLayer, setShowScratchLayer] = useState(false);

  useEffect(() => {
    if (!scratchCanvasRef.current) return;
    const canvas = scratchCanvasRef.current;
    const ctx = canvas.getContext("2d");

    // Isi kanvas dengan warna abu-abu
    ctx.fillStyle = "#bbb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setShowScratchLayer(true);

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
        y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top,
      };
    };

    const startDraw = (e) => {
      isDrawingRef.current = true;
      draw(e);
    };

    const endDraw = () => {
      isDrawingRef.current = false;
      ctx.beginPath();
    };

    const draw = (e) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 15, 0, Math.PI * 2);
      ctx.fill();
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("touchstart", startDraw);
    canvas.addEventListener("touchend", endDraw);
    canvas.addEventListener("touchmove", draw);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mouseup", endDraw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchend", endDraw);
      canvas.removeEventListener("touchmove", draw);
    };
  }, [qrValue]);

  return (
    <div
      style={{
        position: "relative",
        width: 300,
        height: 300,
        display: "inline-block",
      }}
    >
      {/* QR Code sebagai background */}
      <QRCodeCanvas value={qrValue} size={300} level="H" includeMargin={true} />

      {/* Scratchable layer */}
      <canvas
        ref={scratchCanvasRef}
        width={300}
        height={300}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          cursor: "crosshair",
          display: showScratchLayer ? "block" : "none",
        }}
      />
    </div>
  );
}
