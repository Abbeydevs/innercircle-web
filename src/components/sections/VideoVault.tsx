"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}

interface VideoVaultProps {
  videos: VideoItem[];
}

export function VideoVault({ videos }: VideoVaultProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  if (!videos || videos.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#07070A",
        padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 4vw, 3rem)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(229,193,88,0.03) 0%, transparent 70%)",
      }} />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        width: "40%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(229,193,88,0.15), transparent)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ height: 1, width: 28, background: "linear-gradient(to right, transparent, #E5C158)" }} />
              <span style={{
                fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.4em", textTransform: "uppercase", color: "#E5C158",
              }}>
                The Vault
              </span>
            </div>
            <h2 style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700, letterSpacing: "-0.02em",
              color: "#FFFFFF", lineHeight: 1,
            }}>
              Relive the{" "}
              <span style={{ color: "rgba(255,255,255,0.28)", fontWeight: 300, fontStyle: "italic" }}>
                encounters.
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
              whiteSpace: "nowrap", paddingBottom: "0.25rem",
            }}
          >
            {String(videos.length).padStart(2, "0")} Videos
          </motion.span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <Dialog key={video.id}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: Math.min(index * 0.1, 0.4), ease: [0.16, 1, 0.3, 1] }}
                  className="group relative cursor-pointer overflow-hidden"
                  style={{ aspectRatio: "16/9", background: "rgba(255,255,255,0.04)" }}
                  onMouseEnter={() => setHovered(video.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover"
                    style={{
                      transform: hovered === video.id ? "scale(1.06)" : "scale(1)",
                      filter: hovered === video.id ? "brightness(0.45)" : "brightness(0.7)",
                      transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease",
                    }}
                  />

                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: "linear-gradient(to top, rgba(7,7,10,0.85) 0%, rgba(7,7,10,0.2) 50%, transparent 100%)",
                  }} />

                  <div className="absolute inset-0 pointer-events-none" style={{
                    opacity: hovered === video.id ? 1 : 0,
                    transition: "opacity 0.5s ease",
                    background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(229,193,88,0.1) 0%, transparent 70%)",
                  }} />

                  <div className="absolute inset-0 pointer-events-none" style={{
                    opacity: hovered === video.id ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    border: "1px solid rgba(229,193,88,0.3)",
                  }} />

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      style={{
                        width: 60, height: 60, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: hovered === video.id ? "#E5C158" : "rgba(0,0,0,0.35)",
                        border: hovered === video.id ? "1px solid #E5C158" : "1px solid rgba(255,255,255,0.2)",
                        backdropFilter: "blur(8px)",
                        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                        transform: hovered === video.id ? "scale(1.1)" : "scale(1)",
                        boxShadow: hovered === video.id ? "0 0 30px rgba(229,193,88,0.35)" : "none",
                      }}
                    >
                      <Play
                        className="w-5 h-5 ml-0.5"
                        style={{
                          color: hovered === video.id ? "#07070A" : "rgba(255,255,255,0.85)",
                          fill: "currentColor",
                          transition: "color 0.3s ease",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        width: 60, height: 60, borderRadius: "50%",
                        border: "1px solid rgba(229,193,88,0.4)",
                        transform: hovered === video.id ? "scale(1.6)" : "scale(1)",
                        opacity: hovered === video.id ? 0 : 0,
                        transition: "transform 0.6s ease, opacity 0.6s ease",
                      }}
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pointer-events-none">
                    <span style={{
                      fontSize: "0.55rem", fontWeight: 700,
                      letterSpacing: "0.4em", textTransform: "uppercase",
                      color: "rgba(229,193,88,0.5)",
                      display: "block", marginBottom: "0.3rem",
                    }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 style={{
                      fontSize: "0.78rem", fontWeight: 700,
                      letterSpacing: "0.15em", textTransform: "uppercase",
                      color: "#FFFFFF",
                      transform: hovered === video.id ? "translateY(-2px)" : "translateY(0)",
                      transition: "transform 0.4s ease",
                    }}>
                      {video.title}
                    </h3>
                  </div>

                  <div style={{
                    position: "absolute", top: 10, left: 10,
                    width: 14, height: 14,
                    borderTop: "1px solid rgba(229,193,88,0.55)",
                    borderLeft: "1px solid rgba(229,193,88,0.55)",
                    opacity: hovered === video.id ? 1 : 0,
                    transform: hovered === video.id ? "scale(1)" : "scale(0.5)",
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                  }} />
                  <div style={{
                    position: "absolute", bottom: 10, right: 10,
                    width: 14, height: 14,
                    borderBottom: "1px solid rgba(229,193,88,0.55)",
                    borderRight: "1px solid rgba(229,193,88,0.55)",
                    opacity: hovered === video.id ? 1 : 0,
                    transform: hovered === video.id ? "scale(1)" : "scale(0.5)",
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                  }} />
                </motion.div>
              </DialogTrigger>

              <DialogContent
                className="p-0 border-0 overflow-hidden"
                style={{
                  background: "#07070A",
                  borderRadius: 0,
                  width: "90vw", maxWidth: "900px",
                  aspectRatio: "16/9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(229,193,88,0.2)",
                }}
              >
                <VisuallyHidden>
                  <DialogTitle>{video.title}</DialogTitle>
                </VisuallyHidden>

                {video.videoUrl ? (
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "100%", border: "none" }}
                  />
                ) : (
                  <div className="flex flex-col items-center space-y-4 text-center p-8">
                    <div style={{
                      width: 64, height: 64, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "1px solid rgba(229,193,88,0.2)",
                      background: "rgba(229,193,88,0.05)",
                    }}>
                      <Play className="w-6 h-6 text-[#E5C158] opacity-60" style={{ fill: "currentColor" }} />
                    </div>
                    <p style={{
                      fontSize: "0.85rem", fontWeight: 700,
                      letterSpacing: "0.3em", textTransform: "uppercase",
                      color: "rgba(255,255,255,0.35)",
                    }}>
                      {video.title}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.78rem", letterSpacing: "0.04em" }}>
                      Video coming soon.
                    </p>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-16"
          style={{
            width: 1, height: 72,
            background: "linear-gradient(to bottom, rgba(229,193,88,0.4), transparent)",
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