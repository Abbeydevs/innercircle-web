"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#07070A",
        padding: "clamp(5rem, 12vw, 10rem) 1.5rem",
      }}
    >
      <motion.div
        style={{ y: glowY }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div style={{
          width: "70%",
          height: "60%",
          background: "radial-gradient(ellipse at center, rgba(229,193,88,0.045) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
      </motion.div>

      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #07070A, transparent)" }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "40%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(229,193,88,0.15), transparent)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(1.8rem, 4vw, 3rem)" }}>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <div style={{ height: 1, width: 32, background: "linear-gradient(to right, transparent, #E5C158)" }} />
          <p style={{
            color: "#E5C158",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            fontSize: "0.7rem",
          }}>
            The Vision
          </p>
          <div style={{ height: 1, width: 32, background: "linear-gradient(to left, transparent, #E5C158)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(1.75rem, 4.5vw, 3.75rem)",
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            maxWidth: "860px",
          }}
        >
          Inner Circle is not just an event. It is a{" "}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.7 }}
            style={{
              color: "rgba(255,255,255,0.35)",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            worship-driven
          </motion.span>{" "}
          gathering where music, presence, and community collide.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <div style={{ height: 1, width: 48, background: "linear-gradient(to right, transparent, rgba(229,193,88,0.4))" }} />
          <span style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "rgba(229,193,88,0.5)",
          }}>
            Music &nbsp;·&nbsp; Presence &nbsp;·&nbsp; Community
          </span>
          <div style={{ height: 1, width: 48, background: "linear-gradient(to left, transparent, rgba(229,193,88,0.4))" }} />
        </motion.div>

        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 1,
            height: 88,
            background: "linear-gradient(to bottom, rgba(229,193,88,0.5), transparent)",
            transformOrigin: "top center",
          }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, #07070A, transparent)" }}
      />
    </section>
  );
}