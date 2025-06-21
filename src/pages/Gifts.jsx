import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import config from '@/config/config';
import { motion } from 'framer-motion';
import supabase from "../supabaseClient";

export default function ScratchCard() {
  const scratchCanvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const [showScratchLayer, setShowScratchLayer] = useState(false);
  const [gift, setGift] = useState({})

  useEffect(() => {
    getGift()
  }, []);

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
      setGift(data)

      drawCoupon()
    } catch (error) {
      const err = JSON.parse(error.message)
      if (err.message == 'TypeError: Failed to fetch') {
      }
    }
  };

  const drawCoupon = async () => {
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
          {
            gift.code ? (

              <div className="backdrop-blur-sm bg-white/50 p-8 md:p-10 rounded-2xl border border-rose-100/50 shadow-xl rose-bg">

                <div className="text-center space-y-6 px-6 py-3">
                  <p className="text-gray-700 font-medium">
                    The Wedding of
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-[2px] w-16 bg-[#F7E8E1]" />
                  <div className="w-3 h-3 rounded-full bg-[#F7E8E1]" />
                  <div className="h-[2px] w-16 bg-[#F7E8E1]" />
                </div>

                <div
                  className="text-center space-y-6"
                >
                  <div className="space-y-3 mb-4">
                    <h1 className="text-4xl md:text-5xl font-serif text-[#A66C6B]">
                      {config.couple.groomName}
                        <span className="text-[#A66C6B] mx-3">&</span>
                      {config.couple.brideName}
                    </h1>
                    <div className="flex justify-center">
                      <div className="flex justify-center">
                          <div
                            style={{
                              position: "relative",
                              width: 150,
                              height: 150,
                              display: "inline-block",
                            }}
                          >
                            <QRCodeCanvas value={"https://app.gopay.co.id/NF8p/pfa07i9a"} size={150} level="H" includeMargin={true} />

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
                              }}
                            />
                          </div>
                        </div>
                    </div>
                    <div className="h-px w-32 mx-auto bg-rose-200" />
                  </div>
                </div>

                <div
                  className="space-y-4"
                >
                  <div className="text-center space-y-1">
                    <p className="text-gray-500 font-serif italic">
                      Yth.
                    </p>
                    <p className="text-gray-600 font-medium">
                      Bapak/Ibu/Saudara/i
                    </p>
                    <p className="text-[#CFB1A7] font-semibold text-lg">
                      {gift.price}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">
                    Dengan penuh rasa syukur dan mengharap ridha Allah ﷻ, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri walimatul ‘urs (resepsi pernikahan) kami.
                  </p>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.2 }}
                      className="group relative w-full bg-rose-500 text-[#CFB1A7] px-3 py-3 rounded-xl font-medium shadow-lg hover:bg-rose-600 transition-all duration-200"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span>Buka Undangan</span>
                        <span
                        >
                          →
                        </span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </motion.button>
                  </div>
                </div>
              </div>

            )
            : (
              <p>test</p>
            )
          }
          {gift.code}
        </motion.div>
      </div>
    </motion.div>
  );
}
