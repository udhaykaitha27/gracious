document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(
    ".elementor-location-header .elementor-nav-menu--main .menu-item-has-children",
  );

  items.forEach((item) => {
    const submenu = item.querySelector(":scope > .sub-menu");
    const toggle = item.querySelector(":scope > a");

    if (!submenu || !toggle) {
      return;
    }

    const open = () => {
      submenu.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
    };

    const close = () => {
      if (item.matches(":hover") || item.contains(document.activeElement)) {
        return;
      }

      submenu.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
    };

    item.addEventListener("mouseenter", open);
    item.addEventListener("mouseleave", close);
    item.addEventListener("focusin", open);
    item.addEventListener("focusout", (event) => {
      if (!item.contains(event.relatedTarget)) {
        close();
      }
    });
  });
});
