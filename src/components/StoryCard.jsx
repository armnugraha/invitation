import { useState, useEffect } from "react";

const StoryCard = () => {
  const photos = [
    "/images/photo1.jpeg",
    "/images/photo2.jpg",
    "/images/photo3.jpeg",
    "/images/photo4.jpg",
    "/images/photo5.jpg",
    "/images/photo6.jpg",
    "/images/photo1.jpeg",
    "/images/photo2.jpg",
    "/images/photo3.jpeg",
    "/images/photo4.jpg",
    "/images/photo5.jpg",
    "/images/photo6.jpg",
    "/images/photo1.jpeg",
    "/images/photo2.jpg",
    "/images/photo3.jpeg",
    "/images/photo7.png",
    "/images/photo8.jpeg",
    "/images/photo9.jpeg",
    "/images/photo10.png",
  ];

  const rotations = [-4, 3, -2, 5, -5, 2, -1, 4, -3, 1]; // Slight random rotations
  const offsets = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]; // Horizontal offset

  const text = `  Bismillah, perjalanan kami menjalani ibadah terpanjang dalam hidup baru saja akan dimulai. Semoga dengan niat yang baik dan ikhlas, segala sesuatunya dapat berjalan dengan lancar. Kami memohon doa restu dari keluarga, sahabat, rekan-rekan, semoga ini dapat menjadi awal lembaran baru yang penuh berkah serta dapat menjadi keluarga yang sakinah, mawaddah dan warahmah sampai jannah-Nya Allah. Aamiin.\n\nFebri dan Arman`;

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < (text.length - 1)) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval); // stop saat selesai
      }
    }, 550); // ketik per 35ms (bisa disesuaikan kecepatannya)

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="flex bg-white rounded-2xl shadow-lg p-8">
        <div className="w-1/2 pr-2 flex items-center">
            <p className="text-gray-800 text-xs leading-relaxed" style={{ minHeight: "40vh", whiteSpace: "pre-wrap" }}>
                {displayedText}
                <span className="animate-pulse">|</span> {/* cursor animasi */}
            </p>
        </div>
        <div>
            {photos.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt={`photo${i + 1}`}
                    className="absolute top-2/2 left-1/2 w-40 h-60 object-cover rounded-xl shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:-translate-y-2 opacity-0 animate-fade-in"
                    style={{
                    transform: `translate(-50%, -50%) rotate(${rotations[i % rotations.length]}deg) translateX(${offsets[i % offsets.length]}px)`,
                    animationDelay: `${i * 9000}ms`,
                    zIndex: i,
                    }}
                />
            ))}
        </div>
    </div>
  );
};

export default StoryCard;
