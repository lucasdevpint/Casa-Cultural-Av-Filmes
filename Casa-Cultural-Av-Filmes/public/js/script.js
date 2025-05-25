// js/script.js

// --- DADOS MOCK (Simulação de um banco de dados) ---
// Usamos 'let' para mockFilmes para permitir que o array seja modificado (ex: ao deletar um filme)
let mockFilmes = [
    {
        id: 1,
        titulo: "A Incrível Jornada Cósmica",
        genero: "Ficção Científica, Aventura",
        diretor: "Jane Stellaris",
        ano: 2023,
        duracao: "145 min",
        sinopseCompleta: "No ano de 2242, a Terra enfrenta uma crise energética sem precedentes. Uma equipe destemida de astronautas e cientistas embarca na nave 'Odisséia' em uma missão perigosa rumo à nebulosa de Andrômeda. Seu objetivo: encontrar um planeta habitável e garantir o futuro da humanidade. Mas o que eles descobrem vai além de sua imaginação, desafiando suas crenças sobre o universo e seu próprio lugar nele. Efeitos visuais espetaculares e uma trama cheia de reviravoltas.",
        descricaoCurta: "Uma épica aventura através de galáxias desconhecidas.",
        imagemBanner: "images/banner_filme1.jpg",
        imagemPoster: "images/banner_filme1.jpg", // Pode ser uma imagem diferente para a página de detalhes
        avaliacaoMedia: 4.5,
        totalAvaliacoes: 180,
        avaliacoes: [
            { idAnalise: 101, usuario: "CineAmante_01", nota: 5, comentario: "Visualmente deslumbrante e uma história cativante! Imperdível." },
            { idAnalise: 102, usuario: "EstrelaFilmes", nota: 4, comentario: "Gostei muito, mas o final poderia ser um pouco diferente. Bons efeitos!" },
        ]
    },
    {
        id: 2,
        titulo: "O Segredo do Vale Esquecido",
        genero: "Mistério, Drama, Suspense",
        diretor: "Arthur Pendelton",
        ano: 2022,
        duracao: "122 min",
        sinopseCompleta: "Quando uma renomada arqueóloga desaparece no remoto Vale das Brumas, seu cético irmão, um jornalista investigativo, parte em sua busca. Ele se depara com uma comunidade isolada, cheia de segredos ancestrais e lendas obscuras. Quanto mais fundo ele cava, mais perigosa a verdade se torna, forçando-o a questionar tudo o que sabe sobre o mundo e sua própria sanidade.",
        descricaoCurta: "Detetives investigam um desaparecimento misterioso.",
        imagemBanner: "images/banner_filme_placeholder.png",
        imagemPoster: "images/banner_filme_placeholder.png",
        avaliacaoMedia: 4.2,
        totalAvaliacoes: 125,
        avaliacoes: [
            { idAnalise: 201, usuario: "Detetive Literário", nota: 4, comentario: "Trama envolvente e um final surpreendente. Me prendeu do início ao fim!" },
        ]
    },
    {
        id: 3,
        titulo: "Cozinhando com Estrelas",
        genero: "Comédia, Romance",
        diretor: "Isabelle Gourmet",
        ano: 2024,
        duracao: "105 min",
        sinopseCompleta: "Leo, um chef de food truck talentoso mas azarado, e Sofia, uma crítica gastronômica renomada e temida, têm seus destinos entrelaçados por um concurso culinário inesperado. Entre panelas e temperos, eles descobrem que a rivalidade pode dar lugar a sentimentos mais doces, mas não sem uma boa dose de desastres cômicos e pratos deliciosos.",
        descricaoCurta: "Dois chefs rivais descobrem a receita para o amor.",
        imagemBanner: "images/banner_filme_placeholder.png",
        imagemPoster: "images/banner_filme_placeholder.png",
        avaliacaoMedia: 3.8,
        totalAvaliacoes: 95,
        avaliacoes: [] // Começa sem avaliações, podem ser adicionadas pela simulação
    }
    // Adicione mais filmes aqui se desejar
];
// Para gerar IDs únicos para novos filmes (simulação)
let proximoIdFilme = mockFilmes.length > 0 ? Math.max(...mockFilmes.map(f => f.id)) + 1 : 1;
// Para gerar IDs únicos para novas análises (simulação)
let proximoIdAnalise = 300; // Inicia de um número alto para não colidir com IDs de exemplo


// --- FUNÇÕES GLOBAIS AUXILIARES ---
function getParametroUrl(nomeParametro) {
    const parametrosUrl = new URLSearchParams(window.location.search);
    return parametrosUrl.get(nomeParametro);
}

function encontrarFilmePorId(id) {
    // O ID da URL vem como string, então convertemos para número para comparar
    return mockFilmes.find(filme => filme.id === parseInt(id));
}

function gerarEstrelasVisualizacao(avaliacao) {
    const totalEstrelas = 5;
    let estrelasHtml = '';
    const estrelasCheias = Math.floor(avaliacao);
    const meiaEstrela = (avaliacao % 1) >= 0.5; // Verifica se há meia estrela

    for (let i = 0; i < estrelasCheias; i++) {
        estrelasHtml += '⭐'; // Estrela cheia
    }
    if (meiaEstrela) {
        estrelasHtml += '✨'; // Simulação de meia estrela (ou use um ícone/CSS específico)
    }
    const estrelasVazias = totalEstrelas - estrelasCheias - (meiaEstrela ? 1 : 0);
    for (let i = 0; i < estrelasVazias; i++) {
        estrelasHtml += '☆'; // Estrela vazia
    }
    return estrelasHtml;
}

function atualizarAnoRodape() {
    const anoSpan = document.getElementById('currentYear');
    if (anoSpan) {
        anoSpan.textContent = new Date().getFullYear();
    }
}

// --- FUNÇÕES DE RENDERIZAÇÃO (Atualizam o HTML da página) ---
function renderizarCatalogoFilmes() {
    const container = document.getElementById('catalogo-filmes-container');
    // Se o container não existir nesta página, não faz nada
    if (!container) return;

    if (mockFilmes.length === 0) {
        container.innerHTML = '<p>Nenhum filme encontrado no catálogo no momento.</p>';
        return;
    }

    let htmlFilmes = '';
    mockFilmes.forEach(filme => {
        htmlFilmes += `
            <article class="filme-card">
                <img src="${filme.imagemBanner || 'images/banner_filme_placeholder.png'}" alt="Banner do filme ${filme.titulo}">
                <div class="filme-info">
                    <h3>${filme.titulo}</h3>
                    <p class="genero"><strong>Gênero:</strong> ${filme.genero}</p>
                    <p class="descricao">${filme.descricaoCurta}</p>
                    <div class="avaliacao">
                        <span class="estrelas">${gerarEstrelasVisualizacao(filme.avaliacaoMedia)}</span>
                        <span class="nota">${filme.avaliacaoMedia.toFixed(1)}</span> 
                        (<span class="total-avaliacoes">${filme.totalAvaliacoes}</span> avaliações)
                    </div>
                    <div class="card-actions">
                        <a href="detalhes_filme.html?id=${filme.id}" class="btn btn-detalhes">Ver Detalhes</a>
                        <button onclick="iniciarEdicaoFilme(${filme.id})" class="btn btn-editar">Editar</button>
                        <button onclick="confirmarDelecaoFilme(${filme.id})" class="btn btn-deletar">Deletar</button>
                    </div>
                </div>
            </article>
        `;
    });
    container.innerHTML = htmlFilmes;
}

function renderizarDetalhesDoFilme(filmeId) {
    const containerDetalhes = document.getElementById('detalhes-do-filme-container');
    const containerAvaliacoesComunidade = document.getElementById('lista-avaliacoes-filme');
    
    // Se os containers não existirem nesta página, não faz nada
    if (!containerDetalhes || !containerAvaliacoesComunidade) return;

    const filme = encontrarFilmePorId(filmeId);

    if (!filme) {
        containerDetalhes.innerHTML = "<p>Filme não encontrado.</p>";
        containerAvaliacoesComunidade.innerHTML = ""; // Limpa a área de avaliações
        document.title = "Filme Não Encontrado - Casa Cultural Av. Filmes"; // Atualiza título da aba
        const secaoSuaAvaliacao = document.getElementById('sua-avaliacao-secao');
        if(secaoSuaAvaliacao) secaoSuaAvaliacao.style.display = 'none'; // Esconde seção de avaliação se filme não encontrado
        return;
    }

    // Atualiza o título da aba do navegador
    document.title = `${filme.titulo} - Casa Cultural Av. Filmes`;

    // Preenche os detalhes do filme
    containerDetalhes.innerHTML = `
        <article class="filme-detalhe-item">
            <div class="filme-detalhe-cabecalho">
                <h2>${filme.titulo}</h2>
                <div class="avaliacao-detalhe">
                    ${gerarEstrelasVisualizacao(filme.avaliacaoMedia)} (${filme.avaliacaoMedia.toFixed(1)} de ${filme.totalAvaliacoes} avaliações)
                </div>
            </div>
            <div class="filme-detalhe-corpo">
                <img src="${filme.imagemPoster || filme.imagemBanner || 'images/banner_filme_placeholder.png'}" alt="Pôster do filme ${filme.titulo}" class="poster-detalhe">
                <div class="info-texto-detalhe">
                    <p><strong>Gênero:</strong> ${filme.genero}</p>
                    <p><strong>Diretor:</strong> ${filme.diretor}</p>
                    <p><strong>Ano:</strong> ${filme.ano}</p>
                    <p><strong>Duração:</strong> ${filme.duracao}</p>
                    <h3>Sinopse:</h3>
                    <p>${filme.sinopseCompleta}</p>
                     <div class="detail-actions">
                        <button onclick="iniciarEdicaoFilme(${filme.id}, true)" class="btn btn-editar">Editar Detalhes do Filme</button>
                    </div>
                </div>
            </div>
        </article>
    `;
    // Garante que a seção de avaliação seja exibida se o filme for encontrado
    const secaoSuaAvaliacao = document.getElementById('sua-avaliacao-secao');
    if(secaoSuaAvaliacao) secaoSuaAvaliacao.style.display = 'block';

    // Renderiza as avaliações da comunidade para este filme
    renderizarAvaliacoesDaComunidade(filme);
}

function renderizarAvaliacoesDaComunidade(filme) {
    const containerAvaliacoesComunidade = document.getElementById('lista-avaliacoes-filme');
    // Se o container não existir ou não houver filme, não faz nada
    if (!containerAvaliacoesComunidade || !filme) return;

    if (filme.avaliacoes && filme.avaliacoes.length > 0) {
        let htmlAvaliacoes = '';
        // Itera em ordem reversa para mostrar as mais recentes primeiro (opcional)
        filme.avaliacoes.slice().reverse().forEach(avaliacao => {
            htmlAvaliacoes += `
                <div class="avaliacao-item">
                    <h4>${avaliacao.usuario || "Anônimo"} - <span class="nota-avaliacao">${gerarEstrelasVisualizacao(avaliacao.nota)} (${avaliacao.nota})</span></h4>
                    <p>"${avaliacao.comentario}"</p>
                    <div class="avaliacao-actions">
                        <button onclick="iniciarEdicaoAnalise(${filme.id}, ${avaliacao.idAnalise})" class="btn-acao-analise btn-editar-analise">Editar</button>
                        <button onclick="confirmarDelecaoAnalise(${filme.id}, ${avaliacao.idAnalise})" class="btn-acao-analise btn-deletar-analise">Excluir</button>
                    </div>
                </div>
            `;
        });
        containerAvaliacoesComunidade.innerHTML = htmlAvaliacoes;
    } else {
        containerAvaliacoesComunidade.innerHTML = '<p>Ainda não há avaliações para este filme. Seja o primeiro!</p>';
    }
}


// --- FUNÇÕES DE AÇÃO (Simulação de Edição, Deleção, Submissão) ---
// Estas funções são chamadas por 'onclick' no HTML gerado, por isso são anexadas ao objeto 'window'
// para garantir que estejam no escopo global quando o HTML for interpretado.

window.iniciarEdicaoFilme = function(filmeId, naPaginaDeDetalhes = false) {
    const filmeParaEditar = encontrarFilmePorId(filmeId);
    if (!filmeParaEditar) {
        alert("Erro: Filme não encontrado para edição.");
        return;
    }

    const novoTitulo = prompt("Digite o novo título do filme:", filmeParaEditar.titulo);
    if (novoTitulo === null) return; // Usuário cancelou o prompt

    const novaDescricaoCurta = prompt("Digite a nova descrição curta:", filmeParaEditar.descricaoCurta);
    if (novaDescricaoCurta === null) return; 
    
    const novoGenero = prompt("Digite o(s) novo(s) gênero(s):", filmeParaEditar.genero);
    if (novoGenero === null) return;

    // Poderia adicionar prompts para outros campos: diretor, ano, sinopseCompleta, imagemBanner, imagemPoster

    if (!novoTitulo.trim() || !novaDescricaoCurta.trim() || !novoGenero.trim()) {
        alert("Título, descrição curta e gênero são obrigatórios.");
        return;
    }

    // Atualiza o objeto filme no array mockFilmes
    filmeParaEditar.titulo = novoTitulo.trim();
    filmeParaEditar.descricaoCurta = novaDescricaoCurta.trim();
    filmeParaEditar.genero = novoGenero.trim();
    // Atualize outros campos aqui se adicionou prompts para eles

    alert("Filme atualizado (simulação)! Os dados foram alterados apenas nesta sessão do navegador.");

    // Re-renderiza a visualização para refletir as mudanças
    if (naPaginaDeDetalhes) {
        renderizarDetalhesDoFilme(filmeId); // Se estiver na página de detalhes, atualiza ela
    } else {
        renderizarCatalogoFilmes(); // Se estiver no catálogo, atualiza o catálogo
    }
}

window.confirmarDelecaoFilme = function(filmeId) {
    const filmeParaDeletar = encontrarFilmePorId(filmeId);
    if (!filmeParaDeletar) {
        alert("Erro: Filme não encontrado para deleção.");
        return;
    }

    if (confirm(`Tem certeza que deseja excluir o filme "${filmeParaDeletar.titulo}"? Esta ação é apenas uma simulação para esta sessão.`)) {
        // Filtra o array, mantendo todos os filmes EXCETO o que tem o filmeId correspondente
        mockFilmes = mockFilmes.filter(filme => filme.id !== filmeId);
        alert(`Filme "${filmeParaDeletar.titulo}" deletado (simulação)!`);
        
        // Verifica se estamos na página de catálogo para re-renderizar
        if (document.getElementById('catalogo-filmes-container')) {
            renderizarCatalogoFilmes();
        }
        
        // Verifica se estamos na página de detalhes do filme que acabou de ser deletado
        const idFilmeAtualNaUrl = getParametroUrl('id');
        if (idFilmeAtualNaUrl && parseInt(idFilmeAtualNaUrl) === filmeId) {
            const containerDetalhes = document.getElementById('detalhes-do-filme-container');
            const containerAvaliacoesComunidade = document.getElementById('lista-avaliacoes-filme');
            const secaoSuaAvaliacao = document.getElementById('sua-avaliacao-secao');

            if(containerDetalhes) containerDetalhes.innerHTML = `<p>O filme "${filmeParaDeletar.titulo}" foi removido do catálogo (simulação).</p><a href="filmes.html" class="btn">Voltar ao catálogo</a>`;
            if(containerAvaliacoesComunidade) containerAvaliacoesComunidade.innerHTML = "";
            if(secaoSuaAvaliacao) secaoSuaAvaliacao.style.display = 'none';
            document.title = "Filme Removido - Casa Cultural Av. Filmes";
        }
    }
}

window.iniciarEdicaoAnalise = function(filmeId, idAnalise) {
    const filme = encontrarFilmePorId(filmeId);
    if (!filme || !filme.avaliacoes) {
        alert("Erro: Filme ou lista de avaliações não encontrados.");
        return;
    }

    const analiseParaEditar = filme.avaliacoes.find(a => a.idAnalise === idAnalise);
    if (!analiseParaEditar) {
        alert("Erro: Análise não encontrada para edição.");
        return;
    }

    const novoComentario = prompt("Edite seu comentário:", analiseParaEditar.comentario);
    if (novoComentario === null) return; // Usuário cancelou

    const novaNotaStr = prompt(`Edite sua nota (1-5) para esta análise:`, analiseParaEditar.nota);
    if (novaNotaStr === null) return;

    const novaNota = parseInt(novaNotaStr);
    if (isNaN(novaNota) || novaNota < 1 || novaNota > 5) {
        alert("Nota inválida. Por favor, insira um número entre 1 e 5.");
        return;
    }

    if (!novoComentario.trim()) {
        alert("O comentário não pode ficar vazio.");
        return;
    }
    
    // Atualiza a análise dentro do array de avaliações do filme
    analiseParaEditar.comentario = novoComentario.trim();
    analiseParaEditar.nota = novaNota;

    alert("Análise atualizada (simulação)!");
    // Re-renderiza apenas a seção de detalhes do filme (que inclui as avaliações)
    renderizarDetalhesDoFilme(filmeId); 
}

window.confirmarDelecaoAnalise = function(filmeId, idAnalise) {
    const filme = encontrarFilmePorId(filmeId);
    if (!filme || !filme.avaliacoes) {
        alert("Erro: Filme ou lista de avaliações não encontrados.");
        return;
    }

    const analiseParaDeletar = filme.avaliacoes.find(a => a.idAnalise === idAnalise);
    if (!analiseParaDeletar) {
        alert("Erro: Análise não encontrada para deleção.");
        return;
    }

    if (confirm(`Tem certeza que deseja excluir esta análise de "${analiseParaDeletar.usuario || 'Anônimo'}"? Esta ação é apenas uma simulação.`)) {
        // Filtra o array de avaliações do filme, removendo a análise específica
        filme.avaliacoes = filme.avaliacoes.filter(a => a.idAnalise !== idAnalise);
        alert("Análise deletada (simulação)!");
        // Re-renderiza os detalhes do filme para mostrar a lista de análises atualizada
        renderizarDetalhesDoFilme(filmeId);
    }
}

// --- LÓGICA PARA CADASTRO DE NOVO FILME (form_novo_filme.html) ---
function lidarComCadastroNovoFilme(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    const statusDiv = document.getElementById('status-cadastro-filme');

    // Coleta os dados do formulário
    const titulo = document.getElementById('titulo').value.trim();
    const genero = document.getElementById('genero').value.trim();
    const diretor = document.getElementById('diretor').value.trim();
    const anoStr = document.getElementById('ano').value;
    const ano = anoStr ? parseInt(anoStr) : null;
    const duracao = document.getElementById('duracao').value.trim();
    const descricaoCurta = document.getElementById('descricaoCurta').value.trim();
    const sinopseCompleta = document.getElementById('sinopseCompleta').value.trim();
    const imagemBanner = document.getElementById('imagemBanner').value.trim() || 'images/banner_filme_placeholder.png';
    const imagemPoster = document.getElementById('imagemPoster').value.trim() || 'images/banner_filme_placeholder.png';

    // Validação simples
    if (!titulo || !genero || !descricaoCurta) {
        statusDiv.textContent = "Título, Gênero e Descrição Curta são obrigatórios.";
        statusDiv.className = "status-mensagem erro";
        return;
    }
    if (anoStr && (isNaN(ano) || ano < 1888 || ano > new Date().getFullYear() + 5) ) { // Validação simples do ano
        statusDiv.textContent = "Ano de lançamento inválido.";
        statusDiv.className = "status-mensagem erro";
        return;
    }


    // Cria o novo objeto filme
    const novoFilme = {
        id: proximoIdFilme++, // Usa e incrementa o próximo ID disponível
        titulo,
        genero,
        diretor: diretor || "Não informado", // Valor padrão se vazio
        ano: ano,
        duracao: duracao || "Não informada", // Valor padrão se vazio
        descricaoCurta,
        sinopseCompleta: sinopseCompleta || "Sinopse não disponível.", // Valor padrão
        imagemBanner,
        imagemPoster,
        avaliacaoMedia: 0, // Novo filme começa sem avaliação
        totalAvaliacoes: 0,
        avaliacoes: []
    };

    mockFilmes.push(novoFilme); // Adiciona o novo filme ao array (simulação)

    statusDiv.textContent = `Filme "${titulo}" adicionado com sucesso (Simulação)! Ele aparecerá no catálogo durante esta sessão.`;
    statusDiv.className = "status-mensagem sucesso";
    document.getElementById('form-cadastro-filme').reset(); // Limpa o formulário
    
    console.log("Filmes após adição:", mockFilmes); // Para depuração
}


// --- EVENT LISTENERS E INICIALIZAÇÃO PRINCIPAL ---
document.addEventListener('DOMContentLoaded', function() {
    console.log("script.js carregado e DOM pronto!");
    atualizarAnoRodape(); // Atualiza o ano no rodapé em todas as páginas

    // Lógica específica da página de filmes (renderiza o catálogo)
    if (document.getElementById('catalogo-filmes-container')) {
        renderizarCatalogoFilmes();
    }

    // Lógica específica da página de detalhes do filme
    const containerDetalhesFilme = document.getElementById('detalhes-do-filme-container');
    if (containerDetalhesFilme) {
        const filmeIdDaUrl = getParametroUrl('id'); // Pega o ID do filme da URL
        if (filmeIdDaUrl) {
            renderizarDetalhesDoFilme(filmeIdDaUrl); // Renderiza os detalhes e avaliações
        } else {
            // Se não houver ID, mostra uma mensagem de erro
            containerDetalhesFilme.innerHTML = "<p>ID do filme não especificado na URL. Volte ao <a href='filmes.html'>catálogo</a> e selecione um filme.</p>";
            const secaoSuaAvaliacao = document.getElementById('sua-avaliacao-secao');
            if(secaoSuaAvaliacao) secaoSuaAvaliacao.style.display = 'none';
            const containerAvaliacoesComunidade = document.getElementById('lista-avaliacoes-filme');
            if(containerAvaliacoesComunidade) containerAvaliacoesComunidade.innerHTML = "";
        }

        // Configuração das estrelas interativas para o formulário de nova avaliação
        const estrelasInputContainer = document.getElementById('estrelas-input');
        if (estrelasInputContainer) {
            const valorNotaHidden = document.getElementById('avaliacao-nota-valor');
            const todasAsEstrelas = estrelasInputContainer.querySelectorAll('.estrela');
            todasAsEstrelas.forEach(estrela => {
                estrela.addEventListener('click', function() {
                    const valorSelecionado = parseInt(this.dataset.valor);
                    if (valorNotaHidden) valorNotaHidden.value = valorSelecionado;
                    estrelasInputContainer.dataset.nota = valorSelecionado;
                    todasAsEstrelas.forEach(s => {
                        s.textContent = (parseInt(s.dataset.valor) <= valorSelecionado) ? '⭐' : '☆';
                    });
                });
                estrela.addEventListener('mouseover', function() {
                    const valorHover = parseInt(this.dataset.valor);
                    todasAsEstrelas.forEach(s => {
                        s.textContent = (parseInt(s.dataset.valor) <= valorHover) ? '⭐' : '☆';
                    });
                });
                estrela.addEventListener('mouseout', function() { 
                    const valorAtual = parseInt(estrelasInputContainer.dataset.nota) || 0;
                    todasAsEstrelas.forEach(s => {
                        s.textContent = (parseInt(s.dataset.valor) <= valorAtual) ? '⭐' : '☆';
                    });
                });
            });
        }

        // Simulação de envio do formulário de nova avaliação
        const formNovaAvaliacao = document.getElementById('form-nova-avaliacao');
        if (formNovaAvaliacao) {
            formNovaAvaliacao.addEventListener('submit', function(event) {
                event.preventDefault(); // Impede o envio padrão do formulário
                const filmeIdAtual = getParametroUrl('id');
                const filme = encontrarFilmePorId(filmeIdAtual);

                const nota = document.getElementById('avaliacao-nota-valor').value;
                const nomeUsuario = document.getElementById('avaliacao-nome').value.trim() || "Anônimo";
                const comentario = document.getElementById('avaliacao-comentario').value.trim();
                const statusDiv = document.getElementById('status-avaliacao');

                if (!filme) { 
                     statusDiv.textContent = "Erro: Filme não encontrado para adicionar avaliação.";
                     statusDiv.className = "status-mensagem erro";
                     return;
                }
                if (!nota || nota === "0") {
                    statusDiv.textContent = "Por favor, selecione uma nota (clicando nas estrelas).";
                    statusDiv.className = "status-mensagem erro";
                    return;
                }
                if (comentario === "") {
                    statusDiv.textContent = "Por favor, escreva um comentário.";
                    statusDiv.className = "status-mensagem erro";
                    return;
                }

                // Cria o objeto da nova avaliação (simulada)
                const novaAvaliacao = {
                    idAnalise: proximoIdAnalise++, // Gera um ID único para a análise
                    usuario: nomeUsuario,
                    nota: parseInt(nota),
                    comentario: comentario
                };
                // Adiciona a nova avaliação ao array 'avaliacoes' do filme correspondente
                filme.avaliacoes.push(novaAvaliacao); 

                statusDiv.textContent = `Obrigado, ${nomeUsuario}! Sua avaliação foi registrada (Simulação).`;
                statusDiv.className = "status-mensagem sucesso";
                
                // Re-renderiza a lista de avaliações da comunidade para incluir a nova
                renderizarAvaliacoesDaComunidade(filme); 
                
                // Limpa o formulário após o envio
                formNovaAvaliacao.reset();
                // Reseta o estado visual e o valor das estrelas
                const estrelasInputReset = document.getElementById('estrelas-input');
                if (estrelasInputReset) estrelasInputReset.dataset.nota = "0";
                
                const notaValorHiddenReset = document.getElementById('avaliacao-nota-valor');
                if (notaValorHiddenReset) notaValorHiddenReset.value = "";
                
                const todasEstrelasReset = document.querySelectorAll('#estrelas-input .estrela');
                if (todasEstrelasReset) todasEstrelasReset.forEach(s => s.textContent = '☆');
            });
        }
    }

    // Lógica para o formulário de cadastro de novo filme (form_novo_filme.html)
    const formCadastroFilme = document.getElementById('form-cadastro-filme');
    if (formCadastroFilme) {
        formCadastroFilme.addEventListener('submit', lidarComCadastroNovoFilme);
    }
});