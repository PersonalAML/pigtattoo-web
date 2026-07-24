import type { CSSProperties } from "react";

/**
 * ImageFrame — placeholder para imágenes pendientes de aportar por el consorcio.
 *
 * Cuando `src` está definido renderiza <img>. Cuando no, dibuja un marco con
 * proporción `aspect` y una etiqueta discreta ("Imagen pendiente" por defecto)
 * usando los tokens del sistema (Cerceta + borde punteado sobre Gris Piedra).
 */
export type ImageFrameProps = {
  src?: string;
  alt?: string;
  label?: string;
  /** ratio tipo "16/9", "4/3", "1/1", "3/2"... */
  aspect?: string;
  className?: string;
  rounded?: string;
};

export function ImageFrame({
  src,
  alt = "",
  label = "Imagen pendiente",
  aspect = "16/9",
  className = "",
  rounded = "rounded-xl",
}: ImageFrameProps) {
  const style: CSSProperties = { aspectRatio: aspect };
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={style}
        className={`w-full object-cover ${rounded} ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt || label}
      style={style}
      className={`relative flex w-full items-center justify-center overflow-hidden border-2 border-dashed border-accent/40 bg-gradient-to-br from-secondary to-[var(--color-salmon)]/25 ${rounded} ${className}`}
    >
      {/* Retícula sutil como guiño a la matriz de puntos del logo */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-accent) 1px, transparent 0)",
          backgroundSize: "14px 14px",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2 px-3 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="h-7 w-7 text-accent"
          aria-hidden
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="M21 16l-5-5-8 8" />
        </svg>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  );
}

/** Marco cuadrado para logotipos (partners, financiadores). */
export function LogoFrame({
  src,
  alt = "",
  label = "Logo pendiente",
  className = "",
}: Omit<ImageFrameProps, "aspect">) {
  return (
    <ImageFrame
      src={src}
      alt={alt}
      label={label}
      aspect="1/1"
      rounded="rounded-lg"
      className={className}
    />
  );
}
