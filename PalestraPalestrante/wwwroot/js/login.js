// Validação e formatação do CPF
document.addEventListener('DOMContentLoaded', function () {
    const cpfInput = document.getElementById('cpf');
    const cpfCounter = document.getElementById('cpfCounter');
    const loginForm = document.getElementById('loginForm');

    // Formatação do CPF
    cpfInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');

        // Limitar a 11 dígitos numéricos
        if (value.length > 11) {
            value = value.substring(0, 11);
        }

        // Aplicar formatação
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        }

        // Atualizar contador
        const digitCount = value.replace(/\D/g, '').length;
        cpfCounter.textContent = `${digitCount}/11 dígitos`;

        // Mudar cor do contador quando atingir o limite
        if (digitCount === 11) {
            cpfCounter.classList.add('warning');
        } else {
            cpfCounter.classList.remove('warning');
        }
    });

    // Prevenir entrada de mais de 14 caracteres
    cpfInput.addEventListener('keydown', function (e) {
        const currentValue = this.value.replace(/\D/g, '');
        if (currentValue.length >= 11 &&
            e.key !== 'Backspace' &&
            e.key !== 'Delete' &&
            e.key !== 'Tab' &&
            !e.metaKey) {
            e.preventDefault();
        }
    });

    // Validação do formulário de login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Verificar CPF
        const cpf = cpfInput.value.replace(/\D/g, '');
        if (cpf.length !== 11) {
            showAlert('CPF deve conter exatamente 11 dígitos.', 'error');
            cpfInput.focus();
            return;
        }

        // Verificar senha
        const senha = document.getElementById('senha').value;
        if (senha.length < 6) {
            showAlert('A senha deve ter pelo menos 6 caracteres.', 'error');
            document.getElementById('senha').focus();
            return;
        }

        // Simular processo de login
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Mostrar loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Entrando...';
        submitBtn.disabled = true;

        // Simular requisição AJAX
        setTimeout(() => {
            // Aqui você faria a requisição real para o backend
            const loginSuccess = simulateLogin(cpf, senha);

            if (loginSuccess) {
                showAlert('Login realizado com sucesso! Redirecionando...', 'success');

                // Redirecionar para a página inicial após 2 segundos
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                showAlert('CPF ou senha incorretos. Tente novamente.', 'error');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 2000);
    });

    // Função para simular login (remover em produção)
    function simulateLogin(cpf, senha) {
        // Em produção, isso seria uma requisição AJAX para o backend
        // Aqui estamos apenas simulando um login bem-sucedido
        const testCPF = '12345678909';
        const testPassword = '123456';

        return cpf === testCPF && senha === testPassword;
    }

    // Sistema de alertas
    function showAlert(message, type) {
        // Remover alertas existentes
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Criar novo alerta
        const alert = document.createElement('div');
        alert.className = `custom-alert alert-${type}`;
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
                ${message}
                <button class="alert-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Estilos do alerta
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            color: ${type === 'success' ? '#155724' : '#721c24'};
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 400px;
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(alert);

        // Auto-remover após 5 segundos
        setTimeout(() => {
            if (alert.parentElement) {
                alert.remove();
            }
        }, 5000);
    }

    // Login com Google (simulação)
    document.querySelector('.btn-google').addEventListener('click', function () {
        showAlert('Redirecionando para autenticação com Google...', 'info');
        // Em produção: window.location.href = '/auth/google';
    });

    // Login com Facebook (simulação)
    document.querySelector('.btn-facebook').addEventListener('click', function () {
        showAlert('Redirecionando para autenticação com Facebook...', 'info');
        // Em produção: window.location.href = '/auth/facebook';
    });

    // Verificar se há credenciais salvas
    const savedCPF = localStorage.getItem('savedCPF');
    const rememberMe = document.getElementById('lembrar');

    if (savedCPF && rememberMe.checked) {
        cpfInput.value = savedCPF;
        document.getElementById('senha').focus();
    }

    // Salvar CPF se "Lembrar-me" estiver marcado
    loginForm.addEventListener('submit', function () {
        if (rememberMe.checked) {
            localStorage.setItem('savedCPF', cpfInput.value);
        } else {
            localStorage.removeItem('savedCPF');
        }
    });

    // Efeitos visuais nos inputs
    const inputs = document.querySelectorAll('.form-control-custom');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});

// CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .alert-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .alert-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        margin-left: 1rem;
    }
    
    .form-group-floating.focused label {
        transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
        color: var(--primary-color);
    }
`;
document.head.appendChild(style);