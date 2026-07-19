/* capa.js */

$(document).ready(function () {

    /* ==========================================================================
       1. SIDEBAR COM DESFOQUE
       ========================================================================== */
    const sidebar = $('#sidebar_menu');
    const overlay = $('#blury_overlay');
    const openBtn = $('#sidebar_btn, #toggle_container .arrow-indicator');
    const closeBtn = $('#close_sidebar');

    function openSidebar() {
        sidebar.addClass('open');
        overlay.addClass('visible');
        $('body').css('overflow', 'hidden');
    }

    function closeSidebar() {
        sidebar.removeClass('open');
        overlay.removeClass('visible');
        $('body').css('overflow', 'auto');
    }

    openBtn.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        openSidebar();
    });

    closeBtn.on('click', closeSidebar);
    overlay.on('click', closeSidebar);

    sidebar.on('click', function (e) { e.stopPropagation(); });

    /* Fecha com ESC */
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.hasClass('open')) closeSidebar();
    });

    /* ==========================================================================
       2. NOTAS MUSICAIS CAINDO (elemento obrigatório da capa)
       ========================================================================== */
    const notesArray = ['♩', '♪', '♫', '♬', '𝄞', '♭', '♯'];
    const container = $('#notes_container');

    /* Tamanhos bem maiores para ficarem visíveis */
    const MIN_SIZE = 2.2;   /* rem */
    const MAX_SIZE = 5.5;   /* rem */

    function createNote() {
        if (!container.length) return;

        const note = $('<span class="falling-note"></span>');
        const symbol = notesArray[Math.floor(Math.random() * notesArray.length)];
        note.text(symbol);

        const posX = Math.random() * 96;                          /* % horizontal */
        const size = Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE;
        const duration = Math.random() * 7 + 8;                       /* 8–15 s */
        const delay = Math.random() * 1.5;                         /* 0–1.5 s */
        const blur = Math.random() < 0.3 ? '1px' : '0px';        /* algumas levemente desfocadas para profundidade */

        note.css({
            left: posX + '%',
            'font-size': size + 'rem',
            'animation-duration': duration + 's',
            'animation-delay': delay + 's',
            'filter': `blur(${blur})`,
            'text-shadow': '0 0 20px currentColor',
        });

        container.append(note);

        /* Remove do DOM ao fim */
        setTimeout(() => note.remove(), (duration + delay + 0.5) * 1000);
    }

    /* Cria as primeiras notas imediatamente para a tela não ficar vazia */
    for (let i = 0; i < 14; i++) {
        setTimeout(createNote, i * 200);
    }

    /* Fluxo contínuo — nova nota a cada 550ms */
    setInterval(createNote, 550);

    /* ==========================================================================
       3. SCROLL SUAVE NOS LINKS INTERNOS
       ========================================================================== */
    $('a[href^="#"]').on('click', function (e) {
        const target = $($(this).attr('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: target.offset().top }, 700);
        }
    });

});