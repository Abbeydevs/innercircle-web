"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "#07070A",
        padding: "clamp(4rem, 10vw, 9rem) clamp(1rem, 4vw, 3rem)",
      }}
    >
      <motion.div
        style={{ y: glowY }}
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div style={{
          width: 480, height: 640,
          background: "radial-gradient(ellipse at left, rgba(229,193,88,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
      </motion.div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        width: "40%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(229,193,88,0.15), transparent)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
          style={{ aspectRatio: "4/5" }}
        >
          <motion.div
            initial={{ opacity: 0, x: 8, y: 8 }}
            whileInView={{ opacity: 1, x: 12, y: 12 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0"
            style={{ border: "1px solid rgba(229,193,88,0.18)" }}
          />

          <div className="relative z-10 w-full h-full overflow-hidden group" style={{ background: "rgba(255,255,255,0.04)" }}>
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
              alt="Founder Portrait"
              fill
              className="object-cover"
              style={{
                filter: "grayscale(100%) brightness(0.75)",
                transition: "filter 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) brightness(0.9)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%) brightness(0.75)";
              }}
            />

            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(229,193,88,0.1) 0%, transparent 65%)",
            }} />

            <div className="absolute inset-0 pointer-events-none" style={{
              background: "linear-gradient(to top, rgba(7,7,10,0.6) 0%, rgba(7,7,10,0.1) 40%, transparent 70%)",
            }} />

            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
            }} />
          </div>

          {[
            "top-2 left-2 border-t border-l",
            "top-2 right-2 border-t border-r",
            "bottom-2 left-2 border-b border-l",
            "bottom-2 right-2 border-b border-r",
          ].map((cls, i) => (
            <div
              key={i}
              className={`absolute z-20 w-5 h-5 ${cls} pointer-events-none`}
              style={{ borderColor: "rgba(229,193,88,0.4)" }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
          style={{ display: "flex", flexDirection: "column", gap: "clamp(1.4rem, 3vw, 2.2rem)" }}
        >
          <div className="flex items-center gap-3">
            <div style={{ height: 1, width: 28, background: "linear-gradient(to right, transparent, #E5C158)" }} />
            <span style={{
              fontSize: "0.65rem", fontWeight: 700,
              letterSpacing: "0.4em", textTransform: "uppercase", color: "#E5C158",
            }}>
              The Heart Behind It
            </span>
          </div>

          <div>
            <h2 style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 700, letterSpacing: "-0.02em",
              color: "#FFFFFF", lineHeight: 1,
            }}>
              Born from a{" "}
              <span style={{ color: "rgba(255,255,255,0.28)", fontWeight: 300, fontStyle: "italic" }}>
                hunger
              </span>
              <br />for encounter.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              "Inner Circle was born out of a profound desire to see people experience a genuine, undiluted atmosphere of worship. It is not about a performance; it is about an encounter.",
              "We realized that the community was hungry for a space where the music serves as a bridge, not just entertainment. A place where every individual, regardless of their background, can step into the room and immediately feel a shift in the atmosphere.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontWeight: 300,
                  lineHeight: 1.85,
                  fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
                  letterSpacing: "0.01em",
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{
              padding: "1.2rem 1.4rem",
              borderLeft: "2px solid rgba(229,193,88,0.5)",
              background: "rgba(229,193,88,0.04)",
            }}
          >
            <span style={{
              position: "absolute", top: -8, left: 14,
              fontSize: "3rem", lineHeight: 1,
              color: "rgba(229,193,88,0.25)",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
            }}>"</span>
            <p style={{
              color: "rgba(255,255,255,0.75)",
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1.75,
              fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
              paddingTop: "0.4rem",
            }}>
              We don't just host events. We curate moments that leave a lasting mark on the soul.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
          >
            <div className="flex items-center gap-3">
              <div style={{ height: 1, width: 20, background: "#E5C158", opacity: 0.6 }} />
              <p style={{
                fontSize: "0.7rem", fontWeight: 800,
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "#E5C158",
              }}>
                Krizbeatz Tha DrummerBoy
              </p>
            </div>
            <p style={{
              fontSize: "0.62rem", fontWeight: 500,
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              paddingLeft: "2rem",
            }}>
              Founder, Inner Circle
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-16 relative z-10"
        style={{
          width: 1, height: 72,
          background: "linear-gradient(to bottom, rgba(229,193,88,0.4), transparent)",
          transformOrigin: "top center",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, #07070A, transparent)" }}
      />
    </section>
  );
}