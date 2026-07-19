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
        $('#mobile_menu').toggleClass('open');
    });

    $('#mobile_nav_list a').on('click', function () {
        $('#mobile_menu').removeClass('open');
    });

    /* ==========================================================================
       3. EFEITO INTERATIVO MOUSE-MOVE SIMULANDO ONDULAÇÃO NO MAR
       ========================================================================== */
    const container = $('.album-wrapper');
    const image = container.find('img');

    container.on('mousemove', function (e) {
        const cWidth = container.outerWidth();
        const cHeight = container.outerHeight();

        // Posição cartesiana do ponteiro do mouse a partir do ponto central
        const coordX = e.pageX - container.offset().left - cWidth / 2;
        const coordY = e.pageY - container.offset().top - cHeight / 2;

        // Transforma o movimento em inclinação líquida (Tilt de até 12 graus)
        const tiltX = (-coordY / (cHeight / 2)) * 12;
        const tiltY = (coordX / (cWidth / 2)) * 12;

        // Pausa o balanço passivo das ondas para priorizar o mouse
        container.css('animation-play-state', 'paused');

        image.css({
            'transform': `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`,
            'box-shadow': '0 30px 65px rgba(0, 180, 216, 0.25)'
        });
    });

    // Libera a imagem para voltar a flutuar na maré do CSS quando o mouse sai
    container.on('mouseleave', function () {
        container.css('animation-play-state', 'running');

        image.css({
            'transform': 'rotateX(0deg) rotateY(0deg) scale(1)',
            'box-shadow': '0 25px 55px rgba(0,0,0,0.5)'
        });
    });
});