export default function Sponsor({ settings }) {
  if (!!settings.noSponsor) return null;

  return (
    <div className="allm-flex allm-w-full allm-items-center allm-justify-center">
      <a
        href={settings.sponsorLink ?? "#"}
        target="_blank"
        rel="noreferrer"
        className="allm-text-lex-ink-faint allm-text-[11.5px] allm-font-medium allm-font-sans allm-no-underline hover:allm-text-lex-ink-muted"
      >
        {settings.sponsorText}
      </a>
    </div>
  );
}
