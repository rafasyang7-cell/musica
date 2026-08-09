$(document).ready(function () {

    /* ==========================================================================
       1. CONTROLE DO TEXTO "DISCOGRAFIAS" NO SCROLL
       ========================================================================== */
    $(window).on('scroll', function () {
        var scrollDistance = $(this).scrollTop();
        var textElement = $('.brand-text');

        if (scrollDistance > 50) {
            textElement.css({
                'opacity': '0',
                'visibility': 'hidden',
                'transition': 'opacity 0.3s ease, visibility 0.3s ease'
            });
        } else {
            textElement.css({
                'opacity': '1',
                'visibility': 'visible'
            });
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
       5. SCROLLSPY — ÁLBUM / PRODUÇÃO / VEREDITO
       ========================================================================== */
    const header = $('header');
    const navItems = $('#nav_list li, #mobile_nav_list li');
    const spyOffset = header.outerHeight() + 40;

    function updateActiveMenu() {
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
}); 