import { motion } from "framer-motion";
import Section from "../components/Section.jsx";

const takeaways = [
  "YZ kopyalamaz, gürültüden görsel yaratır.",
  "İyi prompt = konu + stil + ışık + kompozisyon + kalite.",
  "Görsel üretilir, sonra videoya dönüştürülür.",
  "Ücretsiz araçlarla bugün deneyebilirsin.",
];

// Sunum sahibi iletişim kartları — animasyonlu, tıklanabilir.
const contact = [
  {
    key: "name",
    label: "Sunum Sahibi",
    value: "Baha Çelik",
    href: null,
    color: "#a855f7",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: "phone",
    label: "Telefon",
    value: "0537 795 02 14",
    href: "tel:+905377950214",
    color: "#22d3ee",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    value: "@bahaacelik1",
    href: "https://www.instagram.com/bahaacelik1?igsh=OWZwOHhmM3R6cHk1&utm_source=qr",
    color: "#ec4899",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "Ahmet Baha Çelik",
    href: "https://www.linkedin.com/in/ahmet-baha-çelik-50428839a?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    color: "#4285f4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function SectionClosing() {
  return (
    <Section
      id="kapanis"
      kicker="Kapanış"
      title={
        <>
          Aklında <span className="text-gradient">4 şey</span> kalsın.
        </>
      }
    >
      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {takeaways.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08 }}
            className="glass p-5 flex items-start gap-3"
          >
            <div className="mt-1 w-7 h-7 shrink-0 rounded-full bg-grad-brand flex items-center justify-center text-ink-950 font-bold text-sm">
              {i + 1}
            </div>
            <p className="text-white/85">{t}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-14 text-center"
      >
        <p className="font-display text-3xl md:text-4xl">
          Teşekkürler <span className="text-gradient">GENÇ 2030</span>.
        </p>
        <p className="mt-3 text-white/60">
          Sıradaki modül: <b className="text-white/90">YZ ile Ses & Müzik</b>{" "}
          — çok yakında.
        </p>
      </motion.div>

      {/* SUNUM SAHİBİ İLETİŞİM KARTLARI */}
      <div className="mt-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-6"
        >
          <span className="chip">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            İletişim
          </span>
          <p className="mt-3 text-white/60 text-sm">
            Soruların için veya sonraki modüller için bana ulaş.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {contact.map((c, i) => {
            const Wrapper = c.href ? motion.a : motion.div;
            const wrapperProps = c.href
              ? { href: c.href, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <Wrapper
                key={c.key}
                {...wrapperProps}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.55,
                  ease: [0.22, 0.9, 0.3, 1],
                }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="relative group glass-strong rounded-3xl p-5 overflow-hidden block"
              >
                {/* renkli parıltı */}
                <div
                  className="absolute inset-0 opacity-40 group-hover:opacity-90 transition-opacity"
                  style={{
                    background: `radial-gradient(200px 120px at 30% 0%, ${c.color}55, transparent 70%)`,
                  }}
                />
                {/* alt gradient çizgi */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${c.color}, transparent)`,
                  }}
                />
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${c.color}33, ${c.color}11)`,
                      color: c.color,
                      boxShadow: `inset 0 0 0 1px ${c.color}44`,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div className="mt-4 text-[11px] uppercase tracking-widest text-white/50">
                    {c.label}
                  </div>
                  <div className="mt-1 font-display font-semibold text-white text-lg leading-tight break-words">
                    {c.value}
                  </div>
                  {c.href && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-white/60 group-hover:text-white transition">
                      <span>Aç</span>
                      <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                        <path
                          d="M7 17L17 7M17 7H8M17 7v9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>

      <div className="mt-16 text-center text-white/40 text-xs">
        © Yapay Zeka ile Görsel Üretimi · Sunum sürümü
      </div>
    </Section>
  );
}
