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
    const [isForm, setIsForm] = useState(true);
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

            setIsForm(false);
            setWishes([
                {
                    "id": 49,
                    "timestamp": "2025-06-28T05:23:16.935677+00:00",
                    "name": "X AB Sekolah GeniUS 2022-2023",
                    "attending": "not-attending",
                    "message": "Hai ibu finally yh setelah beberapa tahun penantian harapanya terjawab juga. intinya yang terbaik disediakan dalam bahtera rumah tangganya. ibu maaf sekali lg tra bisa hadir intinya doa terbaik untuk ibu dan suami. LOVE U BU DIAN \"-\""
                },
                {
                    "id": 48,
                    "timestamp": "2025-06-25T23:53:20.958263+00:00",
                    "name": "Mba Ana",
                    "attending": "not-attending",
                    "message": "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fi khairi, Selamat Febri & Arman"
                },
                {
                    "id": 47,
                    "timestamp": "2025-06-25T11:50:15.635008+00:00",
                    "name": "Wildan kj3",
                    "attending": "not-attending",
                    "message": "Barakallahu lakum wa baraka alaikum wa jama’a bainakuma fi khair. Semoga Allah melimpahkan keberkahan dan kebahagiaan arman dan istri sekeluarga. Dan menjadi keluarga yang sakinah mawadah warahmah. Hampura man teu bisa datang, haturnuhun tos diondang. "
                },
                {
                    "id": 46,
                    "timestamp": "2025-06-25T05:51:47.767011+00:00",
                    "name": "Nikreuh Squad",
                    "attending": "attending",
                    "message": "Teman, sahabat, seperjuangan akhirnya menemukan tambatan hati 🤲, lancar berkah barokah buat Arman dan Febri, menjadi keluarga sakinah mawaddah warahmah.\n\nWelcome to the club, menjadi sobat Nikreuh yeuh"
                },
                {
                    "id": 45,
                    "timestamp": "2025-06-23T07:33:22.00586+00:00",
                    "name": "Bu Astrid",
                    "attending": "maybe",
                    "message": "MasyaAllah bu dian, semoga Allah berikan kelancaran hingga hari H. Semoga bu Dian dan suami kelak dapat menjadi keluarga yang sakinah mawaddah warahmah amiin. "
                },
                {
                    "id": 44,
                    "timestamp": "2025-06-21T14:17:32.728526+00:00",
                    "name": "Ahmad Somantri",
                    "attending": "not-attending",
                    "message": "Alhamdulillah selamat man , ngiring bungah semoga diberi kelancaran sampe hari h, bisa jadi kepala keluarga yang amanah, dan imam yang baik ."
                },
                {
                    "id": 43,
                    "timestamp": "2025-06-21T13:43:55.316298+00:00",
                    "name": "Pak Fisa",
                    "attending": "maybe",
                    "message": "Selamat Bu Dian dan calon suami\nSemoga dilancarkan, selamat menempuh hidup baru, Allah merahmati kalian..."
                },
                {
                    "id": 42,
                    "timestamp": "2025-06-21T13:26:28.695836+00:00",
                    "name": "Pak Nalendra",
                    "attending": "not-attending",
                    "message": "Selamat Bu Dosen SAMAWA, maafkeun belum bisa hadir 🙏"
                },
                {
                    "id": 41,
                    "timestamp": "2025-06-19T13:32:10.016303+00:00",
                    "name": "Heruwin",
                    "attending": "not-attending",
                    "message": "Doa Terbaik Buat  sahabat/saudaraku.. 🤗\nSalah satu brader terbaik dari dulu sampai skrang 🤘\nOrang Baik pasti bertemu yg Baik Juga, Sekali lagi Selamat berbahagia braderr, Langeng Terus Saudaraku, Hampura teu bisa hadir 🙏😇\n"
                },
                {
                    "id": 40,
                    "timestamp": "2025-06-19T12:03:41.948457+00:00",
                    "name": "Ferel A",
                    "attending": "attending",
                    "message": "Menjadi keluarga yang berkah dunia dan akhirat pokoknya "
                },
                {
                    "id": 39,
                    "timestamp": "2025-06-14T11:46:25.093229+00:00",
                    "name": "Ms Ipeh",
                    "attending": "attending",
                    "message": "Masya allah tabarakallah.. Finally my lovely student in the past will get married.. Feeling happy.. May become a samara happy family aamiin ya rabb.. Big hug little girl who has been grown up😘"
                },
                {
                    "id": 38,
                    "timestamp": "2025-06-14T10:20:54.245239+00:00",
                    "name": "Meritania",
                    "attending": "maybe",
                    "message": "Barakallah Febri dan calon suami! Semoga lancar sampai hari H dan seterusnyaaa \nSehat-sehat yaaaa kalian \nLuv ❤"
                },
                {
                    "id": 37,
                    "timestamp": "2025-06-14T07:42:17.176069+00:00",
                    "name": "Bu Elisa Dityani",
                    "attending": "maybe",
                    "message": "Aaaaa.. gak nyangka. Selamat bu dian. Tuhan berkati persiapan dan pernikahannua ya.. "
                },
                {
                    "id": 32,
                    "timestamp": "2025-06-13T03:08:20.099192+00:00",
                    "name": "MPS Squad",
                    "attending": "maybe",
                    "message": "\"Barakallahu laka wa baraka \\'alaika wa jama\\'a bainakuma fi khair.\" \nSemoga Allah memberkahi pernikahanmu, dan menyatukan kalian dalam kebaikan dan menjadikan rumah tangga kalian sakinah, mawaddah, dan rahmah.\n*Arman&Febri*"
                },
                {
                    "id": 31,
                    "timestamp": "2025-06-09T08:16:56.778322+00:00",
                    "name": "Guguh Nomilasari",
                    "attending": "attending",
                    "message": "Barakallah Febb semoga dilancarkan niat baiknya Hari-H dan seterusnya. Aamiin 🤲🏻"
                },
                {
                    "id": 30,
                    "timestamp": "2025-06-09T08:13:41.573808+00:00",
                    "name": "Bu Febriani Dwi Sari",
                    "attending": "attending",
                    "message": "MasyaAllah selamat Ibu Dian, semoga diberikan kelancaran dan kemudahan. Selamat menjalankan ibadah terpanjang Bu Dian 🙏🏻🙏🏻"
                },
                {
                    "id": 29,
                    "timestamp": "2025-06-08T14:24:43.953792+00:00",
                    "name": "Mba Jula",
                    "attending": "maybe",
                    "message": "Masya Allah Tabarakallah...\nSelamat adekkuu.. Semoga diberikan kemudahan dan kelancaran segala prosesinya sampai sah..\nBismillah.. Jodoh dunia dan akhirat.. Menjadi keluarga yang sakinah mawaddah Warahmah\n\nAamiin"
                },
                {
                    "id": 28,
                    "timestamp": "2025-06-08T10:49:43.947863+00:00",
                    "name": "Mba Sukma",
                    "attending": "not-attending",
                    "message": "Masya Allah barakallah dek Febri dan suami. Semoga menjadi keluarga yang sakinah mawaddah warahmah yaa 🥰🥰🥰🥰"
                },
                {
                    "id": 27,
                    "timestamp": "2025-06-08T09:04:07.619411+00:00",
                    "name": "Bu Siska",
                    "attending": "attending",
                    "message": "Barakallah... masyallah tabarakallah\nJika Allah sudah berkehendak, pasti terjadi.\nMasyallah... berkah dan bahagia selalu, Bu Dian 💘"
                },
                {
                    "id": 26,
                    "timestamp": "2025-06-08T08:48:31.608312+00:00",
                    "name": "Ms. Azalia Herma",
                    "attending": "not-attending",
                    "message": "May Allah gives you His bless and happiness until DDay yaaa. Be blessed!"
                },
                {
                    "id": 25,
                    "timestamp": "2025-06-04T14:21:48.361443+00:00",
                    "name": "Fauzi & Istri",
                    "attending": "",
                    "message": "Bismillah semoga dilancarkan dimudahkan dan kelak setelah berkeluarga menjadi keluarga yang sakinah mawaddah warahmah doa terbaik untuk armaan dan calon nya febri 🤲"
                },
                {
                    "id": 24,
                    "timestamp": "2025-06-04T12:57:03.76488+00:00",
                    "name": "Yovanda & Istri",
                    "attending": "attending",
                    "message": "Alhamdulillah sahabat sejak SD sudah mau menikah 🤩🤩 semoga menjadi kepala keluarga yang baik untuk keluarganya arman. Semoga menjadi keluarga yang harmonis dan terus bahagia 🤲🤲🤲"
                },
                {
                    "id": 23,
                    "timestamp": "2025-06-04T07:03:39.171201+00:00",
                    "name": "April & Adit",
                    "attending": "attending",
                    "message": "Selamat ahhh semoga lancar sampe hari H & menjadi keluarga yg samawa aamiinn 🤲🏻🤲🏻🤲🏻🤲🏻"
                },
                {
                    "id": 22,
                    "timestamp": "2025-06-02T03:07:33.218267+00:00",
                    "name": "Tuti Ratnasari",
                    "attending": "maybe",
                    "message": "Barakallah Peeb😍\nSemoga Allah mudahkan & lancarkan semuanya hingga hari H. Samawa, bahagia dunia akhirat😊\nSelamat ya sdh melewati singlelillah"
                },
                {
                    "id": 21,
                    "timestamp": "2025-05-29T04:06:48.178945+00:00",
                    "name": "Dian Nafiah",
                    "attending": "maybe",
                    "message": "Barakallah febri🥰😍 semoga diberi kemudahan dan kelancaran sampai hari H. Bisa menjadi keluarga sakinah mawaddah wa rahmah❤️❤️"
                },
                {
                    "id": 20,
                    "timestamp": "2025-05-29T01:16:30.447228+00:00",
                    "name": "Kavita Febriana Putri",
                    "attending": "not-attending",
                    "message": "MasyaAllah\nBarakallah pep 😊\n\nSemoga dilancarkan dan dimudahkan prosesnya\nJadi keluarga yg sakinnah mawaddah dan warrahmah 🤲🏻"
                },
                {
                    "id": 19,
                    "timestamp": "2025-05-29T01:05:48.18467+00:00",
                    "name": "Ahmad Syarief",
                    "attending": "",
                    "message": "Barakallah kak feb! Semoga dimudahkan semuanyaaa, aaamiiin ya Allah "
                },
                {
                    "id": 18,
                    "timestamp": "2025-05-27T02:08:08.488385+00:00",
                    "name": "Maulana Yusuf K",
                    "attending": "maybe",
                    "message": "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair. Selamat Arman dan Teh Febri semoga selalu diberi kemudahan, kelancaran, dan keberkahan disetiap niat, momen, dan langkahnya. Senantiasa saling jaga, saling dukung, dan saling mendoakan satusama lain ya. Turut Bahagia !!"
                },
                {
                    "id": 17,
                    "timestamp": "2025-05-25T05:50:51.139541+00:00",
                    "name": "Desita Kamila Ulfa",
                    "attending": "not-attending",
                    "message": "MasyaAllah. Bismillah semoga Allah SWT memberikan kelancaran dan keberkahan sampai hari H dan seterusnya. Selamat menjalankan ibadah seumur hidup ya febb caluyyy dan suami, semoga menjadi keluarga sakinah mawaddah warahmah dunia dan akhirat till jannah. Aamiin ya Rabbal Alamin 🤲🤲🤲"
                },
                {
                    "id": 16,
                    "timestamp": "2025-05-25T04:34:56.983378+00:00",
                    "name": "Mba Anis",
                    "attending": "maybe",
                    "message": "Barakallah ya adikk kost kuuuuuu\nSemoga allah mudahkan urusannya, terharuuuuuuuu ikut bahagia. Semoga bisa hadir kesana aamiin\n"
                },
                {
                    "id": 15,
                    "timestamp": "2025-05-23T01:52:01.306052+00:00",
                    "name": "Putri Kurnia Villta",
                    "attending": "maybe",
                    "message": "Semoga lancar sampai hari H dan petualangan selanjutnya ya bifeb❤️🤗"
                },
                {
                    "id": 14,
                    "timestamp": "2025-05-21T11:05:23.884689+00:00",
                    "name": "Larassakti Kusuma",
                    "attending": "not-attending",
                    "message": "MasyaAllah barakallah pebrikuuu.. akhirnyaaa berlabuh jugaaa, bismillah Allah mudahkan semuanyaaaa :)"
                },
                {
                    "id": 13,
                    "timestamp": "2025-05-20T11:07:16.652769+00:00",
                    "name": "Artika Rizki N",
                    "attending": "not-attending",
                    "message": "MaasyaAllah tabarakallah bek, semoga lancar sampai hari H dan seterusnya, dan semoga Allah memberkahi kehidupan pernikahan kalian yaa 🥰🥰🥰"
                },
                {
                    "id": 12,
                    "timestamp": "2025-05-19T05:17:31.721926+00:00",
                    "name": "Usnida Umma Zahra",
                    "attending": "attending",
                    "message": "Baarakallaah Febri dan Arman..\nSemoga Allah berikan kemudahan, kelancaran, dan keberkahan selama perjalanan menuju akad, saat akad, dan kehidupan pasca akad. ❤️🥰"
                },
                {
                    "id": 11,
                    "timestamp": "2025-05-19T05:15:44.034731+00:00",
                    "name": "Usnida Umma Zahra",
                    "attending": "attending",
                    "message": "Baarakallaah Febrii dan Arman.. Semoga Allah berikan kemudahan, kelancaran, dan keberkahan selama perjalanan menuju hari H, s"
                },
                {
                    "id": 10,
                    "timestamp": "2025-05-19T05:06:40.532963+00:00",
                    "name": "Jannatul Firdaus dan Suami🤍",
                    "attending": "attending",
                    "message": "MasyaAllah tabarakallah my luv pepiii 🤍🤍🤍🤍 semoga Allah melancarkan niat baik kalian berdua dan dijadikan keluarga ya sakinah mawaddah warahmah 🤍 "
                },
                {
                    "id": 9,
                    "timestamp": "2025-05-19T02:03:13.75659+00:00",
                    "name": "Nur'aini Dian P",
                    "attending": "not-attending",
                    "message": "Masyaa Allah, Allahumma Bariik. May Allah make everything easy for both of you 💐"
                },
                {
                    "id": 8,
                    "timestamp": "2025-05-19T01:41:18.03418+00:00",
                    "name": "Windy Yuniarti dan Adika Putra P",
                    "attending": "attending",
                    "message": "Semoga lancar sampai hari H, bahagia dunia akhirat selamanya aamiin. 🤍"
                },
                {
                    "id": 7,
                    "timestamp": "2025-05-19T01:14:01.267417+00:00",
                    "name": "Widha Puspa Tanjung",
                    "attending": "attending",
                    "message": "MasyaAllah tabarakallah... semoga dilimpahkan keberkahan selalu Febri dan pasangan 🤭🤭🤭"
                },
                {
                    "id": 6,
                    "timestamp": "2025-05-18T09:07:10.625249+00:00",
                    "name": "Natasha Amalia dan Suami🤍",
                    "attending": "attending",
                    "message": "Barakallah pepita dan kang Arman! Semoga dimudahkan perjalanan baru nya 🤍"
                }
            ])
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
                {isForm && 
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
                }
            </div>
        </section>
    </>)
}