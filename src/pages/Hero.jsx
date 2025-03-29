import { Calendar, Clock, Heart, BookHeart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import config from '@/config/config';
import { formatEventDate } from '@/lib/formatEventDate';
import { safeBase64 } from '@/lib/base64';

export default function Hero() {
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
    const CountdownTimer = ({ targetDate }) => {
        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
        function calculateTimeLeft() {
            const difference = +new Date(targetDate) - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    menit: Math.floor((difference / 1000 / 60) % 60),
                    detik: Math.floor((difference / 1000) % 60),
                };
            }

            return timeLeft;
        }
        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
            return () => clearInterval(timer);
        }, [targetDate]);
        return (
            <div className="grid grid-cols-4 gap-4 mt-8">
                {Object.keys(timeLeft).map((interval) => (
                    <motion.div
                        key={interval}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100"
                    >
                        <span className="text-2xl font-bold text-rose-600">
                            {timeLeft[interval]}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{interval}</span>
                    </motion.div>
                ))}
            </div>
        );
    };
    const FloatingHearts = () => {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight
                        }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1, 1, 0.5],
                            x: Math.random() * window.innerWidth,
                            y: -100
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeOut"
                        }}
                        className="absolute"
                    >
                        <Heart
                            className={`w-${Math.random() * 3 + 3} h-${Math.random() * 3 + 3} ${i % 3 === 0 ? 'text-rose-400' :
                                i % 3 === 1 ? 'text-pink-400' :
                                    'text-red-400'
                                }`}
                            fill="currentColor"
                        />
                    </motion.div>
                ))}
            </div>
        );
    };
    return (
        <>
            {/* min-h-screen */}
            <section id="home" className="flex flex-col items-center justify-center px-4 py-8 text-center relative overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-white">
                {/* Decorative Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-rose-100/50 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-100/50 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 relative z-10"
                >
                    {/* Special Date Badge */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mx-auto"
                    >
                        <span className="px-4 py-1 text-sm bg-rose-50 rounded-full border border-rose-200">
                            بسم الله الرحمن الرحيم
                        </span>

                        <p className="py-3 font-arabic text-lg text-gray-800">
                            السلام عليكم ورحمة الله وبركاته
                        </p>

                        <p className="text-gray-500 max-w-md mx-auto">
                            Dengan segala kerendahan hati dan ungkapan syukur atas karunia Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.
                        </p>

                    </motion.div>

                    {/* Date Display */}
                    <div className="space-y-4">
                        {/* <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-500 font-light italic"
                        >
                            InsyaAllah Kami Akan Menikah
                        </motion.p> */}

                        <div className="relative backdrop-blur-sm bg-white/80 p-4 rounded-xl border border-rose-100/50 shadow-md">
                            {/* Header */}
                            <div className="flex items-start space-x-3 mb-2">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                                        {config.couple.groomFullName.charAt(0)}
                                    </div>
                                </div>

                                {/* Name, Time, and Attendance */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2">
                                        <h4 className="
                                            font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600
                                            text-2xl
                                        ">
                                            {config.couple.groomFullName}
                                        </h4>
                                    </div>
                                    <div className="flex items-center space-x-1 text-gray-500 text-xs">
                                        <BookHeart className="w-3 h-3" />
                                        <time className="truncate">
                                            Putri dari {config.couple.groomParents}
                                        </time>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <p className="text-gray-500 font-light italic text-sm leading-relaxed mb-2 line-clamp-3">
                                dengan
                            </p>

                            <div className="flex items-start space-x-3 mb-2" style={{ justifySelf: 'end' }}>
                                {/* Avatar */}
                                {/* Name, Time, and Attendance */}
                                <div className="flex-shrink-0 min-w-0">
                                    <div className="flex items-center space-x-2" style={{ justifyContent: 'end' }}>
                                        <h4 className="
                                            font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600
                                            text-2xl
                                        ">
                                            {config.couple.brideFullName}
                                        </h4>
                                    </div>
                                    <div className="flex items-center space-x-1 text-gray-500 text-xs">
                                        <time className="truncate">
                                            Putra dari {config.couple.brideParents}
                                        </time>
                                        <BookHeart className="w-3 h-3" />
                                    </div>
                                </div>

                                {/* Avatar */}
                                <div className="flex-1">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                                        {config.couple.brideFullName.charAt(0)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <motion.h2
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <p className="text-3xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600">
                                {config.couple.groomFullName}
                            </p>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Putri dari {config.couple.groomParents}
                            </p>
                            <p className="text-gray-500 max-w-md mx-auto">dengan</p>
                            <p className="text-3xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600">
                                {config.couple.brideFullName}
                            </p>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Putra dari {config.couple.brideParents}
                            </p>
                        </motion.h2> */}
                    </div>
                </motion.div>
            </section>
        </>
    )
}