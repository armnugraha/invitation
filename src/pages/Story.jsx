import StoryCard from "@/components/StoryCard";
import { motion } from 'framer-motion';

export default function Story() {
    return (<>
        {/* Story section */}
        <section id="story" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-white">

            {/* Decorative Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="container mx-auto px-4 py-4 relative z-10">
                {/* Section Header */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-semibold text-[#A66C6B] text-center space-y-2 mb-8"
                >
                    Our Story
                </motion.h2>

                {/* Story Content */}
                <div className="max-w-6xl mx-auto grid md:grid-row-2 gap-4 items-center">
                    {/* Venue Details */}
                    <div
                        className="space-y-4"
                    >
                        <p className="text-right text-rose-800 font-[amiri] text-sm max-w-md mx-auto">
                            قيل في الحب :
                            <br />اذا اراد الله ان يجمع بين القلبين سيجمعهما ولو كان بينهما مداد السموات والارض
                        </p>
                        <p className="text-gray-500 text-sm max-w-md mx-auto italic">
                            “Dikatakan dalam sebuah cinta: <br />
                            Jika Allah berkehendak untuk menyatukan dua hati, maka keduanya pasti akan bersatu, walaupun di antara keduanya terbentang langit dan bumi.”
                        </p>
                        <p className="text-gray-500 text-xs max-w-md mx-auto">
                            Pernah dengar quote ini? Kami kira kami hanya akan terus menjadi pembaca quote tersebut, dan akhirnya, saat ini kami lah yang mengalaminya.
                            <br /><br />
                            Kami percaya bahwa tidak ada sebuah kebetulan dalam hidup ini, setiap keputusan hidup yang kami jalani saat ini sudah diatur dengan begitu apik oleh Sang Sutradara.
                            <br /><br />
                            Begitupun setiap langkah kaki kami yang sebelumnya tidak pernah beririsan, saat Allah sudah memutuskan ini adalah waktu yang tepat, episode hidup kami mulai beririsan satu sama lain.
                            <br /><br />
                            Saat kami sadari, ini semua bukanlah sebuah kebetulan yang baru direncanakan tahun lalu, melainkan buah dari rangkaian kejadian yang telah Allah rangkai, bahkan saat kami berdua masih berada di rahim ibu kami, semua sudah tertulis di Lauhul Mahfudz.
                            <br /><br />
                            Begitulah takdir Allah bekerja, begitu indah ternyata akhirnya, saat kita tetap selalu berusaha untuk bersabar dalam menjalani ketetapan-Nya sesuai dengan aturan-Nya ❤️.
                        </p>
                        <StoryCard />
                    </div>
                </div>
            </div>
        </section>
    </>)
}