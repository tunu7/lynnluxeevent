/** Renders *wrapped* words in the accent italic, so editors can style headings. */
export default function Emphasis({ text }: { text: string }) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className="text-accent">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    ),
  );
}

/** Plain-text version for metadata and alt text. */
export const plain = (text: string) => text.replace(/\*([^*]+)\*/g, "$1");
