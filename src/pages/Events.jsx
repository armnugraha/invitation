import EventCards from '@/components/EventsCard'
import config from '@/config/config'
import { motion } from 'framer-motion'
import { Calendar, Clock, Heart } from 'lucide-react'
import { formatEventDate } from '@/lib/formatEventDate';
import { safeBase64 } from '@/lib/base64';
import { useEffect, useState } from 'react';

export default function Events() {
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

    return (<>
        {/* Event Section */}
        <section id="event" className="min-h-screen relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white" />
            <div className="absolute top-0 left-0 w-64 h-64 bg-rose-100/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-100/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 container mx-auto px-4 py-20"
            >
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4 mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block text-rose-500 font-medium mb-2"
                    >
                        Catat Tanggal Penting Ini
                    </motion.span>

                    {/* Time and Date Info */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="relative max-w-md mx-auto"
                    >
                        {/* Decorative Elements */}
                        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 to-white/50 backdrop-blur-md rounded-2xl" />

                        <div className="relative px-8 py-10 rounded-2xl border border-rose-100/50">
                            {/* Top Decorative Line */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px">
                                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="space-y-6 text-center">
                                {/* Date and Time */}
                                <div className="space-y-3">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                        className="flex items-center justify-center space-x-2"
                                    >
                                        <Calendar className="w-4 h-4 text-rose-400" />
                                        <span className="text-gray-700 font-medium">
                                            {formatEventDate(config.event.dateTime, "full")}
                                        </span>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="flex items-center justify-center space-x-2"
                                    >
                                        <Clock className="w-4 h-4 text-rose-400" />
                                        <span className="text-gray-700 font-medium">
                                            {config.event.time}
                                        </span>
                                    </motion.div>
                                </div>

                                {/* Divider */}
                                <div className="flex items-center justify-center gap-3">
                                    <div className="h-px w-12 bg-rose-200/50" />
                                    <div className="w-2 h-2 rounded-full bg-rose-200" />
                                    <div className="h-px w-12 bg-rose-200/50" />
                                </div>

                                {/* Invitation Text */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.1 }}
                                    className="space-y-2"
                                >
                                    <p className="text-gray-500 font-serif italic">
                                        Kepada Yth.
                                    </p>
                                    <p className="text-gray-600 font-medium">
                                        Bapak/Ibu/Saudara/i
                                    </p>
                                    <p className="text-rose-500 font-semibold text-lg">
                                        {guestName ? guestName : "Tamu"}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Bottom Decorative Line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-px">
                                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
                            </div>
                        </div>

                        {/* Background Blur Circles */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose-100/20 rounded-full blur-xl" />
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-rose-100/20 rounded-full blur-xl" />
                    </motion.div>

                    {/* Countdown Timer */}
                    <CountdownTimer targetDate={config.event.dateTime} />

                    {/* Decorative Elements */}
                    <div className="pt-6 relative">
                        <FloatingHearts />
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Heart className="w-12 h-12 text-rose-500 mx-auto" fill="currentColor" />
                        </motion.div>
                    </div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight"
                    >
                        Rangkaian Acara Pernikahan
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-500 max-w-md mx-auto"
                    >
                        Kami Mengundang Anda untuk Merayakan Hari Istimewa Sebagai Awal Perjalanan Cinta Kami
                    </motion.p>

                    {/* Decorative Line */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-center gap-4 mt-6"
                    >
                        <div className="h-[1px] w-12 bg-rose-200" />
                        <div className="text-rose-400">
                            <Heart className="w-4 h-4" fill="currentColor" />
                        </div>
                        <div className="h-[1px] w-12 bg-rose-200" />
                    </motion.div>
                </motion.div>

                {/* Events Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="max-w-2xl mx-auto"
                >
                    <EventCards events={config.eventDetails} />
                </motion.div>
            </motion.div>

            {/* Decorative Bottom Pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>
    </>)
}