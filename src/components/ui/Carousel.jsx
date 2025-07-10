import { useState, useEffect, useCallback } from "react";

export default function Carousel({
  slides,
  autoSlide = true,
  autoSlideInterval = 5000,
  arrows = false,
}) {
  const [curr, setCurr] = useState(0);

  const prev = useCallback(
    () => setCurr(curr === 0 ? slides.length - 1 : curr - 1),
    [curr, slides.length]
  );

  const next = useCallback(
    () => setCurr(curr === slides.length - 1 ? 0 : curr + 1),
    [curr, slides.length]
  );

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <div className="overflow-hidden w-full h-screen relative">
      <div
        className="flex transition-transform ease-out duration-500 w-full h-full"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-full">
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brown bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-8">
              <h2 className="text-3xl font-bold">{slide.title}</h2>
              <p className="mt-2 text-lg">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}

      {arrows && (
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={prev}
            className="p-2 bg-white/80 rounded-full shadow text-gray-800 hover:bg-white"
          >
            ⬅
          </button>
          <button
            onClick={next}
            className="p-2 bg-white/80 rounded-full shadow text-gray-800 hover:bg-white"
          >
            ➡
          </button>
        </div>
      )}

      {/* Dots Navigation */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3  items-center rounded-full transition-all cursor-pointer ${
              curr === i ? "bg-white p-2" : "bg-white/50"
            }`}
            onClick={() => setCurr(i)}
          />
        ))}
      </div>
    </div>
  );
}
