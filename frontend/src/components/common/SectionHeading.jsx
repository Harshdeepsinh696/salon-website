export default function SectionHeading({ eyebrow, title, subtitle, align = "center", theme = "light" }) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const isDark = theme === "dark";

  return (
    <div className={`max-w-xl mb-12 ${alignment}`}>
      {eyebrow && (
        <p className="hairline text-xs tracking-[0.2em] uppercase mb-3">{eyebrow}</p>
      )}
      <h2 className={`text-3xl md:text-4xl mb-3 ${isDark ? "text-cream" : "text-wine-700"}`}>{title}</h2>
      {subtitle && (
        <p className={`leading-relaxed ${isDark ? "text-cream/70" : "text-ink/60"}`}>{subtitle}</p>
      )}
    </div>
  );
}
