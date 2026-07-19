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
       5. EFEITO INTERATIVO DE DESLOCAMENTO DINÂMICO (PARALAXE) COM O MOUSE
       ========================================================================== */
    const artContainer = $('.album-wrapper');
    const targetImg = artContainer.find('img');

    artContainer.on('mousemove', function (event) {
        const containerWidth = artContainer.outerWidth();
        const containerHeight = artContainer.outerHeight();

        const mouseX = event.pageX - artContainer.offset().left - containerWidth / 2;
        const mouseY = event.pageY - artContainer.offset().top - containerHeight / 2;

        const moveX = (mouseX / (containerWidth / 2)) * 10;
        const moveY = (mouseY / (containerHeight / 2)) * 10;

        artContainer.css('animation-play-state', 'paused');

        targetImg.css({
            'transform': `translate(${moveX}px, ${moveY}px) scale(1.02)`,
            'box-shadow': '0 35px 70px rgba(44, 37, 37, 0.25)'
        });
    });

    artContainer.on('mouseleave', function () {
        artContainer.css('animation-play-state', 'running');

        targetImg.css({
            'transform': 'translate(0px, 0px) scale(1)',
            'box-shadow': '0 30px 60px rgba(44, 37, 37, 0.15)'
        });
    });
});