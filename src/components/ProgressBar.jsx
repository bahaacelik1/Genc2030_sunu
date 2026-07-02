import { motion, useScroll, useSpring } from "framer-motion";

// Sayfanın üstünde ince, akıcı bir scroll ilerleme çubuğu.
export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.4,
  });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-1 z-50 bg-grad-brand"
    />
  );
}
