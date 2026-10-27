import type { ClientDirective } from "astro";

/**
 * client:paint - hydrate only after the page has loaded and its first frame is on
 * screen, so no island script competes with the first paint.
 * client:paint={{ rootMargin: "200px" }} also waits until the island is that close
 * to the viewport.
 */
const paint: ClientDirective = (load, options, el) => {
  const value = options.value as { rootMargin?: string } | boolean | undefined;
  const rootMargin = typeof value === "object" && value ? value.rootMargin : undefined;

  const hydrate = async () => {
    const run = await load();
    await run();
  };

  const whenVisible = () => {
    if (!rootMargin) return hydrate();
    // astro-island is display: contents, so watch its children.
    const targets = Array.from(el.children);
    if (!targets.length) return hydrate();
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        hydrate();
      },
      { rootMargin },
    );
    targets.forEach((target) => io.observe(target));
  };

  // Two frames after load: the first paint has been presented by then.
  const afterPaint = () => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(whenVisible, 0)));
  if (document.readyState === "complete") afterPaint();
  else window.addEventListener("load", afterPaint, { once: true });
};

export default paint;
