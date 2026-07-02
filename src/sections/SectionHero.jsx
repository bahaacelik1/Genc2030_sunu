import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LogoCloud3D from "../components/LogoCloud3D.jsx";

// Kapak — büyük başlık + arka planda 3D logo bulutu + aşağı-scroll göstergesi.
export default function SectionHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center py-24 md:py-0"
      style={{ minHeight: "100dvh" }}
    >
      <LogoCloud3D />
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="chip mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
          GENÇ 2030 · Modül 01
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight"
        >
          <span className="block">Yapay Zeka ile</span>
          <span className="block text-gradient">Görsel Üretimi</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-4 md:mt-6 text-white/75 text-base sm:text-lg md:text-2xl max-w-2xl mx-auto"
        >
          Piksellerden gerçekçi videolara — <br className="hidden md:block" />
          bir prompt yolculuğu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 md:mt-14 flex items-center justify-center gap-3"
        >
          <a href="#soru" className="btn-ghost">
            <span>Başlayalım</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll ipucu — aşağı bakan zıplayan ok */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 text-xs tracking-widest"
      >
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
