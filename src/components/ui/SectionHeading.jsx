function SectionHeading({ eyebrow, title, description }) {
  return (
    <header className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-earth">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-bold text-forest sm:text-4xl">{title}</h1>
      {description ? (
        <p className="max-w-3xl text-base leading-7 text-slate-600">{description}</p>
      ) : null}
    </header>
  );
}

export default SectionHeading;
