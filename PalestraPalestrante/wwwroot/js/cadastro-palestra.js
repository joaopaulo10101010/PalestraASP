document.addEventListener('DOMContentLoaded', function () {
    // Elementos DOM
    const descricaoTextarea = document.getElementById('descricao');
    const contadorCaracteres = document.getElementById('contadorCaracteres');
    const palestraForm = document.getElementById('palestraForm');

    // Contador de caracteres para a descrição
    descricaoTextarea.addEventListener('input', function () {
        const caracteres = this.value.length;
        contadorCaracteres.textContent = caracteres;

        // Altera a cor se estiver próximo do limite
        if (caracteres > 900) {
            contadorCaracteres.classList.add('contador-limite');
        } else {
            contadorCaracteres.classList.remove('contador-limite');
        }

        // Limita a 1000 caracteres
        if (caracteres > 1000) {
            this.value = this.value.substring(0, 1000);
            contadorCaracteres.textContent = 1000;
            contadorCaracteres.classList.add('contador-limite');
        }
    });

    // Validação antes do envio (apenas para UX)
    palestraForm.addEventListener('submit', function (e) {
        // Validações básicas (apenas para feedback visual)
        const areaPalestra = document.getElementById('areaPalestra').value;
        const descricao = document.getElementById('descricao').value.trim();

        if (!areaPalestra || !descricao) {
            // O navegador já impede o envio devido ao "required"
            console.log('Formulário com campos obrigatórios não preenchidos');
        }

        // Verifica se a descrição tem pelo menos 50 caracteres (validação adicional)
        if (descricao.length < 50) {
            alert('A descrição deve ter pelo menos 50 caracteres para ser informativa.');
            e.preventDefault();
            return;
        }

        // O formulário será enviado normalmente via POST para a controller
        // Não há preventDefault() para permitir o envio, exceto na validação acima
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

    // Auto-expand textarea conforme o conteúdo
    descricaoTextarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});