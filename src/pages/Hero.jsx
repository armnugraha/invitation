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
            <section id="home" className="flex flex-col items-center justify-center px-4 py-12 text-center relative overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-white draw_line">
                {/* Decorative Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-rose-100/50 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-100/50 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
                </div>

                <div
                    className="space-y-6 z-10 flower"
                >
                    {/* Opening */}
                    <div
                        className="inline-block mx-auto my space-y-4"
                    >
                        <span className="py-3 text-rose-800 font-[amiri] text-xl">
                            بِســــــمِ اللهِ الرحمن الرحيم
                        </span>

                        <p className="text-rose-800 font-[amiri] text-sm max-w-md mx-auto">
                            وَمِنۡ اٰيٰتِهٖۤ اَنۡ خَلَقَ لَكُمۡ مِّنۡ اَنۡفُسِكُمۡ اَزۡوَاجًا لِّتَسۡكُنُوۡۤا اِلَيۡهَا وَجَعَلَ بَيۡنَكُمۡ مَّوَدَّةً وَّرَحۡمَةً  ؕ اِنَّ فِىۡ ذٰ لِكَ لَاٰيٰتٍ لِّقَوۡمٍ يَّتَفَكَّرُوۡنَ‏ ٢١
                        </p>

                        <p className="text-[#A66C6B] text-right text-xs max-w-md mx-auto">
                            “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.” Ar-Rum: 21
                        </p>

                        <div>
                            <p className="py-3 text-rose-800 font-[amiri] text-xl">
                                السلام عليكم ورحمة الله وبركاته
                            </p>

                            <p className="text-gray-500 text-sm max-w-md mx-auto ">
                                Dengan segala puji bagi Allah yang telah menciptakan makhlukNya berpasang-pasangan, ya Allah izinkanlah kami merangkai cinta yang Engkau telah berikan dalam perjanjian agung, Mitsaqan Ghaliza, yaitu sebuah ikatan pernikahan.
                            </p>
                        </div>
                    </div>

                    {/* Card Couple Display */}
                    <div className="space-y-4">
                        <div className="relative backdrop-blur-sm bg-white/80 p-8 rounded-xl border border-rose-100/50 shadow-md bg-flower-card"
                        >
                            <div
                                className="space-y-4"
                            >
                                <div className="">
                                    <p className="text-3xl font-vibes text-[#A66C6B]">
                                        {config.couple.groomFullName}
                                    </p>
                                    <p className="text-xs text-gray-500">Putri dari {config.couple.groomParents}</p>
                                </div>

                                <div className="">
                                    <img src="/images/ring-2.png" alt="Couple" className="w-[6vh] h-auto mx-auto" />
                                </div>

                                <div className="">
                                    <p className="text-4xl font-parisienne text-[#A66C6B]">
                                        {config.couple.brideFullName}
                                    </p>
                                    <p className="text-xs text-gray-500">Putra dari {config.couple.brideParents}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}