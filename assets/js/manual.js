(function () {
  const content = document.querySelector(".manual-content");
  const toc = document.querySelector(".manual-toc");
  const progress = document.querySelector(".manual-progress");
  const topButton = document.querySelector(".manual-top");

  if (!content) return;

  const copyIcon = [
    '<svg viewBox="0 0 24 24" aria-hidden="true">',
    '<rect x="8" y="8" width="11" height="11" rx="2"></rect>',
    '<path d="M5 15H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"></path>',
    "</svg>",
  ].join("");

  const checkIcon = [
    '<svg viewBox="0 0 24 24" aria-hidden="true">',
    '<path d="M20 6 9 17l-5-5"></path>',
    "</svg>",
  ].join("");

  const upIcon = [
    '<svg viewBox="0 0 24 24" aria-hidden="true">',
    '<path d="m18 15-6-6-6 6"></path>',
    "</svg>",
  ].join("");

  content.querySelectorAll("pre").forEach((pre) => {
    const code = pre.querySelector("code");
    if (!code) return;

    pre.classList.add("has-copy");
    const button = document.createElement("button");
    button.className = "manual-copy";
    button.type = "button";
    button.setAttribute("aria-label", "Copy code");
    button.innerHTML = copyIcon;

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.innerText.replace(/\n$/, ""));
        button.classList.add("is-copied");
        button.setAttribute("aria-label", "Copied");
        button.innerHTML = checkIcon;
        window.setTimeout(() => {
          button.classList.remove("is-copied");
          button.setAttribute("aria-label", "Copy code");
          button.innerHTML = copyIcon;
        }, 1400);
      } catch (error) {
        button.classList.remove("is-copied");
      }
    });

    pre.appendChild(button);
  });

  const headings = Array.from(content.querySelectorAll("h1, h2")).filter((heading, index) => index > 0);
  const navLinks = new Map();

  if (toc && headings.length) {
    headings.forEach((heading) => {
      if (!heading.id) return;

      const link = document.createElement("a");
      link.href = "#" + heading.id;
      link.textContent = heading.textContent;
      link.className = heading.tagName === "H2" ? "depth-2" : "depth-1";
      toc.appendChild(link);
      navLinks.set(heading.id, link);
    });
  }

  if (topButton) {
    topButton.innerHTML = upIcon;
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

    if (progress) progress.style.transform = "scaleX(" + ratio + ")";
    if (topButton) topButton.classList.toggle("is-visible", scrollTop > 700);
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  if ("IntersectionObserver" in window && navLinks.size) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];

        if (!visible) return;

        navLinks.forEach((link) => link.classList.remove("active"));
        const active = navLinks.get(visible.target.id);
        if (active) active.classList.add("active");
      },
      {
        rootMargin: "-18% 0px -70% 0px",
        threshold: [0, 1],
      }
    );

    headings.forEach((heading) => observer.observe(heading));
  }
})();
