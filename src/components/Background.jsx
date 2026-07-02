import { motion, useScroll, useTransform } from "framer-motion";

// Sayfa arka planı: yavaşça yer değiştiren dev renkli blob'lar + dotted grid.
// Scroll ilerledikçe blob'lar hafifçe kayarak parallax etkisi verir.
export default function Background() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-40 -left-40 w-[46vw] h-[46vw] rounded-full blur-3xl opacity-60"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_30%_30%,#a855f7_0%,transparent_60%)]" />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 -right-40 w-[52vw] h-[52vw] rounded-full blur-3xl opacity-50"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_60%_40%,#22d3ee_0%,transparent_60%)]" />
      </motion.div>
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-0 left-1/4 w-[46vw] h-[46vw] rounded-full blur-3xl opacity-40"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_50%_50%,#fb923c_0%,transparent_60%)]" />
      </motion.div>
      {/* dotted overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* alt vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(1400px_800px_at_50%_50%,transparent_0%,rgba(7,7,13,0.85)_80%)]" />
    </div>
  );
}
