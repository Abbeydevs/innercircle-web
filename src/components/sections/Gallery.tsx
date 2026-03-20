"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  className?: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

function getGridClass(index: number): string {
  const pattern = [
    "col-span-2 row-span-2", 
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1", 
    "col-span-1 row-span-1", 
  ];
  return image_class_override(index) ?? pattern[index % pattern.length];
}

function image_class_override(index: number): string | null {
  return null;
}

export function Gallery({ images }: GalleryProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#07070A",
        paddingTop: "clamp(4rem, 10vw, 8rem)",
        paddingBottom: "clamp(4rem, 10vw, 8rem)",
      }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        width: "60%", height: "2px",
        background: "linear-gradient(90deg, transparent, rgba(229,193,88,0.18), transparent)",
      }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(229,193,88,0.03) 0%, transparent 70%)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          style={{ padding: "0 clamp(1rem, 4vw, 3rem)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ height: 1, width: 28, background: "linear-gradient(to right, transparent, #E5C158)" }} />
              <span style={{
                fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.4em", textTransform: "uppercase", color: "#E5C158",
              }}>
                The Experience
              </span>
            </div>
            <h2 style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700, letterSpacing: "-0.02em",
              color: "#FFFFFF", lineHeight: 1,
            }}>
              Moments from the{" "}
              <span style={{ color: "rgba(255,255,255,0.28)", fontWeight: 300, fontStyle: "italic" }}>
                gathering.
              </span>
            </h2>
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              fontSize: "0.6rem", fontWeight: 700,
              letterSpacing: "0.4em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
              whiteSpace: "nowrap",
              paddingBottom: "0.25rem",
            }}
          >
            {String(images.length).padStart(2, "0")} Images
          </motion.span>
        </motion.div>

        <style>{`
          .gallery-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 72vw;
          }
          @media (min-width: 768px) {
            .gallery-grid {
              grid-template-columns: repeat(4, 1fr);
              grid-auto-rows: clamp(140px, 18vw, 240px);
              gap: 0.75rem;
              padding: 0 clamp(1rem, 4vw, 3rem);
            }
          }
        `}</style>

        <div className="grid gallery-grid">

          {images.map((image, index) => {
            const desktopClass = image.className || getGridClass(index);
            const isHovered = hovered === image.id;

            return (
              <motion.div
                key={image.id}
                className={`relative overflow-hidden group cursor-pointer md:${desktopClass}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: Math.min(index * 0.07, 0.5),
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHovered(image.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  style={{
                    transform: isHovered ? "scale(1.07)" : "scale(1)",
                    transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                    filter: isHovered ? "brightness(0.65)" : "brightness(0.85)",
                  }}
                />

                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(7,7,10,0.7) 0%, rgba(7,7,10,0.15) 50%, transparent 100%)",
                  pointerEvents: "none",
                }} />

                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.5s ease",
                    background: "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(229,193,88,0.12) 0%, transparent 70%)",
                  }}
                />

                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    border: "1px solid rgba(229,193,88,0.3)",
                  }}
                />

                <div
                  className="absolute top-2.5 left-2.5 w-4 h-4 pointer-events-none"
                  style={{
                    borderTop: "1px solid rgba(229,193,88,0.6)",
                    borderLeft: "1px solid rgba(229,193,88,0.6)",
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "scale(1)" : "scale(0.6)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                  }}
                />

                <motion.div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none px-3.5 pb-3"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                  }}
                >
                  <p style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                  }}>
                    {image.alt}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div style={{ padding: "0 clamp(1rem, 4vw, 3rem)" }}>
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-16"
          style={{
            width: 1,
            height: 72,
            background: "linear-gradient(to bottom, rgba(229,193,88,0.4), transparent)",
            transformOrigin: "top center",
          }}
        />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, #07070A, transparent)" }}
      />
    </section>
  );
}