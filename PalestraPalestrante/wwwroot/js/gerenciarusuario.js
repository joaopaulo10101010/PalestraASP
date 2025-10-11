// perfil.js - Funcionalidades para a página de perfil

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

    // Animação para cards de usuários
    const userCards = document.querySelectorAll('.user-card');

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

    // Observar cards de usuários
    userCards.forEach(card => observer.observe(card));

    // Função para carregar dados do usuário (exemplo)
    function carregarDadosUsuario() {
        // Aqui você faria uma requisição para a API para buscar os dados reais do usuário
        console.log('Carregando dados do usuário...');

        // Exemplo de dados que viriam da API
        const usuario = {
            nome: 'João Silva',
            nomeCompleto: 'João da Silva Santos',
            email: 'joao.silva@email.com',
            telefone: '(11) 99999-9999',
            dataNascimento: '15/03/1985',
            cpf: '123.456.789-00',
            tipoConta: 'Premium',
            dataCadastro: '15/08/2023',
            status: 'Ativo',
            palestrasInscritas: 12,
            certificados: 8
        };

        // Aqui você atualizaria a interface com os dados reais
        // document.querySelector('.profile-name').textContent = usuario.nome;
        // etc...
    }

    // Carregar dados quando a página carregar
    carregarDadosUsuario();

    // Função para buscar lista de usuários
    function carregarListaUsuarios() {
        // Aqui você faria uma requisição para a API para buscar a lista de usuários
        console.log('Carregando lista de usuários...');

        // Exemplo de dados que viriam da API
        const usuarios = [
            {
                nome: 'Maria Oliveira',
                role: 'Participante Premium',
                profissao: 'Engenheira de Software',
                localizacao: 'São Paulo - SP'
            },
            // ... outros usuários
        ];

        // Aqui você atualizaria a lista de usuários na interface
    }

    // Carregar lista de usuários quando a página carregar
    carregarListaUsuarios();

    // Função para enviar mensagem
    function enviarMensagem(usuarioId) {
        // Implementar lógica para enviar mensagem
        console.log(`Enviando mensagem para o usuário ${usuarioId}`);
        alert('Funcionalidade de envio de mensagem será implementada em breve!');
    }

    // Adicionar event listeners para botões de mensagem
    document.querySelectorAll('.btn-outline-primary-custom.btn-sm').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const usuarioCard = this.closest('.user-card');
            const userName = usuarioCard.querySelector('.user-name').textContent;
            enviarMensagem(userName);
        });
    });
});