$(document).ready(function () {
    const header = $('header');
    const mobileMenu = $('#mobile_menu');
    const mobileBtn = $('#mobile_btn');
    const icon = mobileBtn.find('i');

    // Seleciona as tags <li> corretas de ambos os menus para o ScrollSpy funcionar
    const navItems = $('#nav_list li, #mobile_nav_list li');

    /* ==========================================================================
       1. ANIMAÇÃO AO ROLAR A TELA (SCROLL ANIMATE VIA INTERSECTION OBSERVER)
       ========================================================================== */
    const animationOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1 // Ativa a animação quando 10% do elemento aparece na tela
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Injeta a classe que dispara o efeito do CSS
                entry.target.classList.add("show");
                // Para de observar o elemento para rodar a animação apenas uma vez
                observer.unobserve(entry.target);
            }
        });
    }, animationOptions);

    // Vincula todos os elementos que possuem a classe de animação ao observador nativo
    document.querySelectorAll(".scroll-animate").forEach(element => {
        animationObserver.observe(element);
    });


    /* ==========================================================================
       2. CONTROLE DO MENU MOBILE
       ========================================================================== */
    mobileBtn.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        mobileMenu.toggleClass('active');

        // Alterna o ícone de forma segura
        if (mobileMenu.hasClass('active')) {
            icon.removeClass('fa-bars').addClass('fa-xmark');
        } else {
            icon.removeClass('fa-xmark').addClass('fa-bars');
        }
    });

    // Fecha o menu se o usuário clicar em qualquer parte escura da tela
    $(document).on('click', function (e) {
        if (!$(e.target).closest('#mobile_menu, #mobile_btn').length) {
            if (mobileMenu.hasClass('active')) {
                mobileMenu.removeClass('active');
                icon.removeClass('fa-xmark').addClass('fa-bars');
            }
        }
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
       4. SCROLL SUAVE (MOBILE FRIENDLY)
       ========================================================================== */
    $('a[href^="#"]').on('click', function (e) {
        const targetId = $(this).attr('href');
        const target = $(targetId);

        if (target.length) {
            e.preventDefault();

            // Calcula a altura exata do header dinamicamente
            const headerHeight = header.outerHeight();

            // Animação otimizada para telas mobile de toque
            $('html, body').stop().animate({
                scrollTop: target.offset().top - (headerHeight - 10)
            }, 600); // Velocidade de 600ms para uma navegação responsiva

            // Fecha o menu mobile imediatamente após o clique para liberar a visão da página
            if (mobileMenu.hasClass('active')) {
                mobileMenu.removeClass('active');
                icon.removeClass('fa-xmark').addClass('fa-bars');
            }
        }
    });


    /* ==========================================================================
       5. SCROLLSPY (via IntersectionObserver - mais confiável que cálculo manual)
       ========================================================================== */
    const sections = document.querySelectorAll('main section[id]');
    const spyOffset = header.outerHeight() + 40;

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.removeClass('active');
                $(`#nav_list a[href="#${id}"], #mobile_nav_list a[href="#${id}"]`)
                    .parent()
                    .addClass('active');
            }
        });
    }, {
        root: null,
        rootMargin: `-${spyOffset}px 0px -60% 0px`,
        threshold: 0
    });

    sections.forEach(section => spyObserver.observe(section));


    /* ==========================================================================
       6. SCROLL EFFECTS (background do header ao rolar)
       ========================================================================== */
    $(window).on('scroll', function () {
        const scrollTop = $(this).scrollTop();

        if (scrollTop > 30) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
    });


    /* ==========================================================================
       7. AJUSTE DE REDIMENSIONAMENTO (RESIZE)
       ========================================================================== */
    $(window).on('resize', function () {
        // Se a tela crescer além do layout mobile, desativa o menu aberto em background
        if ($(window).width() > 1080 && mobileMenu.hasClass('active')) {
            mobileMenu.removeClass('active');
            icon.removeClass('fa-xmark').addClass('fa-bars');
        }
    });

    // Dispara o evento de scroll ao carregar para garantir o estado inicial correto
    $(window).trigger('scroll');
});