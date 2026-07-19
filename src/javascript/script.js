$(document).ready(function () {

    /* ========================================================= */
    /* ANIMAÇÃO DE SURGIMENTO */
    /* ========================================================= */

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                $(entry.target).addClass('show');

                observer.unobserve(entry.target);
            }
        });

    }, observerOptions);

    $('.scroll-animate').each(function () {
        scrollObserver.observe(this);
    });

    /* ========================================================= */
    /* HEADER DINÂMICO */
    /* ========================================================= */

    const header = $('header');

    function handleHeaderScroll() {

        if ($(window).scrollTop() > 40) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
    }

    handleHeaderScroll();

    $(window).on('scroll', handleHeaderScroll);

    /* ========================================================= */
    /* MENU "ÁLBUM, CONCEITO, CRÍTICA" ATIVO NO SCROLL */
    /* ========================================================= */

    const sections = $('section');
    const navItems = $('#nav_list .nav-item');

    function updateActiveMenu() {

        let currentSection = '';

        sections.each(function () {

            const sectionTop = $(this).offset().top - 180;
            const sectionHeight = $(this).outerHeight();

            if ($(window).scrollTop() >= sectionTop &&
                $(window).scrollTop() < sectionTop + sectionHeight) {

                currentSection = $(this).attr('id');
            }
        });

        navItems.removeClass('active');

        $('#nav_list .nav-item a').each(function () {

            const href = $(this).attr('href');

            if (href === `#${currentSection}`) {
                $(this).parent().addClass('active');
            }
        });
    }

    updateActiveMenu();

    $(window).on('scroll', updateActiveMenu);

    /* ========================================================= */
    /* SCROLL SUAVE MENU */
    /* ========================================================= */

    $('#nav_list a, #mobile_nav_list a').on('click', function (e) {

        const target = $(this).attr('href');

        if (target.startsWith('#')) {

            e.preventDefault();

            const offsetTop = $(target).offset().top - 100;

            $('html, body').animate({
                scrollTop: offsetTop
            }, 700);

            $('#mobile_menu').removeClass('active');

            $('#mobile_btn')
                .attr('aria-expanded', 'false');
        }
    });

    /* ========================================================= */
    /* MENU MOBILE */
    /* ========================================================= */

    $('#mobile_btn').on('click', function () {

        $('#mobile_menu').toggleClass('active');

        const expanded =
            $('#mobile_menu').hasClass('active');

        $(this).attr('aria-expanded', expanded);

        $('body').css(
            'overflow',
            expanded ? 'hidden' : 'auto'
        );
    });

    /* ========================================================= */
    /* FECHAR MENU MOBILE AO CLICAR FORA */
    /* ========================================================= */

    $(document).on('click', function (e) {

        const mobileMenu = $('#mobile_menu');
        const mobileBtn = $('#mobile_btn');

        if (
            mobileMenu.hasClass('active') &&
            !$(e.target).closest('#mobile_menu, #mobile_btn').length
        ) {

            mobileMenu.removeClass('active');

            mobileBtn.attr('aria-expanded', 'false');

            $('body').css('overflow', 'auto');
        }
    });

    /* ========================================================= */
    /* EFEITO PARALLAX SUAVE NA HOME */
    /* ========================================================= */

    $(window).on('scroll', function () {

        const scroll = $(window).scrollTop();

        $('#banner').css(
            'transform',
            `translateY(${scroll * 0.04}px)`
        );
    });

}); 