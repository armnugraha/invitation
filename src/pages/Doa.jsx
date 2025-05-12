import config from '@/config/config';
import { motion } from 'framer-motion'
import {
    Copy,
    Gift,
    CreditCard,
    CheckCircle,
    Wallet,
    Building2,
} from 'lucide-react'
import { useState } from 'react';
export default function Doa() {
    const [copiedAccount, setCopiedAccount] = useState(null);
    const copyToClipboard = (text, bank) => {
        navigator.clipboard.writeText(text);
        setCopiedAccount(bank);
        setTimeout(() => setCopiedAccount(null), 2000);
    };
    return (<>
        <section id="doa" className="relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-8"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-semibold text-[#A66C6B]"
                    >
                        Doa untuk Kedua Mempelai
                    </motion.h2>

                    {/* Message Container */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4 max-w-md mx-auto"
                    >
                        {/* Arabic */}
                        <p className="text-rose-800 font-[amiri] text-lg max-w-md mx-auto">
                            بَارَكَ اللهُ لَكُماَ وَبَارَكَ عَلَيْكُماَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                        </p>

                        <p className="text-[#A66C6B] text-sm leading-relaxed">
                            Barakallahu lakumaa wa baaraka ‘alaikumaa wa jama’a bainakumaa fii khaiir
                        </p>

                        {/* Main Message */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                            "Semoga Allah karuniakan barakah kepada kalian, dan semoga Ia limpahkan barakah atas kalian, dan semoga Ia himpun kalian berdua dalam kebaikan." (HR. Abu Daud, no. 2130; Tirmidzi, no. 1091. Al-Hafizh Abu Thahir mengatakan bahwa sanad hadits ini shahih).
                        </p>

                        {/* Arabic Dua */}
                        <div className="space-y-2 pt-8">
                            <p className="text-rose-800 font-[amiri] text-xl">
                                والسَّلامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
                            </p>
                        </div>
                    </motion.div>

                    {/* Optional: Additional Decorative Element */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center justify-center gap-3"
                    >
                        <div className="h-px w-8 bg-rose-200/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                        <div className="h-px w-8 bg-rose-200/50" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    </>)
}