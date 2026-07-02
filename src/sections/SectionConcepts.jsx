import { motion } from "framer-motion";
import { useState } from "react";
import Section from "../components/Section.jsx";

// 3 anahtar terim — tıklandığında hafif accordion açılır.
const concepts = [
  {
    icon: "📚",
    title: "Eğitim Verisi",
    short: "YZ'nin öğrendiği milyonlarca örnek görsel.",
    long: "Model, internetteki ve lisanslı veri setlerindeki milyonlarca görsel + açıklama çifti üzerinde eğitilir. Böylece 'kedi' nedir, 'gün batımı' nasıldır — bunları öğrenir.",
  },
  {
    icon: "🌫️",
    title: "Diffusion",
    short: "Gürültüden görsele adım adım geçiş.",
    long: "Model, sonucu tek adımda üretmez. Rastgele gürültüyle başlar, promptun rehberliğinde her adımda gürültüyü biraz daha 'temizler' — sonunda tanınabilir bir görsel çıkar.",
  },
  {
    icon: "✨",
    title: "Prompt",
    short: "Model'e ne istediğini anlatan komut.",
    long: "Prompt = kısa açıklama + stil + kompozisyon + ışık + kalite ipuçları. Ne kadar net yazarsan sonuç o kadar isabetli olur. Bunu birazdan ayrı bir bölümde derinleştireceğiz.",
  },
];

export default function SectionConcepts() {
  const [open, setOpen] = useState(null);

  return (
    <Section
      id="kavramlar"
      kicker="4 · Kavramlar"
      title={
        <>
          3 anahtar <span className="text-gradient">kavram</span>
        </>
      }
      subtitle="Bunları anladın mı, gerisi kolay."
    >
      <div className="grid md:grid-cols-3 gap-5">
        {concepts.map((c, i) => (
          <motion.button
            key={c.title}
            onClick={() => setOpen(open === i ? null : i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className={`text-left glass-strong p-6 rounded-3xl relative overflow-hidden group
                        ${open === i ? "ring-2 ring-neon-cyan/60" : ""}`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                            bg-[radial-gradient(400px_200px_at_30%_0%,rgba(168,85,247,0.20),transparent_70%)]" />
            <div className="relative">
              <div className="text-4xl">{c.icon}</div>
              <div className="mt-3 font-display font-bold text-2xl">
                {c.title}
              </div>
              <p className="mt-2 text-white/70">{c.short}</p>
              <motion.div
                initial={false}
                animate={{
                  height: open === i ? "auto" : 0,
                  opacity: open === i ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <p className="mt-4 pt-4 border-t border-white/10 text-sm text-white/75 leading-relaxed">
                  {c.long}
                </p>
              </motion.div>
            </div>
          </motion.button>
        ))}
      </div>
    </Section>
  );
}
