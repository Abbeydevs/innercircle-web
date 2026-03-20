"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

export function Teaser() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative py-24 px-4 md:px-8 bg-[#07070A] flex justify-center">
      <div className="max-w-6xl w-full relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-[#E5C158] font-bold uppercase tracking-[0.3em] text-xs mb-4">
            The Prelude
          </h2>
          <p className="text-3xl md:text-4xl font-medium text-white tracking-wide">
            Experience the Atmosphere
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video w-full bg-[#0B0B0F] border border-white/10 overflow-hidden group shadow-[0_0_50px_rgba(229,193,88,0.05)]"
        >
          {!isPlaying ? (
            <>
              <div 
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-30 transition-opacity duration-700 mix-blend-luminosity"
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#E5C158]/50 flex items-center justify-center bg-black/40 backdrop-blur-md hover:bg-[#E5C158] hover:border-[#E5C158] transition-all duration-500 group/btn"
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-[#E5C158] group-hover/btn:text-[#0B0B0F] ml-2 transition-colors duration-500" />
                </button>
              </div>

              <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            </>
          ) : (
            <div className="w-full h-full bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0" 
                title="Inner Circle Teaser" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}
        </motion.div>

      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-[#E5C158]/5 blur-[120px] pointer-events-none" />
    </section>
  );
}