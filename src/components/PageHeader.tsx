import type { ReactNode } from "react";
import { ImageFrame } from "@/components/ImageFrame";

export function PageHeader({
  kicker,
  title,
  intro,
  children,
  imageLabel,
  imageAlt,
  imageSrc,
  imageDescribedBy,
  imageDescription,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  imageLabel?: string;
  imageAlt?: string;
  imageSrc?: string;
  imageDescribedBy?: string;
  imageDescription?: ReactNode;
}) {
  const hasImage = Boolean(imageLabel || imageAlt || imageSrc);
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div
          className={
            hasImage
              ? "grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:gap-12"
              : ""
          }
        >
          <div className="min-w-0">
            {kicker && (
              <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {kicker}
              </p>
            )}
            <h1 className="font-display text-4xl font-semibold tracking-tight text-primary md:text-5xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {intro}
              </p>
            )}
            {children}
          </div>
          {hasImage && (
            <div className="w-full">
              {imageSrc ? (
                <>
                  <img
                    src={imageSrc}
                    alt={imageAlt ?? imageLabel ?? "Imagen"}
                    aria-describedby={imageDescribedBy}
                    loading="eager"
                    {...({ fetchpriority: "high" } as Record<string, string>)}
                    decoding="async"
                    className="w-full h-auto rounded-2xl object-contain bg-secondary/30"
                  />

                  {imageDescription && imageDescribedBy && (
                    <div id={imageDescribedBy} className="sr-only">
                      {imageDescription}
                    </div>
                  )}
                </>
              ) : (
                <ImageFrame
                  aspect="4/3"
                  label={imageLabel ?? "Imagen"}
                  alt={imageAlt ?? imageLabel ?? "Imagen"}
                  rounded="rounded-2xl"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
