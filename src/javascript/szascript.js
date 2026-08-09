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
       3. ANIMAÇÃO DE ESTÁTICA / FILTRO DE RUIDO NO HOVER (VIBE MONITORES ANTIGOS)
       ========================================================================== */
    const container = $('.album-wrapper');

    container.on('mouseenter', function () {
        // Gera pequenos tremores rápidos analógicos simulando interferência de fita de vídeo
        let interval = setInterval(() => {
            let skewX = (Math.random() - 0.5) * 4;
            let skewY = (Math.random() - 0.5) * 1;

            container.css({
                'transform': `skew(${skewX}deg, ${skewY}deg) scale(1.02)`,
                'filter': `hue-rotate(${Math.random() * 5}deg) brightness(1.05)`
            });
        }, 60);

        // Guarda o ID do intervalo para limpar depois
        container.data('glitchInterval', interval);
    });

    container.on('mouseleave', function () {
        // Para o efeito de estática e volta ao estado flutuante natural
        clearInterval(container.data('glitchInterval'));
        container.css({
            'transform': 'skew(0deg, 0deg) scale(1)',
            'filter': 'hue-rotate(0deg) brightness(1)'
        });
    });
});