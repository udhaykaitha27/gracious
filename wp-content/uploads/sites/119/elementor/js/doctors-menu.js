document.addEventListener("DOMContentLoaded", () => {
  const menuWidgets = document.querySelectorAll(
    ".elementor-location-header .elementor-widget-nav-menu",
  );

  const closeMenu = (widget) => {
    const toggle = widget.querySelector(".elementor-menu-toggle");
    const dropdown = widget.querySelector(".elementor-nav-menu--dropdown");

    if (!toggle || !dropdown) {
      return;
    }

    toggle.classList.remove("elementor-active");
    toggle.setAttribute("aria-expanded", "false");
    dropdown.setAttribute("aria-hidden", "true");
    dropdown.querySelectorAll("a").forEach((link) => {
      link.setAttribute("tabindex", "-1");
    });
  };

  const openMenu = (widget) => {
    const toggle = widget.querySelector(".elementor-menu-toggle");
    const dropdown = widget.querySelector(".elementor-nav-menu--dropdown");

    if (!toggle || !dropdown) {
      return;
    }

    toggle.classList.add("elementor-active");
    toggle.setAttribute("aria-expanded", "true");
    dropdown.setAttribute("aria-hidden", "false");
    dropdown.querySelectorAll("a").forEach((link) => {
      link.removeAttribute("tabindex");
    });
  };

  menuWidgets.forEach((widget) => {
    const toggle = widget.querySelector(".elementor-menu-toggle");
    const dropdown = widget.querySelector(".elementor-nav-menu--dropdown");

    if (!toggle || !dropdown) {
      return;
    }

    widget.classList.remove("elementor-invisible");
    closeMenu(widget);

    const toggleMenu = () => {
      if (toggle.getAttribute("aria-expanded") === "true") {
        closeMenu(widget);
      } else {
        openMenu(widget);
      }
    };

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      toggleMenu();
    });

    toggle.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      toggleMenu();
    });

    dropdown.addEventListener("click", (event) => {
      const submenuToggle = event.target.closest(
        ".menu-item-has-children > a",
      );

      if (submenuToggle && dropdown.contains(submenuToggle)) {
        event.preventDefault();

        const submenu = submenuToggle.nextElementSibling;
        const isExpanded = submenuToggle.getAttribute("aria-expanded") === "true";

        submenuToggle.setAttribute("aria-expanded", String(!isExpanded));
        submenu?.setAttribute("aria-hidden", String(isExpanded));
        return;
      }

      if (event.target.closest("a")) {
        closeMenu(widget);
      }
    });

    dropdown
      .querySelectorAll(".menu-item-has-children > a")
      .forEach((submenuToggle) => {
        const submenu = submenuToggle.nextElementSibling;
        submenuToggle.setAttribute("aria-expanded", "false");
        submenu?.setAttribute("aria-hidden", "true");
      });
  });

  document.addEventListener("click", (event) => {
    menuWidgets.forEach((widget) => {
      if (
        widget.querySelector(".elementor-menu-toggle")?.getAttribute("aria-expanded") ===
          "true" &&
        !widget.contains(event.target)
      ) {
        closeMenu(widget);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    menuWidgets.forEach((widget) => {
      const toggle = widget.querySelector(".elementor-menu-toggle");

      if (toggle?.getAttribute("aria-expanded") === "true") {
        closeMenu(widget);
        toggle.focus();
      }
    });
  });

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
