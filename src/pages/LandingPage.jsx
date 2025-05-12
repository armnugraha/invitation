// src/pages/LandingPage.jsx
import config from '@/config/config';
import { motion } from 'framer-motion';
import { safeBase64 } from '@/lib/base64';
import { useEffect, useState } from 'react';

export default function LandingPage({onOpenInvitation}) {
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
      // Get guest parameter from URL
      const urlParams = new URLSearchParams(window.location.search);
      const guestParam = urlParams.get('guest');

      if (guestParam) {
          try {
              const decodedName = safeBase64.decode(guestParam);
              setGuestName(decodedName);
          } catch (error) {
              console.error('Error decoding guest name:', error);
              setGuestName('');
          }
      }
  }, []);

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
          {/* Card Container */}
          <div className="backdrop-blur-sm bg-white/50 p-8 md:p-10 rounded-2xl border border-rose-100/50 shadow-xl rose-bg">

            {/* Title */}
            <div className="text-center space-y-6 px-6 py-3">
              <p className="text-gray-700 font-medium">
                The Wedding Of
              </p>
            </div>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[2px] w-16 bg-[#F7E8E1]" />
              <div className="w-3 h-3 rounded-full bg-[#F7E8E1]" />
              <div className="h-[2px] w-16 bg-[#F7E8E1]" />
            </div>

            {/* Couple Names */}
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
                  <img src="/images/us.png" alt="Couple" className="w-auto h-[20vh]" />
                </div>
                <div className="h-px w-32 mx-auto bg-rose-200" />
              </div>
            </div>

            {/* Date and Time */}
            <div
              className="space-y-4"
            >
              <div className="text-center space-y-1">
                <p className="text-gray-500 font-serif italic">
                  Kepada Yth.
                </p>
                <p className="text-gray-600 font-medium">
                  Bapak/Ibu/Saudara/i
                </p>
                <p className="text-[#CFB1A7] font-semibold text-lg">
                  {guestName ? guestName : "Tamu Undangan"}
                </p>
              </div>
              <p className="text-sm text-gray-500 font-medium">
                Dengan penuh rasa syukur dan mengharap ridha Allah ﷻ, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri walimatul ‘urs (resepsi pernikahan) kami.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.2 }}
                onClick={onOpenInvitation}
                className="group relative w-full bg-rose-500 text-[#CFB1A7] px-8 py-3 rounded-xl font-medium shadow-lg hover:bg-rose-600 transition-all duration-200"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Buka Undangan</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
// export default LandingPage;