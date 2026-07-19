$(document).ready(function () {
    const header = $('header');
    const mobileMenu = $('#mobile_menu');
    const mobileBtn = $('#mobile_btn');
    const icon = mobileBtn.find('i');
    const navItems = $('#nav_list li, #mobile_nav_list li');

    /* 1. INTERSECTION OBSERVER PARA AS ANIMAÇÕES */
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.1 });

    document.querySelectorAll(".scroll-animate").forEach(element => {
        animationObserver.observe(element);
    });

    /* 2. CONTROLE DO MENU INTERATIVO MOBILE */
    mobileBtn.on('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        mobileMenu.toggleClass('active');
        if (mobileMenu.hasClass('active')) {
            icon.removeClass('fa-bars').addClass('fa-xmark');
        } else {
            icon.removeClass('fa-xmark').addClass('fa-bars');
        }
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('#mobile_menu, #mobile_btn').length && mobileMenu.hasClass('active')) {
            mobileMenu.removeClass('active');
            icon.removeClass('fa-xmark').addClass('fa-bars');
        }
    });

    /* 3. SIDEBAR DE ARTISTAS (lateral, escondida) */
    const sidebar = $('#sidebar_menu');
    const overlay = $('#blury_overlay');

    $('#sidebar_btn, #toggle_container .arrow-indicator').on('click', function (e) {
        e.preventDefault();
        sidebar.addClass('active');
        overlay.addClass('active');
        $('body').css('overflow', 'hidden');
    });

    function closeSidebar() {
        sidebar.removeClass('active');
        overlay.removeClass('active');
        $('body').css('overflow', 'auto');
    }

    $('#close_sidebar').on('click', closeSidebar);
    overlay.on('click', closeSidebar);

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.hasClass('active')) closeSidebar();
    });

    /* 4. SISTEMA INTERNO DE ROLAGEM SUAVE */
    $('a[href^="#"]').on('click', function (e) {
        const target = $($(this).attr('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - (header.outerHeight() - 10)
            }, 600);
            if (mobileMenu.hasClass('active')) {
                mobileMenu.removeClass('active');
                icon.removeClass('fa-xmark').addClass('fa-bars');
            }
        }
    });

    /* 5. SCROLL EFFECTS & SCROLLSPY ATIVO */
    $(window).on('scroll', function () {
        const scrollTop = $(this).scrollTop();
        if (scrollTop > 30) header.addClass('scrolled');
        else header.removeClass('scrolled');

        const scrollPos = scrollTop + header.outerHeight() + 160;
        $('section').each(function () {
            const sectionTop = $(this).offset().top;
            const sectionId = $(this).attr('id');
            if (scrollPos >= sectionTop && scrollPos < sectionTop + $(this).outerHeight()) {
                navItems.removeClass('active');
                $(`#nav_list a[href="#${sectionId}"], #mobile_nav_list a[href="#${sectionId}"]`).parent().addClass('active');
            }
        });
    });

    $(window).on('resize', function () {
        if ($(window).width() > 1080 && mobileMenu.hasClass('active')) {
            mobileMenu.removeClass('active');
            icon.removeClass('fa-xmark').addClass('fa-bars');
        }
    });

    $(window).trigger('scroll');
});