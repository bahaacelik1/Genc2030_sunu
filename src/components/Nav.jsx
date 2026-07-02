import { motion } from "framer-motion";

const links = [
  { href: "#soru", label: "Açılış" },
  { href: "#nasil", label: "Nasıl Çalışır?" },
  { href: "#test", label: "İnsan mı YZ mi?" },
  { href: "#araclar", label: "Araçlar" },
  { href: "#prompt", label: "Prompt" },
  { href: "#akis", label: "Canlı Akış" },
];

// Sticky üst menü — cam efektli, marka gradienti alt çizgili.
export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="fixed top-1 left-0 right-0 z-40 flex justify-center pointer-events-none px-3"
    >
      <div className="pointer-events-auto mt-3 flex items-center gap-1 px-3 py-2 rounded-full glass-strong shadow-glow max-w-full overflow-x-auto">
        <div className="pl-2 pr-3 flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-grad-brand" />
          <span className="font-display font-semibold tracking-wider text-white/85">
            YZ · GÖRSEL
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/10 transition"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
