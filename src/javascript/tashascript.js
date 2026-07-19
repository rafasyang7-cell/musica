/* tashascript.js */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector("header");
    const mobileBtn = document.getElementById("mobile_btn");
    const mobileMenu = document.getElementById("mobile_menu");
    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll("#nav_list li, #mobile_nav_list li");

    /* ==========================================================================
       1. ANIMAÇÃO DE ENTRADA AO ROLAR
       ========================================================================== */
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.1 });

    document.querySelectorAll(".scroll-animate").forEach(el => {
        animationObserver.observe(el);
    });

    /* ==========================================================================
       2. SCROLLSPY — ÁLBUM / CONCEITO / CRÍTICA
       ========================================================================== */
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

    /* ==========================================================================
       3. HEADER FUNDO NO SCROLL
       ========================================================================== */
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 30);
    });

    /* ==========================================================================
       4. MENU MOBILE
       ========================================================================== */
    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.contains("active");
        mobileMenu.classList.toggle("active");
        mobileBtn.setAttribute("aria-expanded", String(!isOpen));
        const icon = mobileBtn.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-bars", isOpen);
            icon.classList.toggle("fa-xmark", !isOpen);
        }
        document.body.style.overflow = isOpen ? "auto" : "hidden";
    };

    mobileBtn.addEventListener("click", e => { e.stopPropagation(); toggleMenu(); });

    document.addEventListener("click", e => {
        if (
            mobileMenu.classList.contains("active") &&
            !mobileMenu.contains(e.target) &&
            !mobileBtn.contains(e.target)
        ) toggleMenu();
    });

    document.querySelectorAll("#mobile_nav_list a").forEach(link => {
        link.addEventListener("click", () => {
            if (mobileMenu.classList.contains("active")) toggleMenu();
        });
    });

    /* ==========================================================================
       5. SIDEBAR DE ARTISTAS (lateral, escondida)
       ========================================================================== */
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

    /* ==========================================================================
       6. SCROLL SUAVE
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - header.offsetHeight + 10,
                    behavior: "smooth"
                });
            }
        });
    });

    /* ==========================================================================
       7. RESIZE
       ========================================================================== */
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1080 && mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active");
            mobileBtn.setAttribute("aria-expanded", "false");
            const icon = mobileBtn.querySelector("i");
            if (icon) { icon.classList.add("fa-bars"); icon.classList.remove("fa-xmark"); }
            document.body.style.overflow = "auto";
        }
    });
});