// Validação e formatação do CPF
document.addEventListener('DOMContentLoaded', function () {
    const cpfInput = document.getElementById('cpf');
    const cpfCounter = document.getElementById('cpfCounter');
    const loginForm = document.getElementById('loginForm');

    // Formatação do CPF
    if (cpfInput) {
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
            if (cpfCounter) {
                cpfCounter.textContent = `${digitCount}/11 dígitos`;

                // Mudar cor do contador quando atingir o limite
                if (digitCount === 11) {
                    cpfCounter.classList.add('warning');
                } else {
                    cpfCounter.classList.remove('warning');
                }
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
    }

    // Validação do formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            // Verificar CPF
            const cpf = cpfInput.value.replace(/\D/g, '');
            if (cpf.length !== 11) {
                showAlert('CPF deve conter exatamente 11 dígitos.', 'error');
                cpfInput.focus();
                e.preventDefault(); // Só previne se houver erro
                return;
            }

            // Verificar senha
            const senha = document.getElementById('senha').value;
            if (senha.length < 1) {
                showAlert('A senha deve ter pelo menos 1 caracteres.', 'error');
                document.getElementById('senha').focus();
                e.preventDefault(); // Só previne se houver erro
                return;
            }

            // Se todas as validações passarem, o formulário será enviado normalmente
            // para a controller sem intervenção do JavaScript

            // Opcional: Mostrar loading (sem impedir o envio)
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Entrando...';
                submitBtn.disabled = true;

                // Reativar o botão se houver algum erro no envio (timeout de segurança)
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }
        });
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