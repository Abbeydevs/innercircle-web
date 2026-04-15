"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Twitter, Youtube, Music2 as Tiktok } from "lucide-react";

const socials = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/innercircle.ig/",
    label: "Instagram",
  },
  {
    icon: Tiktok,
    href: "https://www.tiktok.com/@innercircle.tk",
    label: "Tiktok",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/channel/UCqW5n6g6JwUjuuIAdgX-BgQ",
    label: "YouTube",
  },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#040406",
        borderTop: "1px solid rgba(229,193,88,0.08)",
        paddingTop: "clamp(5rem, 12vw, 10rem)",
        paddingBottom: "clamp(2rem, 5vw, 3.5rem)",
        paddingLeft: "clamp(1rem, 4vw, 3rem)",
        paddingRight: "clamp(1rem, 4vw, 3rem)",
      }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "40%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(229,193,88,0.2), transparent)",
        }}
      />

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "70%",
          height: "320px",
          background:
            "radial-gradient(ellipse at bottom, rgba(229,193,88,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {[
        { x: "22%", angle: -6, delay: 0.2 },
        { x: "50%", angle: 0, delay: 0.6 },
        { x: "78%", angle: 6, delay: 0.4 },
      ].map((beam, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 pointer-events-none"
          style={{ left: beam.x }}
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2.2,
            delay: beam.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: beam.delay,
            }}
            style={{
              width: 1,
              height: 0,
              borderLeft: "90px solid transparent",
              borderRight: "90px solid transparent",
              borderBottom: `520px solid rgba(229,193,88,0.07)`,
              transformOrigin: "bottom center",
              transform: `rotate(${beam.angle}deg)`,
              filter: "blur(2px)",
            }}
          />
        </motion.div>
      ))}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      {[
        "top-4 left-4 border-t border-l",
        "top-4 right-4 border-t border-r",
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-5 h-5 ${cls} pointer-events-none hidden md:block`}
          style={{ borderColor: "rgba(229,193,88,0.15)" }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full mb-12"
        >
          <h2
            className="select-none"
            style={{
              fontSize: "clamp(3rem, 11vw, 9rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.07)",
              textTransform: "uppercase",
            }}
          >
            The Room
            <br />
            Is Waiting
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-40 h-10 md:w-56 md:h-14">
              <Image
                src="/innercircle-logo.png"
                alt="Inner Circle"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
          style={{ gap: "clamp(1.4rem, 3vw, 2rem)" }}
        >
          <div className="flex items-center gap-3">
            <div
              style={{
                height: 1,
                width: 24,
                background: "linear-gradient(to right, transparent, #E5C158)",
              }}
            />
            <span
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#E5C158",
              }}
            >
              Inner Circle &nbsp;-&nbsp; May Edition · Date Announced Soon
            </span>
            <div
              style={{
                height: 1,
                width: 24,
                background: "linear-gradient(to left, transparent, #E5C158)",
              }}
            />
          </div>

          <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="https://innercircle-inky.vercel.app/"
              className="relative flex items-center justify-center overflow-hidden group"
              style={{
                height: "54px",
                padding: "0 3rem",
                background: "#E5C158",
                color: "#07070A",
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-flex",
              }}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
                }}
              />
              Join the Waitlist
            </Link>
          </motion.div>

          <div className="flex items-center gap-6">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={href}
                  aria-label={label}
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#E5C158")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.3)")
                  }
                >
                  <Icon className="w-5 h-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="origin-center mt-16 w-full"
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-full flex flex-col md:flex-row items-center justify-between gap-3 mt-8"
        >
          <p
            style={{
              fontSize: "0.58rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            © {new Date().getFullYear()} The Inner Circle. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "rgba(229,193,88,0.4)",
              }}
            />
            <p
              style={{
                fontSize: "0.58rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              Lagos, Nigeria
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
