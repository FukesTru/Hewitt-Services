type Props = { data: object | object[] };

/** Emits schema.org JSON-LD. Arrays are written as a @graph-style list. */
export function JsonLd({ data }: Props) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify output is escaped for the one character that can
          // break out of a <script> block.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(node).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
