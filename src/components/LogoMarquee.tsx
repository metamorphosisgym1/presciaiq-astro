const clients = [
  { name: "Modern Body Method", src: "/logos/modern-body-method.png" },
  { name: "Longevity Australia", src: "/logos/longevity.png" },
  { name: "MAC Developments", src: "/logos/mac-developments.png" },
  { name: "BuildHire", src: "/logos/buildhire.png" },
  { name: "A-One Fencing & Gates", src: "/logos/a-one-fencing.png" },
  { name: "Loop", src: "/logos/loop.png" },
  { name: "Vale Tudo Training", src: "/logos/vale-tudo.png" },
  { name: "The Silk Studio", src: "/logos/the-silk-studio.png" },
  { name: "Hypertint", src: "/logos/hypertint.png" },
];

export default function LogoMarquee() {
  return (
    <section
      aria-label="Trusted by Australian businesses"
      className="overflow-hidden border-y border-white/[0.06] bg-ink-950 py-7 sm:py-8"
    >
      <p className="mb-4 text-center font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
        Trusted by Australian businesses
      </p>
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink-950 to-transparent sm:w-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink-950 to-transparent sm:w-24"
        />
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16"
            >
              {clients.map((client) => (
                <div
                  key={client.name}
                  className="flex h-9 w-32 shrink-0 items-center justify-center sm:w-36"
                >
                  <img
                    src={client.src}
                    alt={copy === 0 ? client.name : ""}
                    className="max-h-7 max-w-full object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 sm:max-h-8"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}