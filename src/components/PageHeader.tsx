import type { ReactNode } from "react";

export function PageHeader({
  kicker,
  title,
  intro,
  children,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        {kicker && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {kicker}
          </p>
        )}
        <h1 className="font-display text-4xl font-bold tracking-tight text-primary md:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
