export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = variant === "primary" ? "btn-primary" : "btn-outline";
  return (
    <button className={`${base} ${className} disabled:opacity-50 disabled:cursor-not-allowed`} {...props}>
      {children}
    </button>
  );
}
