// Aguardar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function () {
    // Validação e formatação do CPF com limitador de 11 dígitos
    const cpfInput = document.getElementById('cpf');
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
            const counter = document.getElementById('cpfCounter');
            if (counter) {
                counter.textContent = `${digitCount}/11 dígitos`;

                // Mudar cor do contador quando atingir o limite
                if (digitCount === 11) {
                    counter.classList.add('warning');
                } else {
                    counter.classList.remove('warning');
                }
            }
        });

        // Prevenir entrada de mais de 11 dígitos numéricos
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

    // Validação de força da senha
    const senhaInput = document.getElementById('senha');
    if (senhaInput) {
        senhaInput.addEventListener('input', function () {
            const password = this.value;
            const strengthBar = document.getElementById('passwordStrength');
            let strength = 0;

            if (password.length >= 8) strength += 25;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
            if (password.match(/\d/)) strength += 25;
            if (password.match(/[^a-zA-Z\d]/)) strength += 25;

            if (strengthBar) {
                if (strength <= 25) {
                    strengthBar.className = 'password-strength bg-danger';
                } else if (strength <= 50) {
                    strengthBar.className = 'password-strength bg-warning';
                } else if (strength <= 75) {
                    strengthBar.className = 'password-strength bg-info';
                } else {
                    strengthBar.className = 'password-strength bg-success';
                }

                strengthBar.style.width = strength + '%';
            }
        });
    }

    // Validação de confirmação de senha
    const confirmarSenhaInput = document.getElementById('confirmarSenha');
    if (confirmarSenhaInput) {
        confirmarSenhaInput.addEventListener('input', function () {
            const senha = document.getElementById('senha').value;
            const confirmarSenha = this.value;
            const matchText = document.getElementById('passwordMatch');

            if (matchText) {
                if (confirmarSenha === '') {
                    matchText.textContent = '';
                    matchText.className = 'form-text';
                } else if (senha === confirmarSenha) {
                    matchText.textContent = 'Senhas coincidem ✓';
                    matchText.className = 'form-text text-success';
                } else {
                    matchText.textContent = 'Senhas não coincidem ✗';
                    matchText.className = 'form-text text-danger';
                }
            }
        });
    }

    // Validação do formulário antes do envio
    const form = document.querySelector('form[asp-action="CadastrarUsuario"]');
    if (form) {
        form.addEventListener('submit', function (e) {
            // Verificar CPF
            const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
            if (cpf.length !== 11) {
                alert('CPF deve conter exatamente 11 dígitos.');
                document.getElementById('cpf').focus();
                e.preventDefault();
                return;
            }

            // Verificar se as senhas coincidem
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;

            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem. Por favor, verifique.');
                e.preventDefault();
                return;
            }

            // Se todas as validações passarem, o formulário será enviado normalmente
            // Removida a simulação de envio e o alerta de confirmação
        });
    }

    // Reset do contador de CPF quando o formulário for limpo
    const resetButton = document.querySelector('button[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function () {
            setTimeout(() => {
                const cpfCounter = document.getElementById('cpfCounter');
                if (cpfCounter) {
                    cpfCounter.textContent = '0/11 dígitos';
                    cpfCounter.classList.remove('warning');
                }

                // Resetar indicadores de senha
                const passwordStrength = document.getElementById('passwordStrength');
                if (passwordStrength) {
                    passwordStrength.style.width = '0%';
                }

                const passwordMatch = document.getElementById('passwordMatch');
                if (passwordMatch) {
                    passwordMatch.textContent = '';
                }
            }, 0);
        });
    }
});