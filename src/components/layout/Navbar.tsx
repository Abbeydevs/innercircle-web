"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500"
      style={{
        height: 64,
        background: scrolled ? "rgba(7, 7, 10, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(229, 193, 88, 0.1)" : "1px solid transparent",
      }}
    >
      <Link href="/" className="relative h-8 w-32 md:h-9 md:w-36 flex-shrink-0">
        <Image
          src="/innercircle-logo.png"
          alt="Inner Circle"
          fill
          className="object-contain object-left"
          priority
        />
      </Link>

      <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.97 }}>
        <Link
          href="https://innercircle-inky.vercel.app/"
          className="relative overflow-hidden group flex items-center justify-center"
          style={{
            height: "38px",
            padding: "0 1.4rem",
            background: "#E5C158",
            color: "#07070A",
            fontSize: "0.62rem",
            fontWeight: 800,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-flex",
            flexShrink: 0,
          }}
        >
          <span
            className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)" }}
          />
          Join Waitlist
        </Link>
      </motion.div>
    </motion.nav>
  );
}