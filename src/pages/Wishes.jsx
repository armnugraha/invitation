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
    const [invite, setInvite] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [guestName, setGuestName] = useState('');
    const profileBackgroundColors = [
        "#F9AFAF", "#A8D8EA", "#FFE0AC", "#B5EAD7", "#C7CEEA",
        "#FFDAC1", "#FFB7B2", "#E2F0CB", "#C9C9FF", "#FFABAB",
        "#FFD6A5", "#CAFFBF", "#9BF6FF", "#A0C4FF",
        "#BDB2FF", "#FFC6FF", "#FFCBF2", "#A3C4F3", "#D5AAFF",
        "#FFF1C1", "#B6E2D3", "#FFDEE9", "#DEFDE0", "#D0F4DE",
        '#FF5733', '#33B5FF', '#8E44AD', '#2ECC71', '#E67E22', '#1ABC9C', '#F1C40F', '#D35400',
        '#C0392B', '#2980B9', '#27AE60', '#9B59B6', '#34495E', '#E74C3C', '#7F8C8D', '#16A085',
        '#F39C12', '#BDC3C7', '#95A5A6', '#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1',
        '#955251', '#B565A7', '#009B77', '#DD4124', '#D65076', '#45B8AC', '#EFC050', '#5B5EA6',
        '#9B2335', '#DFCFBE', '#55B4B0', '#E15D44', '#7FCDCD', '#BC243C', '#6C4F3D', '#C3447A',
        '#FFA500', '#40E0D0', '#FF1493', '#20B2AA', '#BA55D3', '#CD5C5C', '#5F9EA0', '#9ACD32',
        '#00CED1', '#9932CC', '#DAA520', '#ADFF2F', '#FF4500', '#7CFC00', '#4682B4', '#EE82EE',
        '#B22222', '#1E90FF', '#008B8B', '#B0C4DE', '#8A2BE2', '#D2691E', '#DC143C', '#00BFFF',
        '#228B22', '#4B0082', '#F08080', '#66CDAA', '#FFA07A', '#9370DB', '#FA8072', '#00FF7F',
        '#8B0000', '#FFD700', '#00FA9A', '#8FBC8F', '#9932CC', '#FF00FF', '#C71585', '#4169E1',
        '#6A5ACD', '#FF8C00', '#7B68EE', '#DB7093', '#CD853F', '#8B4513', '#DEB887', '#A0522D',
        '#F5DEB3', '#BC8F8F', '#D2B48C', '#DA70D6', '#FFFACD', '#F0E68C', '#D8BFD8', '#FFE4E1',
        '#F5F5DC', '#FFF0F5', '#FFEBCD', '#FFEFD5', '#FFDEAD', '#F0FFF0', '#E0FFFF', '#F8F8FF',
        '#F5FFFA', '#FDF5E6', '#F0FFFF', '#FAFAD2', '#FFFAF0', '#FFF5EE', '#F5F5F5', '#FFF8DC',
        '#FFFFE0', '#FFFAFA', '#FFFFF0', '#FFB6C1', '#FF69B4', '#FF6347', '#DC143C', '#FF0000',
        '#FF7F50', '#FF8C69', '#FF7256', '#FF4500', '#FF6347', '#FF0000', '#8B0000', '#B22222',
        '#FA8072', '#E9967A', '#FFA07A', '#FF8C00', '#FFA500', '#FFD700', '#FFFF00', '#9ACD32',
        '#ADFF2F', '#7FFF00', '#7CFC00', '#00FF00', '#32CD32', '#00FA9A', '#00FF7F', '#3CB371',
        '#2E8B57', '#006400', '#228B22', '#008000', '#6B8E23', '#808000', '#556B2F', '#66CDAA',
        '#20B2AA', '#008B8B', '#008080', '#00FFFF', '#00CED1', '#40E0D0', '#48D1CC', '#00BFFF',
        '#1E90FF', '#4169E1', '#0000FF', '#0000CD', '#00008B', '#000080', '#191970', '#8A2BE2',
        '#9400D3', '#9932CC', '#BA55D3', '#9370DB', '#6A5ACD', '#7B68EE', '#8B008B', '#800080',
        '#4B0082', '#6B5B95', '#3C3C3C', '#2F4F4F', '#696969', '#708090', '#778899', '#B0C4DE',
        '#4682B4', '#5F9EA0', '#6495ED', '#87CEEB', '#87CEFA', '#ADD8E6', '#B0E0E6', '#AFEEEE',
        '#E0FFFF', '#F0FFFF', '#F0F8FF', '#F8F8FF', '#F5F5F5', '#FFF5EE', '#FAEBD7', '#FFE4C4'
    ];

    const options = [
        { value: 'attending', label: 'Ya, saya akan hadir' },
        { value: 'not-attending', label: 'Tidak, saya tidak bisa hadir' },
        { value: 'maybe', label: 'InsyaAllah, nanti saya konfirmasi' }
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
        const name = !guestName || invite?.is_group ? newName : guestName

        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const { data, error } = await supabase
            .from('messages')
            .insert([{ name: name, attending: attendance, message: newWish }]); // Insert new user

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
        if (!guestName || invite?.is_group) {
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
        return guestName && !invite?.is_group ? guestName : 'Kamu';
    }

    function ShowAttendanceReaction() {
        return attendance === 'attending' ? (
            <Smile className="w-5 h-5 text-emerald-500" />) : (attendance === 'not-attending' ? (
                <Frown className="w-5 h-5 text-rose-500" />) : (
                    <Meh className="w-5 h-5 text-amber-500" />));
    }

    const getAttendance = async () => {
        try {
            // Get guest parameter from URL
            const urlParams = new URLSearchParams(window.location.search);
            const guestParam = urlParams.get('guest');

            const { data, error } = await supabase
            .from("attendances")
            .select()
            .ilike("name", `%${guestParam}%`)
            .limit(1)
            .single();
            
            if (error) {
                throw new Error(JSON.stringify(error));
            }

            setInvite(data)
        } catch (error) {
            const err = JSON.parse(error.message)
            if (err.message == 'TypeError: Failed to fetch') {
            }
        }
    };

    useEffect(() => {
        getWhises();
        getAttendance();

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

            <div className="container mx-auto px-4 py-20 relative z-10 draw_line bottom">
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
                        <Marquee speed={90}
                            gradient={false}
                            className="[--duration:140s] py-2">
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
                                                    {wish.name[0]?.toUpperCase()}
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
                                        <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-8">
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
                                {
                                    (!guestName || invite?.is_group) ?
                                    (
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
                                    )
                                    :
                                    (
                                        null
                                    )
                                }

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