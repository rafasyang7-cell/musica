$(document).ready(function () {

    /* ==========================================================================
       1. HEADER: FUNDO NO SCROLL + LOGO "DISCOGRAFIAS" SOME
       ========================================================================== */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    /* ==========================================================================
       2. CONTROLE DO MENU RESPONSIVO INTERNO (MOBILE)
       ========================================================================== */
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
    });

    $('#mobile_nav_list a').on('click', function () {
        $('#mobile_menu').removeClass('active');
    });

    /* ==========================================================================
       3. SIDEBAR DE ARTISTAS (lateral, escondida)
       ========================================================================== */
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

    /* ==========================================================================
       4. ANIMAÇÃO DE SURGIMENTO AO ROLAR A TELA
       ========================================================================== */
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('show');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.12 });

    $('.scroll-animate').each(function () {
        scrollObserver.observe(this);
    });

    /* ==========================================================================
       5. SCROLLSPY — ÁLBUM / CONCEITO / CRÍTICA (era o que faltava)
       ========================================================================== */
    const header = $('header');
    const navItems = $('#nav_list li, #mobile_nav_list li');

    function updateActiveMenu() {
        const spyOffset = header.outerHeight() + 40;
        let currentSection = '';

        $('main section[id]').each(function () {
            const sectionTop = $(this).offset().top - spyOffset;
            const sectionHeight = $(this).outerHeight();
            if ($(window).scrollTop() >= sectionTop && $(window).scrollTop() < sectionTop + sectionHeight) {
                currentSection = $(this).attr('id');
            }
        });

        navItems.removeClass('active');
        $(`#nav_list a[href="#${currentSection}"], #mobile_nav_list a[href="#${currentSection}"]`)
            .parent()
            .addClass('active');
    }

    updateActiveMenu();
    $(window).on('scroll', updateActiveMenu);

    /* ==========================================================================
       6. SCROLL SUAVE NOS LINKS INTERNOS
       ========================================================================== */
    $('a[href^="#"]').on('click', function (e) {
        const target = $($(this).attr('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - (header.outerHeight() - 10)
            }, 700);

            if ($('#mobile_menu').hasClass('active')) {
                $('#mobile_menu').removeClass('active');
            }
        }
    });

    /* ==========================================================================
       7. EFEITO INTERATIVO 3D MOUSE-MOVE NA CAPA DO ÁLBUM
       ========================================================================== */
    const card = $('.album-wrapper');
    const img = card.find('img');

    card.on('mousemove', function (e) {
        const width = card.outerWidth();
        const height = card.outerHeight();

        const pageX = e.pageX - card.offset().left - width / 2;
        const pageY = e.pageY - card.offset().top - height / 2;

        const rotateX = (-pageY / (height / 2)) * 15;
        const rotateY = (pageX / (width / 2)) * 15;

        img.css({
            'transform': `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
            'box-shadow': '0 35px 70px rgba(255, 42, 75, 0.15)'
        });
    });

    card.on('mouseleave', function () {
        img.css({
            'transform': 'rotateX(0deg) rotateY(0deg) scale(1)',
            'box-shadow': '0 25px 60px rgba(0,0,0,0.8)'
        });
    });
});