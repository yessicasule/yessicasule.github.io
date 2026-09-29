interface Props {
  href: string;
  preview: string;
  label: string;
}

/**
 * The certificate sits beside the thing it belongs to. The card is the link:
 * one click opens the PDF, rather than expanding a preview that then needs a
 * second click to reach the document.
 */
export function CertificateCard({ href, preview, label }: Props) {
  return (
    <figure className="cert">
      <a className="cert__link" href={href} target="_blank" rel="noreferrer">
        <img className="cert__thumb" src={preview} alt={label} loading="lazy" />
        <span className="cert__bar">
          <span className="cert__label">{label}</span>
          <span className="cert__open" aria-hidden="true">
            Open PDF ↗
          </span>
        </span>
      </a>
    </figure>
  );
}
