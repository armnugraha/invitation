import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti';
import Marquee from "@/components/ui/marquee";
import {
    Calendar,
    Clock,
    ChevronDown,
    User,
    MessageCircle,
    Send,
    Frown,
    Meh,
    Smile,
    CheckCircle,
    XCircle,
    HelpCircle,
} from 'lucide-react'
import { useEffect, useState } from "react";
import { formatEventDate } from '@/lib/formatEventDate';
import supabase from "../supabaseClient";
import { safeBase64 } from '@/lib/base64';

export default function Wishes() {
    const [showConfetti, setShowConfetti] = useState(false);
    const [newName, setNewName] = useState('');
    const [newAttend, setNewAttend] = useState('');
    const [newWish, setNewWish] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attendance, setAttendance] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [guestName, setGuestName] = useState('');
    const profileBackgroundColors = [
        "#F9AFAF", "#A8D8EA", "#FFE0AC", "#B5EAD7", "#C7CEEA",
        "#FFDAC1", "#FFB7B2", "#E2F0CB", "#C9C9FF", "#FFABAB",
        "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF",
        "#BDB2FF", "#FFC6FF", "#FFCBF2", "#A3C4F3", "#D5AAFF",
        "#FFF1C1", "#B6E2D3", "#FFDEE9", "#DEFDE0", "#D0F4DE"
    ];

    const options = [
        { value: 'attending', label: 'Ya, saya akan hadir' },
        { value: 'not-attending', label: 'Tidak, saya tidak bisa hadir' },
        { value: 'maybe', label: 'Mungkin, nanti saya konfirmasi' }
    ];
    // Example wishes - replace with your actual data
    const [wishes, setWishes] = useState([
        // {
        //     id: 1,
        //     name: "John Doe",
        //     message: "Wishing you both a lifetime of love, laughter, and happiness! 🎉",
        //     timestamp: "2024-12-24T23:20:00Z",
        //     attending: "attending"
        // },
        // {
        //     id: 2,
        //     name: "Natalie",
        //     message: "Wishing you both a lifetime of love, laughter, and happiness! 🎉",
        //     timestamp: "2024-12-24T23:20:00Z",
        //     attending: "attending"
        // },
        // {
        //     id: 3,
        //     name: "mrofisr",
        //     message: "Congratulations on your special day! May Allah bless your union! 🤲",
        //     timestamp: "2024-12-25T23:08:09Z",
        //     attending: "maybe"
        // }
    ]);

    const handleSubmitWish = async (e) => {
        e.preventDefault();
        if (!newWish.trim()) return;

        setIsSubmitting(true);
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const { data, error } = await supabase
            .from('messages')
            .insert([{ name: guestName ?? newName, attending: attendance, message: newWish }]); // Insert new user

        if (error) {
            console.error('Error creating user:', error);
            return null;
        }

        getWhises()

        setNewName('');
        setNewAttend('');
        setNewWish('');
        setIsSubmitting(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
    };
    const getAttendanceIcon = (status) => {
        switch (status) {
            case 'attending':
                return <CheckCircle className="w-4 h-4 text-emerald-500" />;
            case 'not-attending':
                return <XCircle className="w-4 h-4 text-rose-500" />;
            case 'maybe':
                return <HelpCircle className="w-4 h-4 text-amber-500" />;
            default:
                return null;
        }
    };

    const getWhises = async () => {
        try {
            const { data, error } = await supabase
            .from("messages")
            .select()
            .range(0, 49)
            .order("id", { ascending: false });
            if (error) {
                throw new Error(JSON.stringify(error));
            }
            setWishes(data)
        } catch (error) {
            const err = JSON.parse(error.message)
            if (err.message == 'TypeError: Failed to fetch') {
            }
        }
    };

    function InputName() {
        if (!guestName) {
            return (
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                        <User className="w-4 h-4" />
                        <span>Nama Kamu</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Masukan nama kamu..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>
            );
        }
    }

    function ShowGuest() {
        return guestName ? guestName : 'Kamu';
    }

    function ShowAttendanceReaction() {
        return attendance === 'attending' ? (
            <Smile className="w-5 h-5 text-emerald-500" />) : (attendance === 'not-attending' ? (
                <Frown className="w-5 h-5 text-rose-500" />) : (
                    <Meh className="w-5 h-5 text-amber-500" />));
    }

    useEffect(() => {
        getWhises();

        // Get guest parameter from URL
        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get('guest');

        if (guestParam) {
            try {
                const decodedName = safeBase64.decode(guestParam);
                setGuestName(guestParam);
            } catch (error) {
                console.error('Error decoding guest name:', error);
                setGuestName('');
            }
        }
    }, []);

    return (<>
        <section id="wishes" className="min-h-screen relative overflow-hidden">
            {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

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
                        className="text-2xl font-semibold text-[#A66C6B]"
                    >
                        Pesan dan Doa
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-rose-500 font-medium"
                    >
                        Kirimkan Doa dan Harapan Terbaik Anda
                    </motion.h2>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-rose-200" />
                        <MessageCircle className="w-5 h-5 text-rose-400" />
                        <div className="h-[1px] w-12 bg-rose-200" />
                    </motion.div>
                </motion.div>

                {/* Wishes List */}
                <div className="max-w-2xl mx-auto space-y-6">
                    <AnimatePresence>
                        <Marquee speed={100}
                            gradient={false}
                            className="[--duration:100s] py-2">
                            {wishes.map((wish, index) => (
                                <motion.div
                                    key={wish.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative w-[280px]"
                                >
                                    {/* Background gradient */}
                                    {/* bg-gradient-to-r from-rose-100/50 to-pink-100/50 */}
                                    <div className="absolute inset-0 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300" />

                                    {/* Card content */}
                                    <div className="relative backdrop-blur-sm bg-white/80 p-4 rounded-xl border border-rose-100/50 shadow-md">
                                        {/* Header */}
                                        <div className="flex items-start space-x-3 mb-2">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium`}
                                                    style={{ backgroundColor: profileBackgroundColors[index] }}>
                                                    {wish.name[0].toUpperCase()}
                                                </div>
                                            </div>

                                            {/* Name, Time, and Attendance */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    <h4 className="font-medium text-gray-800 text-sm truncate">
                                                        {wish.name}
                                                    </h4>
                                                    {getAttendanceIcon(wish.attending)}
                                                </div>
                                                <div className="flex items-center space-x-1 text-gray-500 text-xs">
                                                    <Clock className="w-3 h-3" />
                                                    <time className="truncate">
                                                        {formatEventDate(wish.timestamp)}
                                                    </time>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-6">
                                            {wish.message}
                                        </p>

                                        {/* Optional: Time indicator for recent messages */}
                                        {Date.now() - new Date(wish.timestamp).getTime() < 3600000 && (
                                            <div className="absolute top-2 right-2">
                                                <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-medium">
                                                    New
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </Marquee>
                    </AnimatePresence>
                </div>
                {/* Wishes Form */}
                <div
                    className="max-w-2xl mx-auto mt-12"
                >
                    <form onSubmit={handleSubmitWish} className="relative">
                        <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                            <div className='space-y-2'>
                                {/* Name Input */}
                                <InputName />

                                <div
                                    className="space-y-2 relative"
                                >
                                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Apakah <ShowGuest /> akan hadir?</span> <ShowAttendanceReaction />
                                    </div>

                                    {/* Custom Select Button */}
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-left flex items-center justify-between"
                                    >
                                        <span className={attendance ? 'text-gray-700' : 'text-gray-400'}>
                                            {attendance ?
                                                options.find(opt => opt.value === attendance)?.label
                                                : 'Pilih kehadiran...'}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* Dropdown Options */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden"
                                            >
                                                {options.map((option) => (
                                                    <motion.button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => {
                                                            setAttendance(option.value);
                                                            setIsOpen(false);
                                                        }}
                                                        whileHover={{ backgroundColor: 'rgb(255, 241, 242)' }}
                                                        className={`w-full px-4 py-2.5 text-left transition-colors
                                        ${attendance === option.value
                                                                ? 'bg-rose-50 text-rose-600'
                                                                : 'text-gray-700 hover:bg-rose-50'
                                                            }`}
                                                    >
                                                        {option.label}
                                                    </motion.button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                {/* Wish Textarea */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Harapan <ShowGuest /></span>
                                    </div>
                                    <textarea
                                        placeholder="Kirimkan harapan dan doa untuk kedua mempelai..."
                                        className="w-full h-32 p-4 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 resize-none transition-all duration-200"
                                        required
                                        value={newWish}
                                        onChange={(e) => setNewWish(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <Smile className="w-5 h-5" />
                                    <span className="text-sm">Berikan Doa Anda</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-200
                    ${isSubmitting
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-rose-500 hover:bg-rose-600'}`}
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{isSubmitting ? 'Sedang Mengirim...' : 'Kirimkan Doa'}</span>
                                </motion.button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>)
}