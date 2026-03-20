"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryImage = {
  id: string;
  url: string;
  alt: string;
};

export function FullGallery({ images }: { images: GalleryImage[] }) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") setCurrentIndex(null);
    },
    [currentIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const showNext = () => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % images.length);
    }
  };

  const showPrev = () => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="py-32 text-center text-white/40 uppercase tracking-widest text-sm">
        No images in the vault yet.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#07070A] pt-32 pb-24 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-white mb-4">
            The Archive
          </h1>
          <div className="w-16 h-1 bg-[#E5C158] mx-auto mb-4" />
          <p className="text-white/40 uppercase tracking-widest text-sm">
            {images.length} Captured Moments
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
              onClick={() => setCurrentIndex(index)}
              className="relative group cursor-pointer overflow-hidden bg-white/5"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-75"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07070A]/95 backdrop-blur-xl"
          >
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
              <span className="text-white/50 text-sm font-bold tracking-widest uppercase">
                {currentIndex + 1} / {images.length}
              </span>
              <button
                onClick={() => setCurrentIndex(null)}
                className="p-2 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-50"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-50"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="relative w-full max-w-6xl h-[80vh] px-16" onClick={() => setCurrentIndex(null)}>
              <Image
                src={images[currentIndex].url}
                alt={images[currentIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}