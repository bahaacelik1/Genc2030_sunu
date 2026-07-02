import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { visualTools, textTools } from "../data/tools.js";
import { LogoBadge } from "./ToolLogos.jsx";

// Hero arka planı: 3D perspective içinde yüzen AI logo bulutu.
// - Fare hareketiyle tüm bulut hafifçe döner
// - Her logonun kendi translateZ değeri var → gerçek derinlik hissi
// - Mobilde: daha az logo, ekrana sığacak pozisyon/ölçek, mouse yerine subtle otomatik dönüş
const cloud = [
  { tool: visualTools[0], x: -34, y: -18, z: 60,  size: 96,  delay: 0.0, mobile: true  }, // Midjourney
  { tool: visualTools[1], x:  32, y: -22, z: 90,  size: 110, delay: 0.6, mobile: true  }, // Sora
  { tool: visualTools[2], x: -18, y:  22, z: 40,  size: 76,  delay: 1.2, mobile: true  }, // Kling
  { tool: visualTools[3], x:  28, y:  18, z: 70,  size: 88,  delay: 1.8, mobile: true  }, // Krea
  { tool: visualTools[4], x: -42, y:   6, z: 20,  size: 68,  delay: 2.4, mobile: false }, // Hailuo
  { tool: visualTools[5], x:  42, y:  -2, z: 110, size: 120, delay: 3.0, mobile: false }, // Runway
  { tool: visualTools[6], x:   0, y: -32, z: 50,  size: 84,  delay: 3.6, mobile: true  }, // Veo 3
  { tool: textTools[0],   x: -28, y:  32, z: 30,  size: 60,  delay: 4.2, mobile: false }, // ChatGPT
  { tool: textTools[1],   x:  16, y:  30, z: 80,  size: 72,  delay: 4.8, mobile: true  }, // Claude
  { tool: textTools[2],   x:  46, y:  28, z: 40,  size: 62,  delay: 5.4, mobile: false }, // Gemini
  { tool: textTools[3],   x: -46, y: -30, z: 60,  size: 66,  delay: 6.0, mobile: false }, // DeepSeek
  { tool: textTools[4],   x:   0, y:  10, z: 100, size: 78,  delay: 6.6, mobile: true  }, // Grok
];

export default function LogoCloud3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-1, 1], [-14, 14]), {
    stiffness: 60,
    damping: 20,
  });
  const rotX = useSpring(useTransform(my, [-1, 1], [10, -10]), {
    stiffness: 60,
    damping: 20,
  });

  useEffect(() => {
    if (isMobile) return; // mobilde mouse takibi yok
    function onMove(e) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(x);
      my.set(y);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, isMobile]);

  // Mobilde bulutu daha kompakt: pozisyonları küçült, boyutları düşür.
  const items = isMobile
    ? cloud
        .filter((c) => c.mobile)
        .map((c) => ({
          ...c,
          x: c.x * 0.5, // pozisyonları %50 içeri al → yatay taşma yok
          y: c.y * 0.55,
          size: Math.round(c.size * 0.55), // daha küçük
        }))
    : cloud;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: 1400 }}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="absolute inset-0"
      >
        {items.map((c, i) => (
          <motion.div
            key={c.tool.key + i}
            className="absolute left-1/2 top-1/2"
            style={{
              translateX: `calc(-50% + ${c.x}vw)`,
              translateY: `calc(-50% + ${c.y}vh)`,
              translateZ: c.z,
              transformStyle: "preserve-3d",
              filter: `blur(${c.z < 40 ? 0.5 : 0}px)`,
              opacity: 0.5 + Math.min(0.5, c.z / 200),
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 0.55 + Math.min(0.45, c.z / 200),
              scale: 1,
              y: [0, -18, 0, 14, 0],
              rotate: [0, 3, 0, -3, 0],
            }}
            transition={{
              opacity: { duration: 1.4, delay: c.delay * 0.15 },
              scale: { duration: 1.4, delay: c.delay * 0.15 },
              y: { duration: 8 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 10 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <LogoBadge tool={c.tool} size={c.size} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
