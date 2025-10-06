// Dados de exemplo (em produção, viriam do backend)
const palestrasData = [
    {
        id: 1,
        nome: "Inteligência Artificial na Prática",
        data: "2024-12-20",
        imagem: "../assets/image/palestras/ai-practice.jpg",
        categoria: "Tecnologia",
        tipo: "online",
        descricao: "Aprenda a aplicar IA em projetos reais com cases práticos e implementações.",
        preco: "Grátis",
        horario: "14:00 - 16:00",
        local: "Online",
        vagas: 45
    },
    {
        id: 2,
        nome: "Liderança em Times Remotos",
        data: "2024-12-22",
        imagem: "../assets/image/palestras/remote-leadership.jpg",
        categoria: "Liderança",
        tipo: "presencial",
        descricao: "Estratégias eficazes para gerenciar e motivar equipes distribuídas.",
        preco: "R$ 89,90",
        horario: "09:00 - 12:00",
        local: "São Paulo - SP",
        vagas: 30
    },
    {
        id: 3,
        nome: "Marketing Digital 2024",
        data: "2024-12-25",
        imagem: "../assets/image/palestras/digital-marketing.jpg",
        categoria: "Marketing",
        tipo: "hibrido",
        descricao: "Tendências e estratégias que estão revolucionando o marketing digital.",
        preco: "R$ 49,90",
        horario: "16:00 - 18:00",
        local: "Online/Presencial",
        vagas: 100
    },
    {
        id: 4,
        nome: "Desenvolvimento Pessoal e Profissional",
        data: "2024-12-28",
        imagem: "../assets/image/palestras/personal-dev.jpg",
        categoria: "Desenvolvimento Pessoal",
        tipo: "online",
        descricao: "Técnicas para maximizar seu potencial e alcançar seus objetivos.",
        preco: "Grátis",
        horario: "19:00 - 21:00",
        local: "Online",
        vagas: 200
    },
    {
        id: 5,
        nome: "Inovação em Startups",
        data: "2024-12-30",
        imagem: "../assets/image/palestras/startup-innovation.jpg",
        categoria: "Negócios",
        tipo: "presencial",
        descricao: "Como criar e escalar startups inovadoras no mercado atual.",
        preco: "R$ 129,90",
        horario: "10:00 - 13:00",
        local: "Rio de Janeiro - RJ",
        vagas: 25
    },
    {
        id: 6,
        nome: "Data Science para Negócios",
        data: "2025-01-05",
        imagem: "../assets/image/palestras/data-science.jpg",
        categoria: "Tecnologia",
        tipo: "online",
        descricao: "Transforme dados em insights valiosos para decisões estratégicas.",
        preco: "R$ 79,90",
        horario: "15:00 - 17:30",
        local: "Online",
        vagas: 75
    }
];


document.addEventListener('DOMContentLoaded', function () {
    // Inicializar dados do usuário

    // Carregar palestras
    loadPalestras();

    // Configurar event listeners
    setupEventListeners();

    // Configurar busca e filtros
    setupSearchAndFilters();
});

function loadPalestras(palestras = palestrasData) {
    const grid = document.getElementById('palestrasGrid');
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');

    // Mostrar loading
    loadingState.style.display = 'block';
    emptyState.style.display = 'none';
    grid.innerHTML = '';

    // Simular carregamento
    setTimeout(() => {
        loadingState.style.display = 'none';

        if (palestras.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        palestras.forEach(palestra => {
            const card = createPalestraCard(palestra);
            grid.appendChild(card);
        });
    }, 1000);
}

function createPalestraCard(palestra) {
    const card = document.createElement('div');
    card.className = 'palestra-card';
    card.innerHTML = `
        <div class="palestra-image">
            <img src="${palestra.imagem}" alt="${palestra.nome}" onerror="this.src='../assets/image/palestras/default.jpg'">
            <div class="palestra-badge">${palestra.categoria}</div>
        </div>
        <div class="palestra-content">
            <h4>${palestra.nome}</h4>
            <div class="palestra-info">
                <div><i class="fas fa-calendar"></i>${formatDate(palestra.data)}</div>
                <div><i class="fas fa-clock"></i>${palestra.horario}</div>
                <div><i class="fas fa-map-marker-alt"></i>${palestra.local}</div>
                <div><i class="fas fa-users"></i>${palestra.vagas} vagas</div>
            </div>
            <p class="palestra-desc">${palestra.descricao}</p>
            <div class="palestra-footer">
                <span class="palestra-price">${palestra.preco}</span>
                <button class="btn-inscrever" data-palestra-id="${palestra.id}" data-palestra-nome="${palestra.nome}" data-palestra-data="${palestra.data}">
                    <i class="fas fa-user-plus me-2"></i>Inscrever-se
                </button>
            </div>
        </div>
    `;

    return card;
}

function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options);
}

function setupEventListeners() {
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function (e) {
        e.preventDefault();
        if (confirm('Tem certeza que deseja sair?')) {
            // Em produção: limpar token/localStorage e redirecionar
            window.location.href = '/login';
        }
    });

    // Delegation para botões de inscrever (por serem dinâmicos)
    document.addEventListener('click', function (e) {
        if (e.target.closest('.btn-inscrever')) {
            const button = e.target.closest('.btn-inscrever');
            const palestraId = button.getAttribute('data-palestra-id');
            const palestraNome = button.getAttribute('data-palestra-nome');
            const palestraData = button.getAttribute('data-palestra-data');

            openInscricaoModal(palestraId, palestraNome, palestraData);
        }
    });

    // Confirmação de inscrição no modal
    document.getElementById('confirmInscricao').addEventListener('click', confirmInscricao);

    // Reset search
    document.getElementById('resetSearch').addEventListener('click', function () {
        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('dateFilter').value = '';
        document.getElementById('typeFilter').value = '';
        loadPalestras();
    });
}

function setupSearchAndFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const typeFilter = document.getElementById('typeFilter');
    const clearSearch = document.getElementById('clearSearch');
    const clearFilters = document.getElementById('clearFilters');

    // Busca em tempo real
    searchInput.addEventListener('input', debounce(filterPalestras, 300));

    // Filtros
    categoryFilter.addEventListener('change', filterPalestras);
    dateFilter.addEventListener('change', filterPalestras);
    typeFilter.addEventListener('change', filterPalestras);

    // Limpar busca
    clearSearch.addEventListener('click', function () {
        searchInput.value = '';
        filterPalestras();
        searchInput.focus();
    });

    // Limpar filtros
    clearFilters.addEventListener('click', function () {
        searchInput.value = '';
        categoryFilter.value = '';
        dateFilter.value = '';
        typeFilter.value = '';
        filterPalestras();
    });
}

function filterPalestras() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    const type = document.getElementById('typeFilter').value;

    const filtered = palestrasData.filter(palestra => {
        const matchesSearch = palestra.nome.toLowerCase().includes(searchTerm) ||
            palestra.descricao.toLowerCase().includes(searchTerm);

        const matchesCategory = !category || palestra.categoria === category;
        const matchesType = !type || palestra.tipo === type;

        const matchesDate = filterByDate(palestra.data, dateFilter);

        return matchesSearch && matchesCategory && matchesType && matchesDate;
    });

    loadPalestras(filtered);
}

function filterByDate(palestraDate, filter) {
    if (!filter) return true;

    const today = new Date();
    const palestra = new Date(palestraDate);

    switch (filter) {
        case 'today':
            return palestra.toDateString() === today.toDateString();
        case 'week':
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            return palestra >= weekStart && palestra <= weekEnd;
        case 'month':
            return palestra.getMonth() === today.getMonth() &&
                palestra.getFullYear() === today.getFullYear();
        case 'upcoming':
            return palestra > today;
        default:
            return true;
    }
}

function openInscricaoModal(palestraId, palestraNome, palestraData) {
    document.getElementById('modalPalestraNome').textContent = palestraNome;
    document.getElementById('modalPalestraData').textContent = formatDate(palestraData);

    // Armazenar ID da palestra no modal para uso posterior
    const modal = new bootstrap.Modal(document.getElementById('inscricaoModal'));
    modal._element.setAttribute('data-palestra-id', palestraId);
    modal.show();
}

function confirmInscricao() {
    const modal = document.getElementById('inscricaoModal');
    const palestraId = modal.getAttribute('data-palestra-id');
    const button = document.getElementById('confirmInscricao');
    const originalText = button.innerHTML;

    // Mostrar loading
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processando...';
    button.disabled = true;

    // Simular requisição de inscrição
    setTimeout(() => {
        // Em produção, seria uma requisição AJAX para o backend
        const success = Math.random() > 0.2; // 80% de chance de sucesso para demonstração

        if (success) {
            showAlert('Inscrição realizada com sucesso!', 'success');

            // Fechar modal
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();

            // Atualizar contador de eventos (opcional)
            updateUpcomingEvents();
        } else {
            showAlert('Erro ao realizar inscrição. Tente novamente.', 'error');
        }

        // Restaurar botão
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

function updateUpcomingEvents() {
    // Simular atualização do contador
    const currentCount = parseInt(document.getElementById('upcomingEvents').textContent);
    document.getElementById('upcomingEvents').textContent = currentCount + 1;
}

// Utilitários
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alert);

    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

// Mobile menu toggle (opcional)
function toggleMobileMenu() {
    document.querySelector('.sidebar').classList.toggle('mobile-open');
}