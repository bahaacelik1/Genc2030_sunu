// Her aracın küçük bir SVG monogramı. Kart içinde ~64px, hero cloud'da ~96-140px.
export function LogoBadge({ tool, size = 80 }) {
  const s = size;
  return (
    <div
      className="relative flex items-center justify-center rounded-2xl"
      style={{
        width: s,
        height: s,
        background: `linear-gradient(135deg, ${tool.color1} 0%, ${tool.color2} 100%)`,
        boxShadow: `0 12px 32px -12px ${tool.color1}88, inset 0 1px 0 rgba(255,255,255,0.15)`,
      }}
    >
      <span
        className="font-display font-bold tracking-tight text-white"
        style={{
          fontSize: s * 0.34,
          textShadow: "0 2px 8px rgba(0,0,0,0.35)",
        }}
      >
        {tool.monogram}
      </span>
      {/* iç parıltı */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(120% 60% at 30% 0%, rgba(255,255,255,0.28), transparent 60%)",
        }}
      />
    </div>
  );
}
