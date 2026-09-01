import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { LegalBlock, LegalPage } from "@/i18n/legal/types";
import { ConsentControls } from "@/components/CookieBanner";

const TOKEN = /\{\{([^|}]+)\|([^}]+)\}\}|\*\*([^*]+)\*\*/g;

function href(target: string, lang: string): { to?: string; url?: string } {
  if (target.startsWith("tel:")) return { url: target };
  if (target.startsWith("url:")) return { url: target.slice(4) };
  const map: Record<string, string> = {
    contacto: "contacto",
    cookies: "cookies",
    privacidad: "privacidad",
    aviso: "aviso-legal",
    accesibilidad: "accesibilidad",
  };
  return { to: `/${lang}/${map[target] ?? target}` };
}

/** Convierte la sintaxis en línea (**negrita** y {{destino|texto}}) en nodos React. */
export function renderInline(text: string, lang: string): ReactNode {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  let i = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[3]) {
      nodes.push(
        <strong key={i++} className="font-semibold text-primary">
          {match[3]}
        </strong>,
      );
    } else {
      const { to, url } = href(match[1], lang);
      nodes.push(
        to ? (
          <Link key={i++} to={to} className="text-primary underline">
            {match[2]}
          </Link>
        ) : (
          <a
            key={i++}
            href={url}
            className="text-primary underline"
            {...(url?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {match[2]}
          </a>
        ),
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.map((n, idx) => <Fragment key={idx}>{n}</Fragment>);
}

function Block({ block, lang }: { block: LegalBlock; lang: string }) {
  switch (block.t) {
    case "p":
      return <p className="leading-relaxed">{renderInline(block.text, lang)}</p>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-5 leading-relaxed">
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item, lang)}</li>
          ))}
        </ul>
      );
    case "dl":
      return (
        <dl className="space-y-2">
          {block.items.map((item, i) => (
            <div key={i} className="flex flex-col gap-1 sm:flex-row sm:gap-2">
              <dt className="font-semibold text-primary sm:min-w-40">{item.label}</dt>
              <dd>{renderInline(item.text, lang)}</dd>
            </div>
          ))}
        </dl>
      );
    case "note":
      return (
        <p className="rounded-md border border-border bg-muted/40 p-4 text-sm leading-relaxed">
          {renderInline(block.text, lang)}
        </p>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">{block.caption}</caption>
            <thead>
              <tr className="bg-muted">
                {block.head.map((h, i) => (
                  <th key={i} scope="col" className="border border-border p-3 font-semibold text-primary">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-border p-3 align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "consent":
      return <ConsentControls />;
    default:
      return null;
  }
}

export function LegalContent({ page, lang }: { page: LegalPage; lang: string }) {
  return (
    <div className="container-narrow max-w-3xl space-y-8 py-14 text-muted-foreground">
      {page.intro.map((text, i) => (
        <p key={i} className="leading-relaxed">
          {renderInline(text, lang)}
        </p>
      ))}
      {page.sections.map((section, i) => (
        <section key={i} className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-primary">{section.title}</h2>
          {section.blocks.map((block, j) => (
            <Block key={j} block={block} lang={lang} />
          ))}
        </section>
      ))}
    </div>
  );
}
