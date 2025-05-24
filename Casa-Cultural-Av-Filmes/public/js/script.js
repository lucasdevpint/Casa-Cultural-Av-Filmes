// Em public/js/validacao.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formContato');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário
            let isValid = true;

            // Validação do Nome
            const nome = document.getElementById('nome');
            const nomeError = document.getElementById('nomeError');
            if (nome.value.trim() === '') {
                nomeError.textContent = 'O campo nome é obrigatório.';
                isValid = false;
            } else {
                nomeError.textContent = '';
            }

            // Validação do Email
            const email = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                emailError.textContent = 'O campo email é obrigatório.';
                isValid = false;
            } else if (!emailPattern.test(email.value.trim())) {
                emailError.textContent = 'Por favor, insira um email válido.';
                isValid = false;
            } else {
                emailError.textContent = '';
            }

            // Validação da Mensagem
            const mensagem = document.getElementById('mensagem');
            const mensagemError = document.getElementById('mensagemError');
            if (mensagem.value.trim() === '') {
                mensagemError.textContent = 'O campo mensagem é obrigatório.';
                isValid = false;
            } else {
                mensagemError.textContent = '';
            }

            if (isValid) {
                alert('Formulário enviado com sucesso! (Simulação)');
                // Aqui você poderia, futuramente, enviar os dados para um backend
                form.reset(); // Limpa o formulário
            } else {
                alert('Por favor, corrija os erros no formulário.');
            }
        });
    }
});