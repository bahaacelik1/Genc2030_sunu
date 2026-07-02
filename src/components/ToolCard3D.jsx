import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LogoBadge } from "./ToolLogos.jsx";

// GERÇEK 3D tilt kartı.
// - perspective + rotateX/rotateY: fare pozisyonuna göre canlı dönüş
// - translateZ ile logo öne çıkar (parallax katman etkisi)
// - hafif yüzen animasyon (floaty) + hover glow
export default function ToolCard3D({ tool, index = 0 }) {
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springCfg = { stiffness: 150, damping: 15, mass: 0.5 };
  const sRotX = useSpring(rotX, springCfg);
  const sRotY = useSpring(rotY, springCfg);

  // logo & metin katmanları için translateZ (öne çıkma) hesabı
  const badgeZ = useTransform(sRotX, [-15, 0, 15], [60, 30, 60]);
  const textZ = useTransform(sRotY, [-15, 0, 15], [40, 20, 40]);

  function handleMove(e) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotY.set(x * 22); // yatay eksende dönüş
    rotX.set(-y * 22); // dikey eksende dönüş
  }
  function handleLeave() {
    rotX.set(0);
    rotY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 0.9, 0.3, 1],
      }}
      style={{ perspective: 1200 }}
      className="group"
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX: sRotX,
          rotateY: sRotY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-3xl p-6 h-56 flex flex-col justify-between
                   glass-strong overflow-hidden cursor-pointer"
      >
        {/* renkli parıltı arka planı */}
        <div
          className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity"
          style={{
            background: `radial-gradient(120% 80% at 20% 0%, ${tool.color1}55, transparent 60%)`,
          }}
        />
        {/* dinamik ışık noktası (fareyi takip eder) */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: `radial-gradient(300px 200px at var(--mx,50%) var(--my,50%), ${tool.color1}55, transparent 60%)`,
          }}
        />

        <motion.div
          style={{ translateZ: badgeZ, transformStyle: "preserve-3d" }}
          className="relative flex items-center justify-between"
        >
          <LogoBadge tool={tool} size={64} />
          <span
            className={`text-[11px] font-medium px-2 py-1 rounded-full border ${
              tool.paid
                ? "bg-neon-pink/15 border-neon-pink/40 text-neon-pink"
                : "bg-emerald-400/15 border-emerald-400/40 text-emerald-300"
            }`}
          >
            {tool.paid ? "Ücretli" : "Ücretsiz*"}
          </span>
        </motion.div>

        <motion.div
          style={{ translateZ: textZ, transformStyle: "preserve-3d" }}
          className="relative"
        >
          <h3 className="font-display font-bold text-2xl text-white leading-tight">
            {tool.name}
          </h3>
          <p className="text-sm text-white/70 mt-1">{tool.tagline}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
