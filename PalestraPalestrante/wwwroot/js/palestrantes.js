// palestrantes.js - Funcionalidades para a página de palestrantes

document.addEventListener('DOMContentLoaded', function () {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar-custom');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        }
    });

    // Botão de voltar ao topo
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `;

    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll para links de navegação
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação para cards de palestrantes
    const palestranteCards = document.querySelectorAll('.palestrante-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 200);
            }
        });
    }, observerOptions);

    // Observar cards de palestrantes
    palestranteCards.forEach(card => observer.observe(card));

    // Variáveis para controle de exclusão
    let palestranteToDelete = null;
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    const palestranteNameToDelete = document.getElementById('palestranteNameToDelete');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

    // Função para excluir palestrante
    function excluirPalestrante(palestranteId, palestranteName) {
        console.log(`Excluindo palestrante: ${palestranteName} (ID: ${palestranteId})`);

        // Simular requisição AJAX para excluir palestrante
        setTimeout(() => {
            // Remover o card do palestrante da interface
            const palestranteCard = document.querySelector(`.btn-excluir[data-palestrante-id="${palestranteId}"]`).closest('.palestrante-card');
            palestranteCard.style.opacity = '0';
            palestranteCard.style.transform = 'translateY(-20px)';

            setTimeout(() => {
                palestranteCard.remove();
                atualizarContadorPalestrantes();
                mostrarMensagemSucesso(`Palestrante "${palestranteName}" excluído com sucesso!`);
            }, 300);
        }, 1000);
    }

});