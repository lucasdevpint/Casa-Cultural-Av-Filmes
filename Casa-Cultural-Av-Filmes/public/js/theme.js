// js/theme.js
function alterarTema(temaEscolhido) {
    document.cookie = "tema=" + temaEscolhido + ";path=/;max-age=" + (60 * 60 * 24 * 30); // Cookie por 30 dias
    aplicarTema(temaEscolhido);
}

function aplicarTema(tema) {
    // Remove classes de tema anteriores para evitar conflitos
    document.body.classList.remove("tema-claro", "tema-escuro");

    if (tema === "escuro") {
        document.body.classList.add("tema-escuro");
    } else {
        document.body.classList.add("tema-claro"); // Padrão é o tema claro
    }
}

function lerCookie(nome) {
    const nomeEQ = nome + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nomeEQ) === 0) return c.substring(nomeEQ.length, c.length);
    }
    return null; // Retorna null se o cookie não for encontrado
}

window.onload = function() {
    const temaSalvo = lerCookie("tema");
    if (temaSalvo) {
        aplicarTema(temaSalvo);
    } else {
        aplicarTema("claro"); // Aplica tema claro como padrão se não houver cookie
    }
};

function alterarTema(temaEscolhido) {
    // Salva a preferência do tema em um cookie que expira em 30 dias
    document.cookie = "tema=" + temaEscolhido + ";path=/;max-age=" + (60 * 60 * 24 * 30); 
    aplicarTema(temaEscolhido); // Aplica o tema imediatamente
}

function aplicarTema(tema) {
    // Remove classes de tema anteriores para garantir que apenas uma seja aplicada
    document.body.classList.remove("tema-claro", "tema-escuro");

    if (tema === "escuro") {
        document.body.classList.add("tema-escuro");
    } else {
        document.body.classList.add("tema-claro"); // O tema claro é o padrão
    }
}

function lerCookie(nome) {
    const nomeEQ = nome + "=";
    const ca = document.cookie.split(';'); // Divide a string de cookies em um array
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length); // Remove espaços em branco
        if (c.indexOf(nomeEQ) === 0) return c.substring(nomeEQ.length, c.length); // Retorna o valor do cookie
    }
    return null; // Retorna null se o cookie não for encontrado
}

// Event listener para aplicar o tema salvo quando a página é totalmente carregada
window.addEventListener('load', function() {
    const temaSalvo = lerCookie("tema"); // Lê o cookie 'tema'
    if (temaSalvo) {
        aplicarTema(temaSalvo); // Aplica o tema salvo
    } else {
        aplicarTema("claro"); // Aplica o tema claro como padrão se nenhum cookie for encontrado
    }
});