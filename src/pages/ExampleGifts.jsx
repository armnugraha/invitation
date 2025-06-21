import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from 'framer-motion';
import supabase from "../supabaseClient";

export default function ExampleGifts() {
  const scratchCanvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const [showScratchLayer, setShowScratchLayer] = useState(false);
  const [gift, setGift] = useState({})

  useEffect(() => {
    getGift();
  }, []);

  useEffect(() => {
    if (gift.code && scratchCanvasRef.current) {
      drawCoupon();
    }
  }, [gift]);

  const getGift = async () => {
    try {
      // Get uid parameter from URL
      const urlParams = new URLSearchParams(window.location.search);
      const codeParam = urlParams.get('uid');

      const { data, error } = await supabase
      .from("gifts")
      .select()
      .like("code", codeParam)
      .limit(1)
      .single();

      if (error) {
        throw new Error(JSON.stringify(error));
      }

      setGift(data); // Biarkan ini memicu render ulang
    } catch (error) {
      const err = JSON.parse(error.message)
      if (err.message == 'TypeError: Failed to fetch') {
      }
    }
  };

  const drawCoupon = async () => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden front-card"
    >
      {/* Decorative Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white" /> */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="max-w-md w-full"
        >
          <div className="backdrop-blur-sm bg-white/50 p-4 md:p-10 rounded-2xl border border-rose-100/50 shadow-xl rose-bg">
            {
              gift.code ? (
                <div>
                  <div className="text-center space-y-6 px-6 py-3">
                    <p className="text-gray-700 font-medium">
                      Alhamdulillah kakak nya berhak mendapatkan sedikit hadiah dari kami 🙌
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-[2px] w-16 bg-[#F7E8E1]" />
                    <div className="w-3 h-3 rounded-full bg-[#F7E8E1]" />
                    <div className="h-[2px] w-16 bg-[#F7E8E1]" />
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-xl pl-4 pt-4 text-left font-serif text-gray-800">Cara menukarkan hadiahnya:</h3>
                    <div className="grid grid-cols-2 items-center">
                        <div className="space-y-4 p-4">
                          <div className="items-start space-x-4 text-xs">
                            <ul className="text-gray-600 space-y-2">
                              <li className="">1. Download Aplikasi GoPay melalui Apps Store maupun Play Store</li>
                              <li className="">2. Buka Aplikasi GoPay</li>
                              <li className="">3. Pilih QRIS</li>
                              <li className="">4. Scan Qr-Code yang ada di samping</li>
                              <li className="">5. Selamat saldo gopay telah masuk ke saldo kakak nya 🎉</li>
                            </ul>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-800 font-medium">
                            Gosok area abu ini yaa 😎
                          </p>
                          <div className="flex justify-center">
                            <div
                              style={{
                                position: "relative",
                                width: 150,
                                height: 150,
                                display: "inline-block",
                              }}
                            >
                              <QRCodeCanvas value={gift.url} size={150} level="H" includeMargin={true} />

                              <canvas
                                ref={scratchCanvasRef}
                                width={150}
                                height={150}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  cursor: "crosshair",
                                  display: showScratchLayer ? "block" : "none",
                                  borderRadius: "12px",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 font-medium italic my-4">
                    Ooiyaa Qr-Code nya hanya berlaku sampai tanggal 28 Juni pukul 23.59 WIB saja yaa, jadi jangan lupa untuk segera ambil hadiahnya! 🎁
                  </p>
                </div>
              )

            : (<span></span>)
            }

            <p className="text-sm text-gray-500 font-medium">
              Terima kasih sudah mau hadir di acara kami, semoga hadiah ini bisa bermanfaat untuk kakak nya yaa. Jangan lupa untuk selalu bahagia dan sehat selalu yaa! 🥰
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
