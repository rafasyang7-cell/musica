$(document).ready(function () {
    const header = $('header');
    const mobileMenu = $('#mobile_menu');
    const mobileBtn = $('#mobile_btn');
    const icon = mobileBtn.find('i');
    const navItems = $('.nav-item');
    const animatedElements = $('.menu-item, .critica-card');

    /* ================= MENU MOBILE ================= */
    mobileBtn.on('click', function (e) {
        e.stopPropagation();
        mobileMenu.toggleClass('active');

        if (mobileMenu.hasClass('active')) {
            icon.removeClass('fa-bars').addClass('fa-xmark');
            $('body').css('overflow', 'hidden');
        } else {
            icon.removeClass('fa-xmark').addClass('fa-bars');
            $('body').css('overflow', 'auto');
        }
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('#mobile_menu, #mobile_btn').length && mobileMenu.hasClass('active')) {
            mobileMenu.removeClass('active');
            icon.removeClass('fa-xmark').addClass('fa-bars');
            $('body').css('overflow', 'auto');
        }
    });

    /* ================= SIDEBAR DE ARTISTAS (lateral, escondida) ================= */
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

    /* ================= SCROLL SUAVE ================= */
    $('a[href^="#"]').on('click', function (e) {
        const targetId = $(this).attr('href');
        const target = $(targetId);

        if (target.length) {
            e.preventDefault();
            const headerHeight = header.outerHeight();

            $('html, body').stop().animate({
                scrollTop: target.offset().top - (headerHeight - 5)
            }, 700);

            if (mobileMenu.hasClass('active')) {
                mobileMenu.removeClass('active');
                icon.removeClass('fa-xmark').addClass('fa-bars');
                $('body').css('overflow', 'auto');
            }
        }
    });

    /* ================= SCROLLSPY + HEADER EFFECT ================= */
    const handleScroll = () => {
        const scrollTop = $(window).scrollTop();
        const headerHeight = header.outerHeight();

        if (scrollTop > 50) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }

        const scrollPos = scrollTop + headerHeight + 120;

        $('section').each(function () {
            const sectionTop = $(this).offset().top;
            const sectionHeight = $(this).outerHeight();
            const sectionId = $(this).attr('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.removeClass('active');
                $(`#nav_list a[href="#${sectionId}"], #mobile_nav_list a[href="#${sectionId}"]`)
                    .parent()
                    .addClass('active');
            }
        });

        revealOnScroll();
    };

    /* ================= ANIMAÇÃO DE ENTRADA CORRIGIDA ================= */
    const revealOnScroll = () => {
        const triggerBottom = $(window).height() * 0.88;

        animatedElements.each(function (i) {
            if ($(this).hasClass('visible')) return;

            const boxTop = this.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                const $currentElement = $(this);
                $currentElement.addClass('visible');

                // Delay cascata para os cards surgirem em sequência
                setTimeout(() => {
                    $currentElement.css({
                        opacity: '1',
                        transform: 'scale(1) translateY(0)'
                    });

                    // Limpa o estilo inline após a animação (0.8s do CSS) para não quebrar o :hover do CSS
                    setTimeout(() => {
                        $currentElement.css({
                            transform: '',
                            opacity: ''
                        });
                    }, 800);

                }, (i % 4) * 100);
            }
        });
    };

    // Estado inicial de opacidade (Injetado via JS de forma segura)
    animatedElements.css({
        opacity: '0',
        transform: 'scale(0.85) translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });

    /* ================= RESIZE FIX ================= */
    $(window).on('resize', function () {
        if ($(window).width() > 1100 && mobileMenu.hasClass('active')) {
            mobileMenu.removeClass('active');
            icon.removeClass('fa-xmark').addClass('fa-bars');
            $('body').css('overflow', 'auto');
        }
    });

    $(window).on('scroll', handleScroll);
    handleScroll(); // Dispara logo no carregamento inicial
});