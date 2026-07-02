import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Section from "../components/Section.jsx";
import { asset } from "../utils/asset.js";

// "Ve Sonuç" — yazdığımız promptun video sonucu.
// Varsayılan olarak /public/video/demo.mp4 oynatılır (önceden hazırlanmış YZ videosu).
// Sunum sırasında videoyu CANLI değiştirmenin iki yolu:
//   1) public/video/demo.mp4 dosyasını başka bir videoyla değiştir (kalıcı)
//   2) Aşağıdaki "Video Yükle" / sürükle-bırak ile anında değiştir (geçici)
const DEFAULT_SRC = asset("video/demo.mp4");

export default function SectionVideo() {
  const [src, setSrc] = useState(DEFAULT_SRC);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const videoRef = useRef(null);

  // Yerel bir video dosyasını (mp4/webm) anında oynatmaya al.
  function loadFile(file) {
    if (!file || !file.type.startsWith("video/")) return;
    const url = URL.createObjectURL(file);
    setSrc(url);
    // yeni kaynağı yükleyip oynat
    requestAnimationFrame(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }
    });
  }

  return (
    <Section
      id="video"
      kicker="8 · Sonuç"
      title={
        <>
          Ve <span className="text-gradient">sonuç</span>.
        </>
      }
      subtitle="Az önce konuştuğumuz promptun videosu — istersen kendi videonu bırak."
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          loadFile(e.dataTransfer.files?.[0]);
        }}
        className={`relative mx-auto max-w-5xl aspect-video rounded-3xl overflow-hidden
                    glass-strong shadow-glowLg transition ${
                      dragOver ? "ring-2 ring-neon-cyan/80" : ""
                    }`}
      >
        <video
          ref={videoRef}
          key={src}
          className="absolute inset-0 w-full h-full object-cover bg-black"
          controls
          loop
          playsInline
          preload="metadata"
          poster={asset("photos/ai-sample-1.png")}
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* sürükle-bırak ipucu (üzerine dosya sürüklenince belirir) */}
        {dragOver && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-ink-950/70 backdrop-blur-sm pointer-events-none">
            <p className="text-xl font-display font-semibold text-neon-cyan">
              Videoyu buraya bırak ↓
            </p>
          </div>
        )}
      </motion.div>

      {/* Kontroller */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button onClick={() => inputRef.current?.click()} className="btn-ghost">
          🎬 Video Yükle
        </button>
        {src !== DEFAULT_SRC && (
          <button
            onClick={() => setSrc(DEFAULT_SRC)}
            className="btn-ghost"
          >
            ↺ Varsayılana Dön
          </button>
        )}
        <span className="text-white/45 text-sm">
          …veya videoyu doğrudan oynatıcının üzerine sürükle
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => loadFile(e.target.files?.[0])}
        />
      </div>
    </Section>
  );
}
