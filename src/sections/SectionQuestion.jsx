import { motion } from "framer-motion";
import { useState } from "react";
import Section from "../components/Section.jsx";

// Açılış sorusu — "YZ interneti tarayıp fotoğraf mı kopyalıyor?"
// İki büyük kart, seçim yapılınca hemen kısa geri bildirim ve doğru cevap ipucu.
export default function SectionQuestion() {
  const [pick, setPick] = useState(null); // "yes" | "no" | null

  return (
    <Section
      id="soru"
      kicker="1 · Açılış"
      title={
        <>
          Yapay zeka bir resim çizerken{" "}
          <span className="text-gradient">interneti tarayıp</span>{" "}
          <br className="hidden md:block" />
          fotoğraf mı{" "}
          <span className="text-gradient">kopyalıyor?</span>
        </>
      }
      subtitle="Önce bir tahmin yap. Cevabı birlikte keşfedeceğiz."
    >
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {[
          { key: "yes", label: "Evet", hint: "Kopya çekiyor sanıyorum." },
          { key: "no", label: "Hayır", hint: "Sıfırdan yaratıyor sanıyorum." },
        ].map((opt) => (
          <motion.button
            key={opt.key}
            onClick={() => setPick(opt.key)}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className={`glass-strong text-left p-8 rounded-3xl relative overflow-hidden group
                        ${pick === opt.key ? "ring-2 ring-neon-cyan/60 shadow-glowLg" : ""}`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                            bg-[radial-gradient(400px_200px_at_50%_0%,rgba(34,211,238,0.20),transparent_70%)]" />
            <div className="relative">
              <span className="chip">Seçenek</span>
              <div className="mt-5 font-display font-bold text-5xl md:text-6xl">
                {opt.label}
              </div>
              <p className="mt-4 text-white/70">{opt.hint}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {pick && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 max-w-3xl mx-auto glass p-6 md:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-grad-brand flex items-center justify-center font-bold">
              ✨
            </div>
            <div>
              <p className="text-white/85 leading-relaxed">
                <b className="text-neon-cyan">Kısa cevap:</b> Hayır — kopyalamıyor.
                YZ, milyonlarca görsel üzerinde eğitilmiş bir <b>desen tanıma
                sistemi</b>. Yeni bir görsel üretirken sıfırdan başlıyor,{" "}
                <b>gürültüden</b> bir görsele doğru adım adım ilerliyor.
              </p>
              <a
                href="#nasil"
                className="mt-4 inline-flex items-center gap-2 text-neon-cyan hover:text-white"
              >
                Aşağıda anlatalım →
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </Section>
  );
}
