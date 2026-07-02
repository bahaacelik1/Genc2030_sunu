import { motion } from "framer-motion";

// Her bölüm için ortak kabuk.
// Mobil: daha az dikey padding, küçük başlık; masaüstü: geniş.
export default function Section({
  id,
  kicker,
  title,
  subtitle,
  children,
  contain = true,
}) {
  return (
    <section
      id={id}
      className="relative w-full py-16 md:py-28 flex items-center min-h-screen"
    >
      <div
        className={
          contain
            ? "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10"
            : "w-full"
        }
      >
        {(kicker || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 0.9, 0.3, 1] }}
            className="mb-8 md:mb-12 text-center"
          >
            {kicker && (
              <span className="chip mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                {kicker}
              </span>
            )}
            {title && (
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl leading-tight tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-white/70 text-base md:text-xl max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
