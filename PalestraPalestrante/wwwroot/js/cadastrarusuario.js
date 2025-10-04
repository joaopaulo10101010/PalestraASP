// Validação e formatação do CPF com limitador de 11 dígitos
document.getElementById('cpf').addEventListener('input', function (e) {
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
    counter.textContent = `${digitCount}/11 dígitos`;

    // Mudar cor do contador quando atingir o limite
    if (digitCount === 11) {
        counter.classList.add('warning');
    } else {
        counter.classList.remove('warning');
    }
});

// Prevenir entrada de mais de 14 caracteres (incluindo formatação)
document.getElementById('cpf').addEventListener('keydown', function (e) {
    const currentValue = this.value.replace(/\D/g, '');
    if (currentValue.length >= 11 &&
        e.key !== 'Backspace' &&
        e.key !== 'Delete' &&
        e.key !== 'Tab' &&
        !e.metaKey) {
        e.preventDefault();
    }
});

// Validação de força da senha
document.getElementById('senha').addEventListener('input', function () {
    const password = this.value;
    const strengthBar = document.getElementById('passwordStrength');
    let strength = 0;

    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;

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
});

// Validação de confirmação de senha
document.getElementById('confirmarSenha').addEventListener('input', function () {
    const senha = document.getElementById('senha').value;
    const confirmarSenha = this.value;
    const matchText = document.getElementById('passwordMatch');

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
});

// Validação do formulário
document.getElementById('cadastroForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Verificar CPF
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    if (cpf.length !== 11) {
        alert('CPF deve conter exatamente 11 dígitos.');
        document.getElementById('cpf').focus();
        return;
    }

    // Verificar se as senhas coincidem
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem. Por favor, verifique.');
        return;
    }

    // Simulação de envio
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processando...';
    submitBtn.disabled = true;

    setTimeout(() => {
        alert('Cadastro realizado com sucesso! Em breve você receberá um e-mail de confirmação.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        this.reset();

        // Resetar indicadores
        document.getElementById('passwordStrength').style.width = '0%';
        document.getElementById('passwordMatch').textContent = '';
        document.getElementById('cpfCounter').textContent = '0/11 dígitos';
        document.getElementById('cpfCounter').classList.remove('warning');
    }, 2000);
});

// Reset do contador de CPF quando o formulário for limpo
document.getElementById('cadastroForm').addEventListener('reset', function () {
    setTimeout(() => {
        document.getElementById('cpfCounter').textContent = '0/11 dígitos';
        document.getElementById('cpfCounter').classList.remove('warning');
    }, 0);
});