import Callout from "./Callout";

/* ------------------------------------------------------------------ */
/*  RichText — turn a raw XML-imported text body into a structured     */
/*  visual block: short paragraphs, bullet / numbered lists, inline    */
/*  "Важливо:" callouts. Same component for description, maintenance   */
/*  source-text, warranty, instructions, "other" sections.             */
/* ------------------------------------------------------------------ */

type Line = { text: string };
type Block =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "callout"; variant: "important" | "note" | "tip"; text: string };

const BULLET_RE = /^\s*([-•*·●▪▶▷+✓]|[—–])\s+/;
const NUM_RE = /^\s*(\d+)[.)]\s+/;
const CALLOUT_RE =
  /^\s*(важливо|зверніть\s+увагу|порада|увага|примітка)\s*[:!.\-]?\s*(.+)$/i;

function classifyCallout(token: string): "important" | "note" | "tip" {
  const t = token.toLowerCase();
  if (t.startsWith("порада")) return "tip";
  if (t.startsWith("важливо") || t.startsWith("увага")) return "important";
  return "note";
}

function isLikelyHeading(line: string): boolean {
  if (line.length > 80) return false;
  // ends with colon, question, or has no trailing punctuation and few words
  if (/[:?]$/.test(line)) return true;
  const wordCount = line.trim().split(/\s+/).length;
  return (
    wordCount <= 8 &&
    !/[.!]$/.test(line) &&
    /^[А-ЯҐЄІЇA-Z]/.test(line)
  );
}

function parse(text: string): Block[] {
  const raw: Line[] = text
    .split("\n")
    .map((l) => ({ text: l.trim() }))
    .filter((l) => l.text.length > 0);

  const out: Block[] = [];
  let listKind: "ul" | "ol" | null = null;
  let listItems: string[] = [];

  const flushList = () => {
    if (listKind && listItems.length > 0) {
      out.push({ kind: listKind, items: listItems });
    }
    listKind = null;
    listItems = [];
  };

  for (const line of raw) {
    const bulletMatch = BULLET_RE.exec(line.text);
    const numMatch = NUM_RE.exec(line.text);
    const calloutMatch = CALLOUT_RE.exec(line.text);

    if (bulletMatch) {
      if (listKind !== "ul") flushList();
      listKind = "ul";
      listItems.push(line.text.replace(BULLET_RE, "").trim());
      continue;
    }
    if (numMatch) {
      if (listKind !== "ol") flushList();
      listKind = "ol";
      listItems.push(line.text.replace(NUM_RE, "").trim());
      continue;
    }

    flushList();

    if (calloutMatch) {
      out.push({
        kind: "callout",
        variant: classifyCallout(calloutMatch[1]),
        text: calloutMatch[2],
      });
      continue;
    }

    if (isLikelyHeading(line.text) && out.length > 0) {
      // Treat as a subheading inside the section
      out.push({ kind: "h", text: line.text.replace(/[:]\s*$/, "") });
      continue;
    }

    out.push({ kind: "p", text: line.text });
  }
  flushList();
  return out;
}

/** Inline bold for **markdown-style** highlights. */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i}>{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

export default function RichText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  if (!text || !text.trim()) return null;
  const blocks = parse(text);
  return (
    <div className={`rich${className ? " " + className : ""}`}>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "h":
            return (
              <h4 className="rich__h" key={i}>
                {renderInline(b.text)}
              </h4>
            );
          case "p":
            return (
              <p className="rich__p" key={i}>
                {renderInline(b.text)}
              </p>
            );
          case "ul":
            return (
              <ul className="rich__ul" key={i}>
                {b.items.map((it, k) => (
                  <li key={k}>{renderInline(it)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol className="rich__ol" key={i}>
                {b.items.map((it, k) => (
                  <li key={k}>{renderInline(it)}</li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <Callout variant={b.variant} key={i}>
                {renderInline(b.text)}
              </Callout>
            );
        }
      })}
    </div>
  );
}
