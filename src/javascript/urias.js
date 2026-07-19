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
       3. EFEITO INTERATIVO 3D MOUSE-MOVE NA CAPA DO ÁLBUM (MANTIDO INTACTO)
       ========================================================================== */
    const card = $('.album-wrapper');
    const img = card.find('img');

    card.on('mousemove', function (e) {
        const width = card.outerWidth();
        const height = card.outerHeight();

        // Coordenadas do mouse relativas ao centro da imagem
        const pageX = e.pageX - card.offset().left - width / 2;
        const pageY = e.pageY - card.offset().top - height / 2;

        // Calcula a rotação proporcional à distância do centro (Máx: 15 graus)
        const rotateX = (-pageY / (height / 2)) * 15;
        const rotateY = (pageX / (width / 2)) * 15;

        img.css({
            'transform': `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
            'box-shadow': '0 35px 70px rgba(255, 42, 75, 0.25)'
        });
    });

    // Retorna a posição inicial suavemente quando o mouse sai de cima
    card.on('mouseleave', function () {
        img.css({
            'transform': 'rotateX(0deg) rotateY(0deg) scale(1)',
            'box-shadow': '0 25px 60px rgba(0,0,0,0.8)'
        });
    });

    /* ==========================================================================
       4. LOGICA DE ANIMAÇÃO AO DESCER A PÁGINA (SCROLL REVEAL)
       ========================================================================== */
    function checkScrollAnimations() {
        const triggerBottom = $(window).height() * 0.85; // Dispara quando o elemento atinge 85% da tela

        $('.scroll-animate').each(function () {
            const elementTop = $(this).offset().top - $(window).scrollTop();

            if (elementTop < triggerBottom) {
                $(this).addClass('show');
            }
        });
    }

    // Executa no carregamento inicial da página e a cada rolagem de scroll
    $(window).on('scroll', checkScrollAnimations);
    checkScrollAnimations();
});