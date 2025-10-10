document.addEventListener('DOMContentLoaded', function () {
    // Elementos DOM
    const fileInput = document.getElementById('imagemEvento');
    const fileUploadContainer = document.getElementById('fileUploadContainer');
    const fileName = document.getElementById('fileName');
    const imagePreview = document.getElementById('imagePreview');

    // Configurar data mínima como hoje
    const dataEventoInput = document.getElementById('dataEvento');
    const hoje = new Date();
    const dataMinima = hoje.toISOString().slice(0, 16);
    dataEventoInput.min = dataMinima;

    // Eventos de drag and drop
    fileUploadContainer.addEventListener('dragover', function (e) {
        e.preventDefault();
        fileUploadContainer.classList.add('dragover');
    });

    fileUploadContainer.addEventListener('dragleave', function () {
        fileUploadContainer.classList.remove('dragover');
    });

    fileUploadContainer.addEventListener('drop', function (e) {
        e.preventDefault();
        fileUploadContainer.classList.remove('dragover');

        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            updateFileDisplay();
        }
    });

    // Evento de mudança no input de arquivo
    fileInput.addEventListener('change', updateFileDisplay);

    // Função para atualizar a exibição do arquivo
    function updateFileDisplay() {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];

            // Verificar tamanho do arquivo (máx. 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('O arquivo é muito grande. Por favor, selecione uma imagem de até 5MB.');
                fileInput.value = '';
                return;
            }

            // Verificar tipo do arquivo
            if (!file.type.match('image.*')) {
                alert('Por favor, selecione apenas arquivos de imagem.');
                fileInput.value = '';
                return;
            }

            // Exibir nome do arquivo
            fileName.textContent = file.name;

            // Exibir prévia da imagem
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            fileName.textContent = '';
            imagePreview.style.display = 'none';
        }
    }

    // Validação antes do envio (opcional - apenas para UX)
    const eventoForm = document.getElementById('eventoForm');
    eventoForm.addEventListener('submit', function (e) {
        // Validações básicas (apenas para feedback visual)
        const nomeEvento = document.getElementById('nomeEvento').value.trim();
        const dataEvento = document.getElementById('dataEvento').value;
        const areaTecnica = document.getElementById('areaTecnica').value;
        const imagemEvento = document.getElementById('imagemEvento').files[0];

        if (!nomeEvento || !dataEvento || !areaTecnica || !imagemEvento) {
            // O navegador já impede o envio devido ao "required"
            // Esta validação é apenas para garantir consistência
            console.log('Formulário com campos obrigatórios não preenchidos');
        }

        // O formulário será enviado normalmente via POST para a controller
        // Não há preventDefault() para permitir o envio
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar-custom');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
});