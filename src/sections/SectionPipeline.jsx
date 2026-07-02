import { motion } from "framer-motion";
import Section from "../components/Section.jsx";

// 4 adımlı canlı akış: Prompt → Görsel → Video → İzle
// Yatay timeline; scroll ile sırayla belirir.
const steps = [
  {
    n: "01",
    icon: "✍️",
    title: "Prompt Yaz",
    desc: "Konu + stil + ışık + kompozisyon + kalite.",
  },
  {
    n: "02",
    icon: "🖼️",
    title: "Görsel Üret",
    desc: "Midjourney / Krea ile bir kaç saniyede.",
  },
  {
    n: "03",
    icon: "🎬",
    title: "Videoya Dönüştür",
    desc: "Görseli Kling / Runway / Veo'ya ver.",
  },
  {
    n: "04",
    icon: "👀",
    title: "Sonucu İzle",
    desc: "Beğenmediysen prompt'u güncelle, tekrarla.",
  },
];

export default function SectionPipeline() {
  return (
    <Section
      id="akis"
      kicker="7 · Canlı Akış"
      title={
        <>
          <span className="text-gradient">4 adımda</span> promptan videoya
        </>
      }
      subtitle="Salonda birlikte deneyeceğimiz sıra."
    >
      <div className="relative">
        {/* akış çizgisi */}
        <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="grid md:grid-cols-4 gap-5 md:gap-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12 }}
              className="relative"
            >
              {/* nokta */}
              <div className="hidden md:flex absolute top-14 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-grad-brand shadow-glow" />

              <div className="glass-strong p-5 rounded-3xl relative overflow-hidden mt-0 md:mt-24">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background:
                      "radial-gradient(200px 100px at 50% 0%, rgba(168,85,247,0.30), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{s.icon}</span>
                    <span className="font-display font-black text-3xl text-white/15">
                      {s.n}
                    </span>
                  </div>
                  <div className="mt-3 font-display font-bold text-xl">
                    {s.title}
                  </div>
                  <p className="mt-1 text-white/70 text-sm">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
