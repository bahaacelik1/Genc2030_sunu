import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// İNTERAKTİF DIFFUSION DEMOSU — sadece bir görsel değil, çalışan bir mini uygulama.
// - Bir konsept (prompt) seç
// - "Üret" → gürültüden görsele adım adım (24 adım) canlanır
// - Slider ile adımları elle ileri/geri sürükleyebilirsin
// - "Yeniden Üret" her seferinde farklı bir sonuç verir (aynı promptdan yeni görsel)
// Not: Bu bir kavram simülasyonudur — gerçek model değil, ama diffusion'un
// "gürültüden netliğe" mantığını salonda canlı gösterir.

const TOTAL = 24;

// Her konsept, hedef "görselin" renk kompozisyonunu belirler (sözde-render).
const concepts = [
  {
    id: "cat",
    label: "🐱 astronot kedi",
    layers: [
      "radial-gradient(60% 55% at 50% 42%, #f8fafc 0%, #cbd5e1 30%, transparent 62%)", // kask
      "radial-gradient(30% 26% at 50% 40%, #0ea5e9 0%, transparent 70%)", // vizör
      "radial-gradient(80% 60% at 50% 88%, #ef4444 0%, transparent 60%)", // yelek
      "linear-gradient(180deg, #0b1220, #1e1b4b)", // uzay
    ],
  },
  {
    id: "city",
    label: "🌆 neon şehir",
    layers: [
      "radial-gradient(50% 40% at 30% 30%, #ec4899 0%, transparent 60%)",
      "radial-gradient(50% 40% at 70% 35%, #22d3ee 0%, transparent 60%)",
      "linear-gradient(180deg, #0b1220 0%, #4c1d95 60%, #831843 100%)",
    ],
  },
  {
    id: "forest",
    label: "🌲 sisli orman",
    layers: [
      "radial-gradient(70% 50% at 50% 30%, #a7f3d0 0%, transparent 60%)",
      "radial-gradient(90% 60% at 50% 90%, #064e3b 0%, transparent 60%)",
      "linear-gradient(180deg, #0b1a14 0%, #065f46 100%)",
    ],
  },
];

export default function DiffusionDemo() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [concept, setConcept] = useState(concepts[0]);
  const [seed, setSeed] = useState(0.42); // sonuçta ufak varyasyon
  const rafRef = useRef(null);

  // "Üret" — 0'dan TOTAL'a yumuşak animasyon
  useEffect(() => {
    if (!playing) return;
    let startT = null;
    const dur = 2800;
    function tick(t) {
      if (startT === null) startT = t;
      const p = Math.min(1, (t - startT) / dur);
      // ease-out: başta hızlı gürültü kırılır, sonda incelir
      const eased = 1 - Math.pow(1 - p, 2);
      setStep(Math.round(eased * TOTAL));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setPlaying(false);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const progress = step / TOTAL; // 0..1
  const blur = (1 - progress) * 34 + 0.2; // px
  const noiseOpacity = Math.pow(1 - progress, 1.25);
  const brightness = 0.6 + progress * 0.55;
  const saturate = 0.4 + progress * 1.1;

  function generate() {
    setSeed(Math.random());
    setStep(0);
    setPlaying(true);
  }

  return (
    <div className="glass-strong rounded-3xl p-4 md:p-5">
      {/* Konsept seçimi */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-[11px] uppercase tracking-widest text-white/50 mr-1">
          Prompt:
        </span>
        {concepts.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setConcept(c);
              setStep(0);
              setPlaying(false);
            }}
            className={`px-3 py-1.5 rounded-full text-sm border transition ${
              concept.id === c.id
                ? "bg-white text-ink-900 border-white"
                : "bg-white/5 border-white/10 text-white/75 hover:bg-white/10"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Görüntü alanı */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-ink-950">
        {/* hedef "görsel" — konsepte göre renk kompozisyonu */}
        <div
          className="absolute inset-0 transition-[filter] duration-150"
          style={{
            // CSS'te ilk gradient en üstte: konu katmanları önce, opak arka plan sonda.
            background: concept.layers.join(","),
            filter: `blur(${blur}px) brightness(${brightness}) saturate(${saturate})`,
            transform: `scale(${1.06 - progress * 0.06})`,
          }}
        />

        {/* gürültü katmanı */}
        <div
          className="absolute inset-0 mix-blend-screen pointer-events-none"
          style={{ opacity: noiseOpacity }}
        >
          <NoiseSvg seed={seed} />
        </div>

        {/* tarama çizgisi — üretim anında aşağı iner */}
        {playing && (
          <motion.div
            key={seed}
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 2.8, ease: "linear" }}
            className="absolute left-0 right-0 h-16 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(34,211,238,0.35), transparent)",
            }}
          />
        )}

        {/* adım rozeti */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="chip">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                playing ? "bg-neon-cyan animate-pulse" : "bg-white/40"
              }`}
            />
            Adım {step}/{TOTAL}
          </span>
        </div>

        {/* tamamlandı rozeti */}
        {step === TOTAL && !playing && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-400 text-emerald-950"
          >
            HAZIR ✓
          </motion.div>
        )}
      </div>

      {/* Slider — elle kontrol */}
      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={TOTAL}
          value={step}
          onChange={(e) => {
            setPlaying(false);
            setStep(Number(e.target.value));
          }}
          className="w-full accent-neon-cyan cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-white/45 mt-1">
          <span>Saf gürültü</span>
          <span>Net görsel</span>
        </div>
      </div>

      {/* Butonlar */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={generate}
          className="flex-1 py-2.5 rounded-2xl text-sm font-semibold bg-grad-brand text-ink-950 hover:opacity-95 transition"
        >
          {playing ? "Üretiliyor…" : step === TOTAL ? "🔁 Yeniden Üret" : "▶ Üret"}
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setStep(0);
          }}
          className="btn-ghost"
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
}

// Sabit dokulu SVG gürültü — seed değişince desen değişir (yeni "başlangıç").
function NoiseSvg({ seed = 0 }) {
  const freq = 0.75 + (seed % 0.3);
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <filter id={`noise-${Math.round(seed * 1000)}`}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency={freq}
          numOctaves="2"
          seed={Math.round(seed * 100)}
        />
        <feColorMatrix
          values="0 0 0 0 1
                  0 0 0 0 1
                  0 0 0 0 1
                  0 0 0 0.75 0"
        />
      </filter>
      <rect
        width="100%"
        height="100%"
        filter={`url(#noise-${Math.round(seed * 1000)})`}
      />
    </svg>
  );
}
