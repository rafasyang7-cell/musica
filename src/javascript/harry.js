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
       3. EFEITO INTERATIVO DE DESLOCAMENTO DINÂMICO (PARALAXE) COM O MOUSE
       ========================================================================== */
    const artContainer = $('.album-wrapper');
    const targetImg = artContainer.find('img');

    artContainer.on('mousemove', function (event) {
        const containerWidth = artContainer.outerWidth();
        const containerHeight = artContainer.outerHeight();

        // Obtém o deslocamento do mouse em relação ao centro do container
        const mouseX = event.pageX - artContainer.offset().left - containerWidth / 2;
        const mouseY = event.pageY - artContainer.offset().top - containerHeight / 2;

        // Calcula a movimentação paralaxe (Deslocamento leve de até 10px)
        const moveX = (mouseX / (containerWidth / 2)) * 10;
        const moveY = (mouseY / (containerHeight / 2)) * 10;

        // Pausa temporariamente a animação CSS padrão para rodar o controle do mouse
        artContainer.css('animation-play-state', 'paused');

        targetImg.css({
            'transform': `translate(${moveX}px, ${moveY}px) scale(1.02)`,
            'box-shadow': '0 35px 70px rgba(44, 37, 37, 0.25)'
        });
    });

    // Retoma a flutuação normal quando o mouse sai do elemento
    artContainer.on('mouseleave', function () {
        artContainer.css('animation-play-state', 'running');

        targetImg.css({
            'transform': 'translate(0px, 0px) scale(1)',
            'box-shadow': '0 30px 60px rgba(44, 37, 37, 0.15)'
        });
    });
});