$(document).ready(function () {

    /* ==========================================================================
       1. SUMIR COM TEXTO BRAND NO SCROLL
       ========================================================================== */
    $(window).on('scroll', function () {
        var scrollDistance = $(this).scrollTop();
        var textElement = $('.brand-text');

        if (scrollDistance > 50) {
            textElement.css({
                'opacity': '0',
                'visibility': 'hidden',
                'transition': 'opacity 0.25s ease, visibility 0.25s ease'
            });
        } else {
            textElement.css({
                'opacity': '1',
                'visibility': 'visible'
            });
        }
    });

    /* ==========================================================================
       2. NAV RESPONSIVA MOBILE
       ========================================================================== */
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('open');
    });

    $('#mobile_nav_list a').on('click', function () {
        $('#mobile_menu').removeClass('open');
    });

    /* ==========================================================================
       3. EFEITO DE VIBRAÇÃO DO MOUSE (MIRAGEM DE CALOR/QUASE GOL)
       ========================================================================== */
    const container = $('.album-wrapper');
    const image = container.find('img');

    container.on('mousemove', function (e) {
        const cWidth = container.outerWidth();
        const cHeight = container.outerHeight();

        // Detecta o deslocamento do mouse a partir do centro do card
        const xPos = e.pageX - container.offset().left - cWidth / 2;
        const yPos = e.pageY - container.offset().top - cHeight / 2;

        // Fator de deslocamento sutil (Vibração mecânica urbana)
        const moveX = (xPos / (cWidth / 2)) * 6;
        const moveY = (yPos / (cHeight / 2)) * 6;

        image.css({
            'transform': `translate(${moveX}px, ${moveY}px) scale(1.04)`,
            'filter': 'brightness(1.05)'
        });
    });

    // Reseta o card para o centro fosco original ao tirar o ponteiro
    container.on('mouseleave', function () {
        image.css({
            'transform': 'translate(0px, 0px) scale(1)',
            'filter': 'brightness(1)'
        });
    });
});