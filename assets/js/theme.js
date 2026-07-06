/* Theme toggle: dark by default, persists the user's choice. */
(function () {
  var root = document.documentElement;

  // Apply the saved theme as early as possible to avoid a flash.
  try {
    if (localStorage.getItem("theme") === "light") {
      root.setAttribute("data-theme", "light");
    }
  } catch (e) {}

  function sync(btn) {
    var light = root.getAttribute("data-theme") === "light";
    btn.setAttribute("aria-pressed", String(light));
    btn.setAttribute("aria-label", light ? "Activer le mode sombre" : "Activer le mode clair");
    btn.setAttribute("title", light ? "Mode sombre" : "Mode clair");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll(".theme-toggle");
    buttons.forEach(function (btn) {
      sync(btn);
      btn.addEventListener("click", function () {
        var light = root.getAttribute("data-theme") === "light";
        if (light) {
          root.removeAttribute("data-theme");
        } else {
          root.setAttribute("data-theme", "light");
        }
        try {
          localStorage.setItem("theme", light ? "dark" : "light");
        } catch (e) {}
        buttons.forEach(sync);
      });
    });
  });
})();
