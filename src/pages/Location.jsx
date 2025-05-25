import { MapPin } from 'lucide-react'
import { motion } from 'framer-motion';

export default function Location() {
    return (<>
        {/* Location section */}
        <section id="location" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-white">

            {/* Decorative Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
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
                        Lokasi Acara
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-serif text-gray-800"
                    >
                        Lokasi
                    </motion.h2>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-rose-200" />
                        <MapPin className="w-5 h-5 text-rose-400" />
                        <div className="h-[1px] w-12 bg-rose-200" />
                    </motion.div>
                </motion.div>

                {/* Location Content */}
                <div className="max-w-6xl mx-auto grid md:grid-row-2 gap-8 items-center">
                    {/* Venue Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        {/* Additional Info */}
                        <div className="bg-rose-50/50 rounded-xl p-4 border border-rose-100">
                            <p className="text-rose-600 text-sm">
                                <span className="font-medium">Note:</span> Free parking is available for all guests
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    </>)
}