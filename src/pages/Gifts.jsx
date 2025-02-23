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
export default function Gifts() {
    const [copiedAccount, setCopiedAccount] = useState(null);
    const copyToClipboard = (text, bank) => {
        navigator.clipboard.writeText(text);
        setCopiedAccount(bank);
        setTimeout(() => setCopiedAccount(null), 2000);
    };
    return (<>
        <section id="gifts" className="min-h-screen relative overflow-hidden">
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
                    className="text-center space-y-4 mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block text-rose-500 font-medium"
                    >
                        Hadiah Pernikahan
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-serif text-gray-800"
                    >
                        Berikan Hadiah
                    </motion.h2>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-rose-200" />
                        <Gift className="w-5 h-5 text-rose-400" />
                        <div className="h-[1px] w-12 bg-rose-200" />
                    </motion.div>

                    {/* Message Container */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4 max-w-md mx-auto"
                    >
                        {/* Arabic InsyaAllah */}
                        <p className="font-arabic text-xl text-gray-800">
                            إن شاء الله
                        </p>

                        {/* Main Message */}
                        <p className="text-gray-600 leading-relaxed">
                            Insya Allah, Kami Akan Menyalurkan Semua Hadiah yang Diberikan ke Beberapa Masjid dan Lembaga yang Membutuhkan
                        </p>

                        {/* Arabic Dua */}
                        <div className="space-y-2">
                            <p className="font-arabic text-lg text-gray-800">
                                جزاكم الله خيرا وبارك الله فيكم
                            </p>
                            <p className="text-gray-600 italic text-sm">
                                Jazakumullahu khairan, Barakallah fiikum
                            </p>
                        </div>
                    </motion.div>

                    {/* Optional: Additional Decorative Element */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center justify-center gap-3 pt-4"
                    >
                        <div className="h-px w-8 bg-rose-200/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                        <div className="h-px w-8 bg-rose-200/50" />
                    </motion.div>
                </motion.div>

                {/* Bank Accounts Grid */}
                <div className="max-w-2xl mx-auto grid gap-6">
                    {config.bankAccounts.map((account, index) => (
                        <motion.div
                            key={account.accountNumber}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * index }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-2xl transform transition-transform group-hover:scale-105 duration-300" />
                            <div className="relative backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-lg bg-white p-2 shadow-sm">
                                            <Building2 className="w-full h-full text-rose-500" /> {/* Changed from Bank to Building2 */}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">{account.bank}</h3>
                                            <p className="text-sm text-gray-500">{account.accountName}</p>
                                        </div>
                                    </div>
                                    <Wallet className="w-5 h-5 text-rose-400" />
                                </div>

                                <div className="mt-4">
                                    <div className="flex items-center justify-between bg-gray-50/80 px-4 py-3 rounded-lg">
                                        <p className="font-mono text-gray-700">{account.accountNumber}</p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => copyToClipboard(account.accountNumber, account.bank)}
                                            className="flex items-center space-x-1 text-rose-500 hover:text-rose-600"
                                        >
                                            {copiedAccount === account.bank ? (
                                                <CheckCircle className="w-4 h-4" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                            <span className="text-sm">
                                                {copiedAccount === account.bank ? 'Copied!' : 'Copy'}
                                            </span>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Digital Wallet QR */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-block backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                        <h3 className="font-medium text-gray-800 mb-4">
                            Scan Kode QRIS
                        </h3>
                        <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4">
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                {config.qris?.image ? (
                                    <img
                                        src={config.qris.image}
                                        alt="QR Code"
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <CreditCard className="w-12 h-12" />
                                )}
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">
                            Pindai untuk Mengirimkan Hadiah via Dompet Digital
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    </>)
}