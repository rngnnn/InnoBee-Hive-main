import React, { useEffect, useState } from "react";
import { homeImageSlider } from "../constants";

const HomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % homeImageSlider.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);
  return (
    <div className="xl:w-[48%] lg:w-[70%] md:w-[80%] w-full min-h-80  shadow rounded-xl">
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        {homeImageSlider.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-brown bg-opacity-50">
              <p className="text-white px-6 text-lg md:text-xl lg:text-2xl">
                {image.description}
              </p>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {homeImageSlider.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full border-1 cursor-pointer ${
                index === currentSlide
                  ? "bg-yellow-500 border-yellow-500"
                  : "border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
