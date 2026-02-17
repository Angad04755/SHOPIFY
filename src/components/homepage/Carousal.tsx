"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface ImageProps {
  images: StaticImageData[];
}

const Carousel = ({ images }: ImageProps) => {
  const slides = [...images, images[0]]; // clone first at end

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const stopSlide = () => { 
    setIsPaused(true) 
  };
  const startSlide = () => { 
    setIsPaused(false) 
  };

  // Auto forward slide
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Reset after clone
  useEffect(() => {
    if (index === slides.length - 1) {
      setTimeout(() => {
        setAnimate(false);
        setIndex(0);
      }, 500);
    }
  }, [index, slides.length]);

  // Re-enable animation
  useEffect(() => {
    if (!animate) requestAnimationFrame(() => setAnimate(true));
  }, [animate]);

  const forward = () => {
    setIndex((prev) => prev + 1)
  };
  const backward = () => {
    setIndex((prev) => prev - 1)
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="container mx-auto w-full"
    >
      <div className="relative w-full overflow-hidden">
        {/* Carousel slides */}
        <div
          className={`flex ${animate ? "transition-transform duration-500 ease-in-out" : ""}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
          onMouseEnter={stopSlide}
          onMouseLeave={startSlide}
        >
          {slides.map((src, i) => {
            return (
            <div key={i} className="min-w-full">
              <Image
                src={src}
                alt={`slide-${i}`}
                width={1700}
                height={550}
                className="rounded-2xl object-cover w-full"
              />
            </div>
            )
          }
        )}
        </div>

        {/* Desktop buttons on sides */}
        <button
          onClick={backward}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full hover:bg-black/60 transition-all duration-300 sm:block hidden"
        >
          ‹
        </button>
        <button
          onClick={forward}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full hover:bg-black/60 transition-all duration-300 sm:block hidden"
        >
          ›
        </button>
      </div>

      {/* Mobile buttons below carousel */}
      <div className="flex justify-center gap-6 mt-3 sm:hidden">
        <button
          onClick={backward}
          className="bg-black/40 text-white px-6 py-2 rounded-full hover:bg-black/60 transition-all duration-300"
        >
          ‹
        </button>
        <button
          onClick={forward}
          className="bg-black/40 text-white px-6 py-2 rounded-full hover:bg-black/60 transition-all duration-300"
        >
          ›
        </button>
      </div>
    </motion.div>
  );
};

export default Carousel;
