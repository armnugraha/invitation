import EventCards from '@/components/EventsCard'
import ScrollCard from '@/components/ScrollCard'

import config from '@/config/config'
import { motion } from 'framer-motion'
import { Calendar, Clock, Heart, NavigationIcon, ExternalLink, BookHeart } from 'lucide-react'
import { formatEventDate } from '@/lib/formatEventDate';
import { safeBase64 } from '@/lib/base64';
import { useEffect, useState } from 'react';

export default function Events() {
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
            <div className="grid grid-cols-4 gap-4 mt-4">
                {Object.keys(timeLeft).map((interval) => (
                    <div
                        key={interval}
                        className="flex flex-col items-center p-2 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100"
                    >
                        <span className="text-lg font-bold text-rose-600">
                            {timeLeft[interval]}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{interval}</span>
                    </div>
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
                className="relative z-10 container mx-auto px-4 py-8 pb-0"
            >
                {/* Section Header */}
                <div
                    className="text-center space-y-4 mb-16"
                >
                    <h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1, delay: 0.4 }}
                        className="text-2xl font-semibold text-[#A66C6B]"
                    >
                        Waktu & Tempat
                    </h2>

                    <p className="text-gray-600 text-sm italic">
                        Dengan izin Allah ﷻ, berikut adalah waktu dan tempat pelaksanaan akad & resepsi pernikahan kami.
                    </p>

                    <div className="grid grid-cols-2 gap-8 text-left">
                        <div className="space-y-2">
                            <div className="flex justify-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 6, -6, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    🕊
                                </motion.div>
                                <h3 className="font-semibold text-rose-600 text-lg pl-2" style={{lineHeight: '1.5rem'}} >Akad Nikah <span className="text-xs">(Khusus Keluarga)</span></h3>
                            </div> 
                            <div className="space-y-2 text-sm">
                                <p className="text-gray-500 flex items-center gap-2"><Calendar className="w-5 h-5 text-rose-500" /> {formatEventDate(config.eventDetails[0].date)}</p>
                                <p className="text-gray-500 flex items-center gap-2"><Clock className="w-5 h-5 text-rose-500" /> {config.eventDetails[0].startTime} WIB s.d selesai</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-center">
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
                                    🎉
                                </motion.div>
                                <h3 className="font-semibold text-rose-600 text-lg pl-2" style={{lineHeight: '1.5rem'}} >Walimatul ‘Urs <span className="text-xs">(Resepsi)</span></h3>
                            </div>
                            <div className="space-y-2 text-sm">
                                <p className="text-gray-500 flex items-center gap-2"><Calendar className="w-5 h-5 text-rose-500" /> {formatEventDate(config.eventDetails[1].date)}</p>
                                <p className="text-gray-500 flex items-center gap-2"><Clock className="w-5 h-5 text-rose-500" /> {config.eventDetails[1].startTime} - {config.eventDetails[1].endTime} WIB</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 pt-4">Bertempat di:</p>
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 p-4">
                                <h3 className="text-xl text-left font-serif text-gray-800">{config.event.name}</h3>

                                <div className="flex items-start space-x-4">
                                    <p className="text-gray-600 text-sm text-left flex-1">{config.event.address}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-2">
                                    <motion.a
                                        href={config.event.direction}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center gap-1.5 bg-rose-500 text-white px-2 py-2 rounded-lg hover:bg-rose-600 transition-colors text-xs"
                                    >
                                        <span>Directions</span>
                                    </motion.a>

                                    <motion.a
                                        href={config.event.maps_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center gap-1.5 bg-white text-gray-600 px-2 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-xs"
                                    >
                                        <span>View Map</span>
                                    </motion.a>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <iframe
                                    src={config.event.maps_embed}
                                    width="100%"
                                    height="300"
                                    allowFullScreen=""
                                    loading="lazy"
                                    className="rounded-r-xl shadow-lg border border-gray-100"
                                    style={{
                                        pointerEvents: 'none',
                                        filter: 'grayscale(20%) contrast(90%)',
                                    }}
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Time and Date Info */}
                    <div
                        className="relative max-w-md mx-auto !my-8"
                    >
                        {/* Decorative Elements */}
                        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 to-white/50 backdrop-blur-md rounded-2xl" />

                        <div className="relative px-8 py-5 rounded-2xl border border-rose-100/50">
                            {/* Top Decorative Line */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px">
                                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="space-y-4 text-center">
                                <p className="text-sm text-gray-500">Menuju hari bahagia:</p>
                                {/* Decorative Line */}
                                <div
                                    className="flex items-center justify-center gap-4 mt-6"
                                >
                                    <div className="h-[1px] w-12 bg-rose-200" />
                                    <div className="text-rose-400">
                                        <Heart className="w-4 h-4" fill="currentColor" />
                                    </div>
                                    <div className="h-[1px] w-12 bg-rose-200" />
                                </div>
                                {/* Countdown Timer */}
                                <CountdownTimer targetDate={config.event.dateTime} />
                            </div>

                            {/* Bottom Decorative Line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-px">
                                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
                            </div>
                        </div>

                        {/* Background Blur Circles */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose-100/20 rounded-full blur-xl" />
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-rose-100/20 rounded-full blur-xl" />
                    </div>

                    <div className="space-y-4">
                        <h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.1, delay: 0.4 }}
                            className="text-2xl font-semibold text-[#A66C6B]"
                        >
                            Adab Walimah
                        </h2>

                        {/* Decorative Line */}
                        <div
                            className="flex items-center justify-center gap-4 mt-6"
                        >
                            <div className="h-[1px] w-12 bg-rose-200" />
                            <div className="text-rose-400">
                                <BookHeart className="w-4 h-4" />
                            </div>
                            <div className="h-[1px] w-12 bg-rose-200" />
                        </div>

                        {/* Card Adab */}
                        <ScrollCard />
                    </div>
                </div>
            </motion.div>
        </section>
    </>)
}