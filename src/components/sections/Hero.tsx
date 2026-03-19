"use client";

import { motion, Variants, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─── Variants ─── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const lineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── Types ─── */
interface Particle {
  id: number; x: number; y: number;
  size: number; duration: number; delay: number; opacity: number;
}

/* ─── Dust Particles ─── */
function DustParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    setParticles(Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.2 + 0.4,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.45 + 0.08,
    })));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#E5C158]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{
            y: [0, -70, 0],
            x: [0, (Math.random() - 0.5) * 36, 0],
            opacity: [p.opacity, p.opacity * 0.15, p.opacity],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── Spotlight Beam ─── */
interface SpotlightProps {
  x: number; color?: string; delay?: number; angle?: number; intensity?: number;
}
function SpotlightBeam({ x, color = "#E5C158", delay = 0, angle = 0, intensity = 1 }: SpotlightProps) {
  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{ left: `${x}%` }}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: intensity * 0.9, scaleY: 1 }}
      transition={{ duration: 2.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Wide soft cone */}
      <motion.div
        animate={{ opacity: [intensity * 0.65, intensity, intensity * 0.65] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        style={{
          width: 1, height: 0,
          borderLeft: "110px solid transparent",
          borderRight: "110px solid transparent",
          borderTop: `100vh solid ${color}16`,
          transformOrigin: "top center",
          transform: `rotate(${angle}deg)`,
          filter: "blur(2px)",
        }}
      />
      {/* Tight core */}
      <div style={{
        position: "absolute", top: 0, left: "50%",
        transform: `translateX(-50%) rotate(${angle}deg)`,
        width: 0, height: 0,
        borderLeft: "22px solid transparent",
        borderRight: "22px solid transparent",
        borderTop: `100vh solid ${color}26`,
        transformOrigin: "top center",
        filter: "blur(1px)",
      }} />
      {/* Hotspot */}
      <div style={{
        position: "absolute", top: -10, left: "50%",
        transform: "translateX(-50%)",
        width: 20, height: 20, borderRadius: "50%",
        background: color, filter: "blur(5px)", opacity: 0.85,
      }} />
    </motion.div>
  );
}

/* ─── Scan Lines ─── */
function ScanLines() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0" style={{
      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.035) 2px, rgba(0,0,0,0.035) 4px)",
    }} />
  );
}

/* ───────────────────────── HERO ───────────────────────── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const spotX = useTransform(smoothX, [0, 1], [-18, 18]);
  const spotY = useTransform(smoothY, [0, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center justify-center overflow-hidden w-full"
      style={{
        background: "#07070A",
        height: "100vh",
        maxHeight: "100vh",
      }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 55% at 50% 0%, #1c1508 0%, #07070A 65%)" }}
      />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        width: "75%", height: "1px",
        background: "linear-gradient(90deg, transparent, #E5C15850, #E5C158, #E5C15850, transparent)",
        filter: "blur(3px)",
        boxShadow: "0 0 50px 16px #E5C15810",
      }} />

      <ScanLines />

      <SpotlightBeam x={16}  color="#E5C158" delay={0.2}  angle={-8} intensity={0.7} />
      <SpotlightBeam x={50}  color="#ffffff" delay={0.8}  angle={0}  intensity={0.45} />
      <SpotlightBeam x={84}  color="#E5C158" delay={0.4}  angle={8}  intensity={0.7} />
      <SpotlightBeam x={32}  color="#C8A3E0" delay={1.2}  angle={-3} intensity={0.22} />
      <SpotlightBeam x={68}  color="#C8A3E0" delay={1.5}  angle={3}  intensity={0.22} />

      <DustParticles />

      <motion.div className="absolute pointer-events-none" style={{
        x: spotX, y: spotY,
        top: "0%", left: "50%", translateX: "-50%",
        width: 580, height: 400,
        background: "radial-gradient(ellipse at top, #E5C15812 0%, transparent 70%)",
        filter: "blur(28px)",
      }} />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E5C15838] to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center w-full max-w-3xl px-6"
        style={{ gap: "clamp(0.7rem, 1.8vh, 1.2rem)" }}
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <motion.div variants={lineVariants} className="h-px w-10 bg-[#E5C158] origin-left" />
          <span style={{
            fontFamily: "var(--font-albert), sans-serif",
            letterSpacing: "0.3em",
            fontSize: "0.65rem",
            color: "#E5C158",
            textTransform: "uppercase",
            fontWeight: 700,
          }}>
            Next Episode &nbsp;·&nbsp; April 3rd, 2026
          </span>
          <motion.div variants={lineVariants} className="h-px w-10 bg-[#E5C158] origin-right" />
        </motion.div>

        <motion.div variants={itemVariants} style={{ lineHeight: 0.92 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            fontWeight: 700, letterSpacing: "-0.02em", color: "#FFFFFF",
            textShadow: "0 0 70px rgba(229,193,88,0.12), 0 2px 32px rgba(0,0,0,0.8)",
          }}>The Inner</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            fontWeight: 300, letterSpacing: "0.1em", color: "#E5C158",
            fontStyle: "italic",
            textShadow: "0 0 50px rgba(229,193,88,0.4)",
          }}>Circle</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            fontWeight: 700, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.2)",
          }}>Gathering</div>
        </motion.div>

        <motion.p variants={itemVariants} style={{
          fontFamily: "var(--font-albert), sans-serif",
          color: "rgba(255,255,255,0.45)",
          fontSize: "clamp(0.82rem, 1.5vw, 0.96rem)",
          maxWidth: "460px", lineHeight: 1.8,
          letterSpacing: "0.02em",
          fontWeight: 400,
        }}>
          Where music, presence, and community meet. Secure your spot for the most anticipated worship experience of the year.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">

          <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }} className="w-full sm:w-auto">
            <Link
              href="https://tix.africa"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center overflow-hidden group"
              style={{
                height: "50px", padding: "0 2.2rem",
                background: "#E5C158", color: "#07070A",
                fontFamily: "var(--font-albert), sans-serif",
                fontSize: "0.66rem", fontWeight: 800,
                letterSpacing: "0.35em", textTransform: "uppercase",
                textDecoration: "none", display: "inline-flex",
                width: "100%",
              }}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />
              Get Tickets
            </Link>
          </motion.div>

          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
                className="group w-full sm:w-auto flex items-center justify-center gap-2"
                style={{
                  height: "50px", padding: "0 2.2rem",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "rgba(255,255,255,0.62)",
                  fontFamily: "var(--font-albert), sans-serif",
                  fontSize: "0.66rem", fontWeight: 700,
                  letterSpacing: "0.35em", textTransform: "uppercase",
                  cursor: "pointer", transition: "border-color 0.3s, color 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(229,193,88,0.38)"; e.currentTarget.style.color = "#E5C158"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "rgba(255,255,255,0.62)"; }}
              >
                <span className="relative flex items-center justify-center w-5 h-5">
                  <span className="absolute inset-0 rounded-full border border-current opacity-35 group-hover:scale-125 group-hover:opacity-0 transition-all duration-500" />
                  <Play className="w-2.5 h-2.5 fill-current" />
                </span>
                Watch Teaser
              </motion.button>
            </DialogTrigger>

            <DialogContent className="p-0 border-0 overflow-hidden" style={{
              background: "#07070A", borderRadius: 0,
              width: "90vw", maxWidth: "860px", aspectRatio: "16/9",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(229,193,88,0.2)",
            }}>
              <div className="flex flex-col items-center space-y-4 text-center p-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ border: "1px solid rgba(229,193,88,0.2)", background: "rgba(229,193,88,0.05)" }}>
                  <Play className="w-6 h-6 text-[#E5C158] opacity-60" />
                </div>
                <p style={{
                  fontFamily: "var(--font-albert), sans-serif",
                  fontSize: "0.9rem", color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700,
                }}>Teaser Coming Soon</p>
                <p style={{
                  fontFamily: "var(--font-albert), sans-serif",
                  color: "rgba(255,255,255,0.22)", fontSize: "0.82rem", letterSpacing: "0.04em",
                }}>
                  Check back closer to the event for the official trailer.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </motion.div>

      {["top-3 left-3 border-t border-l","top-3 right-3 border-t border-r","bottom-3 left-3 border-b border-l","bottom-3 right-3 border-b border-r"].map((cls, i) => (
        <div key={i} className={`absolute w-5 h-5 ${cls} pointer-events-none hidden md:block`}
          style={{ borderColor: "rgba(229,193,88,0.16)" }} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&display=swap');
      `}</style>
    </section>
  );
}