import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Section from "../components/Section.jsx";

// İnsan mı YZ mi? testi — 4 kart, tıklayıp tahmin yapılır, sonuçta skor.
// Görseller /public/photos/ altında. Kullanıcı istediği zaman aynı dosya adlarını
// kendi fotoğrafıyla değiştirebilir (aynı isimle üstüne yaz, yeter).
const items = [
  {
    id: "sunset",
    src: "/photos/insan1.jpg",
    truth: "human",
    hint: "Sahilde gün batımı",
  },
  {
    id: "mountain",
    src: "/photos/ai-sample-1.png",
    truth: "ai",
    hint: "Dağlarda yürüyen adam",
  },
  {
    id: "sunflower",
    src: "/photos/insan2.jpg",
    truth: "human",
    hint: "Ayçiçekleri arasında",
  },
  {
    id: "car",
    src: "/photos/ai-sample-2.png",
    truth: "ai",
    hint: "Gece bir otomobil",
  },
];

export default function SectionHumanOrAI() {
  const [answers, setAnswers] = useState({}); // { id: "human"|"ai" }
  const [reveal, setReveal] = useState(false);

  const answered = Object.keys(answers).length;
  const score = items.reduce(
    (a, it) => (answers[it.id] === it.truth ? a + 1 : a),
    0
  );

  function pick(id, choice) {
    if (reveal) return;
    setAnswers((s) => ({ ...s, [id]: choice }));
  }

  return (
    <Section
      id="test"
      kicker="3 · İnteraktif"
      title={
        <>
          <span className="text-gradient">İnsan mı</span>, yapay zeka mı?
        </>
      }
      subtitle="Her görsele bir tahmin yap. Sonunda hep birlikte cevaplara bakalım."
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {items.map((it, i) => {
          const ans = answers[it.id];
          const isCorrect = reveal && ans === it.truth;
          const isWrong = reveal && ans && ans !== it.truth;

          return (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className={`relative rounded-2xl overflow-hidden glass-strong group ${
                isCorrect ? "ring-2 ring-emerald-400/70" : ""
              } ${isWrong ? "ring-2 ring-rose-400/70" : ""}`}
            >
              <div className="aspect-[3/4] relative bg-ink-800">
                <img
                  src={it.src}
                  alt=""
                  onError={(e) => {
                    // fallback: renkli placeholder + kısa açıklama
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.querySelector(
                      ".fallback"
                    ).style.display = "flex";
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="fallback absolute inset-0 hidden items-center justify-center text-center p-4"
                  style={{
                    background: it.fallback?.bg || "#1a1a3d",
                  }}
                >
                  <p className="text-xs md:text-sm text-white/85 leading-relaxed">
                    {it.fallback?.label || "Görsel yüklenemedi"}
                  </p>
                </div>

                {/* alt gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-xs text-white/80">
                  {it.hint}
                </div>

                {/* reveal badge */}
                <AnimatePresence>
                  {reveal && (
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-1 rounded-full ${
                        it.truth === "human"
                          ? "bg-emerald-400 text-emerald-950"
                          : "bg-rose-400 text-rose-950"
                      }`}
                    >
                      {it.truth === "human" ? "GERÇEK" : "YAPAY ZEKA"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* seçim butonları */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-black/30">
                {[
                  { k: "human", label: "İnsan" },
                  { k: "ai", label: "YZ" },
                ].map((b) => (
                  <button
                    key={b.k}
                    onClick={() => pick(it.id, b.k)}
                    className={`py-2 text-sm rounded-xl transition ${
                      ans === b.k
                        ? "bg-white text-ink-900 font-semibold"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Kontrol satırı */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white/70 text-sm">
          {answered}/{items.length} tahmin yapıldı
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setAnswers({});
              setReveal(false);
            }}
            className="btn-ghost"
          >
            Sıfırla
          </button>
          <button
            onClick={() => setReveal(true)}
            disabled={answered < items.length}
            className={`px-5 py-2 rounded-2xl text-sm font-semibold transition ${
              answered < items.length
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : "bg-grad-brand text-ink-950 hover:opacity-95"
            }`}
          >
            Cevapları Göster
          </button>
        </div>
      </div>

      <AnimatePresence>
        {reveal && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 glass p-6 text-center"
          >
            <div className="text-sm uppercase tracking-widest text-white/60">
              Skorun
            </div>
            <div className="mt-2 font-display font-bold text-5xl">
              <span className="text-gradient">{score}</span>
              <span className="text-white/50 text-3xl"> / {items.length}</span>
            </div>
            <p className="mt-3 text-white/70 max-w-xl mx-auto">
              YZ görselleri artık gerçek fotoğraflardan çoğu zaman ayırt
              edilemez. En büyük ipucu genelde eller, saç uçları ve arka
              plandaki mantıksız detaylar oluyor.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
