import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import Section from "../components/Section.jsx";

// PROMPT — sunumun kalbi.
// 3 parça:
//   A) İyi prompt formülü (5 kart)
//   B) Zayıf vs güçlü karşılaştırma
//   C) İnteraktif prompt builder — parçaları seç, canlı önizleme oluşsun
const parts = [
  {
    icon: "🎯",
    tag: "Konu",
    hint: "Ne? Kim? Ne yapıyor?",
    color: "#22d3ee",
    options: [
      "genç bir kadın astronot",
      "yaşlı bir çoban ve köpeği",
      "kırmızı yelekli bir kedi",
      "eski model bir spor araba",
    ],
  },
  {
    icon: "🎨",
    tag: "Stil",
    hint: "Hangi görsel dil?",
    color: "#a855f7",
    options: [
      "sinematik fotoğraf",
      "yağlı boya tablo",
      "Studio Ghibli tarzı",
      "80'ler neon poster",
    ],
  },
  {
    icon: "💡",
    tag: "Işık",
    hint: "Gün batımı? Neon?",
    color: "#fb923c",
    options: [
      "altın saat, yumuşak ışık",
      "neon ışıklar, gece yağmuru",
      "sabah sisi, dağlarda",
      "stüdyo aydınlatma",
    ],
  },
  {
    icon: "📐",
    tag: "Kompozisyon",
    hint: "Yakın plan? Geniş?",
    color: "#10b981",
    options: [
      "yakın portre",
      "geniş açı, sinematik",
      "kuşbakışı",
      "arkadan silüet",
    ],
  },
  {
    icon: "⚙️",
    tag: "Kalite",
    hint: "Detay & çözünürlük",
    color: "#ec4899",
    options: [
      "yüksek detay, 8k",
      "fotogerçekçi",
      "film grain, 35mm",
      "keskin odak",
    ],
  },
];

export default function SectionPrompt() {
  const [choices, setChoices] = useState({}); // tag -> option

  const preview = useMemo(() => {
    const ordered = parts.map((p) => choices[p.tag]).filter(Boolean);
    return ordered.length ? ordered.join(", ") : "";
  }, [choices]);

  const filled = Object.keys(choices).length;

  return (
    <Section
      id="prompt"
      kicker="6 · Prompt"
      title={
        <>
          İyi bir prompt <span className="text-gradient">nasıl olmalı?</span>
        </>
      }
      subtitle="Kısa cevap: sohbet gibi değil, tarif gibi yaz."
    >
      {/* A) Formül */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10 md:mb-14">
        {parts.map((p, i) => (
          <motion.div
            key={p.tag}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08 }}
            className="glass p-4 text-center"
          >
            <div className="text-3xl">{p.icon}</div>
            <div
              className="mt-2 font-display font-bold text-lg"
              style={{ color: p.color }}
            >
              {p.tag}
            </div>
            <div className="text-xs text-white/60 mt-1">{p.hint}</div>
          </motion.div>
        ))}
      </div>

      {/* B) Zayıf vs Güçlü */}
      <div className="grid md:grid-cols-2 gap-5 mb-10 md:mb-14">
        <ComparisonCard
          kind="bad"
          title="Zayıf Prompt"
          example="bir kedi çiz"
          notes={[
            "Konu belli ama detay yok",
            "Stil, ışık, kompozisyon eksik",
            "Sonuç: rastgele, sıkıcı",
          ]}
        />
        <ComparisonCard
          kind="good"
          title="Güçlü Prompt"
          example="kırmızı yelekli astronot bir kedi, sinematik fotoğraf, altın saat ışığı, yakın portre, yüksek detay, 8k"
          notes={[
            "Konu + stil + ışık + kompozisyon + kalite",
            "Modele net bir hedef verir",
            "Sonuç: net, karakterli, kullanışlı",
          ]}
        />
      </div>

      {/* C) İnteraktif builder */}
      <div className="glass-strong p-6 md:p-8 rounded-3xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="chip">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
            Kendin Dene
          </span>
          <span className="text-white/60 text-sm">
            {filled}/5 parça seçildi
          </span>
        </div>

        <div className="space-y-4">
          {parts.map((p) => (
            <div key={p.tag}>
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2">
                {p.icon} {p.tag}
              </div>
              <div className="flex flex-wrap gap-2">
                {p.options.map((o) => (
                  <button
                    key={o}
                    onClick={() =>
                      setChoices((s) => ({
                        ...s,
                        [p.tag]: s[p.tag] === o ? undefined : o,
                      }))
                    }
                    className={`px-3 py-1.5 rounded-full text-sm border transition ${
                      choices[p.tag] === o
                        ? "bg-white text-ink-900 border-white"
                        : "bg-white/5 border-white/10 text-white/75 hover:bg-white/10"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-black/50 border border-white/10 p-5">
          <div className="text-xs uppercase tracking-widest text-white/50 mb-2">
            Canlı Prompt
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={preview || "empty"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="font-mono text-white text-lg leading-relaxed min-h-[3.5rem]"
            >
              {preview ? (
                preview
              ) : (
                <span className="text-white/40">
                  Yukarıdaki kartlardan seçim yaparak promptunu oluştur…
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

function ComparisonCard({ kind, title, example, notes }) {
  const isGood = kind === "good";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className={`relative rounded-3xl overflow-hidden glass-strong p-6 ${
        isGood ? "ring-1 ring-emerald-400/40" : "ring-1 ring-rose-400/40"
      }`}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: isGood
            ? "radial-gradient(500px 200px at 50% 0%, rgba(52,211,153,0.4), transparent 70%)"
            : "radial-gradient(500px 200px at 50% 0%, rgba(251,113,133,0.4), transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${
              isGood
                ? "bg-emerald-400 text-emerald-950"
                : "bg-rose-400 text-rose-950"
            }`}
          >
            {isGood ? "İYİ" : "KÖTÜ"}
          </span>
          <h3 className="font-display font-bold text-xl">{title}</h3>
        </div>
        <div className="mt-4 rounded-2xl bg-black/50 border border-white/10 p-4 font-mono text-sm md:text-base leading-relaxed">
          {example}
        </div>
        <ul className="mt-4 space-y-1.5 text-white/75 text-sm">
          {notes.map((n) => (
            <li key={n} className="flex items-start gap-2">
              <span className={isGood ? "text-emerald-300" : "text-rose-300"}>
                {isGood ? "✓" : "✕"}
              </span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
