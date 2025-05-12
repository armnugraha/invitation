import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const courses = [
  {
    title: "Gunakan pakaian yang sopan dan menutup aurat",
    description: "30 Course",
    image: "/images/pakaian_sopan.svg",
    class: "min-w-[200px] max-w-[220px] rounded-xl p-4 flex flex-col items-center text-center shadow-sm bg-emerald-50",
  },
  {
    title: "Perhatikan adab makan dan minum",
    description: "15 Course",
    image: "/images/adab_makan_minum.svg",
    class: "min-w-[200px] max-w-[220px] rounded-xl p-4 flex flex-col items-center text-center shadow-sm bg-amber-50",
  },
  {
    title: "Mendoakan pengantin",
    description: "10 Course",
    image: "/images/doa.svg",
    class: "min-w-[200px] max-w-[220px] rounded-xl p-4 flex flex-col items-center text-center shadow-sm bg-indigo-50",
  },
  {
    title: "Hindari ghibah",
    description: "15 Course",
    image: "/images/gibah.svg",
    class: "min-w-[200px] max-w-[220px] rounded-xl p-4 flex flex-col items-center text-center shadow-sm bg-red-50",
  },
  {
    title: "Tidak melalaikan Shalat Wajib",
    description: "10 Course",
    image: "/images/sholat.svg",
    class: "min-w-[200px] max-w-[220px] rounded-xl p-4 flex flex-col items-center text-center shadow-sm bg-sky-50",
  },
];

export default function CourseCarousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center px-2 mb-4">
        <h2 className="text-md text-left font-semibold">Tamu undangan diharapkan dapat mematuhi adab dalam walimah selama acara berlangsung.</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {courses.map((course, index) => (
          <div
            key={index}
            className={course.class}
          >
            <img src={course.image} alt={course.title} className="w-24 h-24 object-contain mb-3" />
            <h3 className="text-md font-semibold">{course.title}</h3>
            {/* <p className="text-sm text-gray-500">{course.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
