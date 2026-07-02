import { motion } from "framer-motion";
import Section from "../components/Section.jsx";
import DiffusionDemo from "../components/DiffusionDemo.jsx";

// "Nasıl çalışır?" — kısa: eğitim → prompt → gürültüden görsele.
// Sağ tarafta ARTIK çalışan bir interaktif demo var (DiffusionDemo):
// konsept seç, "Üret" de, gürültüden görsele oluşumu canlı izle.
export default function SectionDiffusion() {
  const steps = [
    { t: "Eğitim", d: "YZ, milyonlarca görsel üzerinde desen öğrenir." },
    { t: "Prompt", d: "Sen isteğini yazarsın: “kırmızı yelekli astronot kedi”." },
    { t: "Gürültü", d: "Model boş, gürültülü bir tuvalle başlar." },
    { t: "Adım adım", d: "Her adımda gürültüyü temizler, biçimi ortaya çıkarır." },
    { t: "Sonuç", d: "Bilinen hiçbir görsele ait olmayan yeni bir görsel." },
  ];

  return (
    <Section
      id="nasil"
      kicker="2 · Nasıl Çalışır?"
      title={
        <>
          YZ bir <span className="text-gradient">hiçlikten</span> başlar.
        </>
      }
      subtitle="Diffusion (yayınım) modeli: gürültüden görsele. Sağdaki demoyu sen çalıştır."
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Sol: adım listesi */}
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <motion.li
              key={s.t}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex items-start gap-4 p-4 rounded-2xl glass"
            >
              <div
                className="mt-0.5 shrink-0 w-9 h-9 rounded-xl bg-grad-brand
                           flex items-center justify-center font-display font-bold"
              >
                {i + 1}
              </div>
              <div>
                <div className="font-display font-semibold text-xl">{s.t}</div>
                <p className="text-white/70 text-sm mt-1">{s.d}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Sağ: interaktif diffusion demosu */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <DiffusionDemo />
        </motion.div>
      </div>
    </Section>
  );
}
