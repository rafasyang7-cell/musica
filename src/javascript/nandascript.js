/* ==========================================================================
   NANDASCRIPT.JS - CONTROLE DE ANIMAÇÕES E MENU MOBILE (ERA TSUNAMI)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= ANIMAÇÃO AO ROLAR A TELA (SCROLL) ================= */
    const animationOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, animationOptions);

    const elementsToAnimate = document.querySelectorAll(".scroll-animate");
    elementsToAnimate.forEach(element => {
        animationObserver.observe(element);
    });


    /* ================= CONTROLE DO MENU MOBILE ================= */
    const mobileBtn = document.getElementById("mobile_btn");
    const mobileMenu = document.getElementById("mobile_menu");
    const mobileNavLinks = document.querySelectorAll("#mobile_nav_list .nav-item a");

    if (mobileBtn && mobileMenu) {
        const toggleMenu = () => {
            const isExpanded = mobileBtn.getAttribute("aria-expanded") === "true";

            mobileBtn.setAttribute("aria-expanded", !isExpanded);
            mobileMenu.classList.toggle("active");

            const icon = mobileBtn.querySelector("i");
            if (icon) {
                if (!isExpanded) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        };

        mobileBtn.addEventListener("click", toggleMenu);

        mobileNavLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (mobileMenu.classList.contains("active")) {
                    toggleMenu();
                }
            });
        });
    }


    /* ================= SIDEBAR DE ARTISTAS (lateral, escondida) ================= */
    const sidebar = document.getElementById("sidebar_menu");
    const overlay = document.getElementById("blury_overlay");
    const sidebarBtn = document.getElementById("sidebar_btn");
    const arrowIndicator = document.querySelector("#toggle_container .arrow-indicator");
    const closeSidebarBtn = document.getElementById("close_sidebar");

    const openSidebar = () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeSidebar = () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
    };

    if (sidebarBtn) {
        sidebarBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openSidebar();
        });
    }

    if (arrowIndicator) {
        arrowIndicator.addEventListener("click", (e) => {
            e.preventDefault();
            openSidebar();
        });
    }

    if (closeSidebarBtn) closeSidebarBtn.addEventListener("click", closeSidebar);
    if (overlay) overlay.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sidebar && sidebar.classList.contains("active")) {
            closeSidebar();
        }
    });


    /* ================= SCROLLSPY: ÁLBUM / CONCEITO / CRÍTICA ================= */
    const header = document.querySelector("header");
    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll("#nav_list li, #mobile_nav_list li");
    const spyOffset = header.offsetHeight + 40;

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");

                navItems.forEach(li => li.classList.remove("active"));

                document
                    .querySelectorAll(`#nav_list a[href="#${id}"], #mobile_nav_list a[href="#${id}"]`)
                    .forEach(link => link.parentElement.classList.add("active"));
            }
        });
    }, {
        root: null,
        rootMargin: `-${spyOffset}px 0px -60% 0px`,
        threshold: 0
    });

    sections.forEach(section => spyObserver.observe(section));


    /* ================= EFEITO DE FUNDO DO HEADER AO ROLAR ================= */
    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
});