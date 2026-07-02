import { motion } from "framer-motion";
import { useState } from "react";
import Section from "../components/Section.jsx";
import ToolCard3D from "../components/ToolCard3D.jsx";
import { LogoBadge } from "../components/ToolLogos.jsx";
import { visualTools, textTools } from "../data/tools.js";

// İki sekmeli araç bölümü:
// - Görsel/Video araçları (ana odak — büyük 3D tilt kartları)
// - Metin araçları (küçük şerit — sadece bahsedilir, prompt yazmaya yardım eder)
export default function SectionTools() {
  const [tab, setTab] = useState("visual");

  return (
    <Section
      id="araclar"
      kicker="5 · Araçlar"
      title={
        <>
          Bu süreci <span className="text-gradient">hangi araçlar</span> yapıyor?
        </>
      }
      subtitle="Odak: görsel & video üretimi. Metin YZ'leri prompt yazmakta yardımcıdır."
    >
      <div className="flex justify-center mb-8">
        <div className="glass p-1 inline-flex rounded-full">
          {[
            { k: "visual", l: "Görsel & Video" },
            { k: "text", l: "Metin (prompt yardımı)" },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                tab === t.k
                  ? "bg-white text-ink-900"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>
      </div>

      {tab === "visual" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visualTools.map((t, i) => (
            <ToolCard3D key={t.key} tool={t} index={i} />
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {textTools.map((t, i) => (
            <motion.div
              key={t.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06 }}
              className="glass p-5 flex items-center gap-4"
            >
              <LogoBadge tool={t} size={52} />
              <div>
                <div className="font-display font-semibold">{t.name}</div>
                <div className="text-xs text-white/60">{t.tagline}</div>
              </div>
            </motion.div>
          ))}
          <div className="sm:col-span-2 md:col-span-3 text-center text-white/60 text-sm mt-4">
            Bunlar görsel üretmez — ama <b className="text-white/80">iyi
            promptu birlikte yazabilirsin.</b>
          </div>
        </div>
      )}
    </Section>
  );
}
