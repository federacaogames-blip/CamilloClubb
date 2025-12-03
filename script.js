document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o conteúdo ao carregar a página
    renderJogosDoDia();
    renderOddDoDia();
    renderNbaPage();
    renderMultiplaDia();
    renderBingoPage(); // NOVO: RENDERIZA O CONTEÚDO DO BINGO
    
    // Configura a navegação e o comportamento da Área VIP
    setupNavigation(); 
    setupVipArea();
});

// =======================================================
// Funções de Renderização de Conteúdo (Fictício)
// =======================================================

// A) RENDERIZA OS PRINCIPAIS JOGOS DO DIA
function renderJogosDoDia() {
    const jogosLista = document.getElementById('jogosLista');
    if (!jogosLista) return;

    const jogosData = [
        { nome: "Arsenal x Tottenham", liga: "Premier League - 03/12 15:00 (PALPITE)", odds: [1.8, 3.5, 4.1] },
        { nome: "Real Madrid x Barcelona", liga: "La Liga - 04/12 16:30 (PALPITE)", odds: [2.1, 3.4, 3.0] },
        { nome: "Flamengo x Palmeiras", liga: "Brasileirão - 05/12 21:00 (PALPITE)", odds: [2.3, 3.2, 2.8] },
        { nome: "Bayern x Dortmund", liga: "Bundesliga - 05/12 14:00 (PALPITE)", odds: [1.5, 4.5, 5.5] },
    ];

    let htmlContent = '';
    
    jogosData.forEach(jogo => {
        htmlContent += `
            <div class="jogo-card">
                <div class="info">
                    <strong>${jogo.nome}</strong>
                    <small>${jogo.liga}</small>
                </div>
                <div class="odds">
                    <span class="odd-btn">${jogo.odds[0]}</span>
                    <span class="odd-btn">${jogo.odds[1]}</span>
                    <span class="odd-btn">${jogo.odds[2]}</span>
                </div>
            </div>
        `;
    });

    jogosLista.innerHTML = htmlContent;
}

// B) RENDERIZA A ODD DO DIA
function renderOddDoDia() {
    const oddDiaOdd = document.getElementById('oddDiaOdd');
    const oddDiaJogo = document.getElementById('oddDiaJogo');
    const oddDiaDesc = document.getElementById('oddDiaDesc');

    if (oddDiaOdd) oddDiaOdd.textContent = '1.80';
    if (oddDiaJogo) oddDiaJogo.textContent = 'Arsenal x Tottenham';
    if (oddDiaDesc) oddDiaDesc.textContent = 'Vitória Simples do Arsenal (Palpite)';
}

// C) RENDERIZA A PÁGINA MÚLTIPLA DO DIA (Fictício)
function renderMultiplaDia() {
    const multiplaLista = document.getElementById('multiplaLista');
    if (!multiplaLista) return;

    const multiplaData = [
        { nome: "Corinthians x Santos", liga: "Brasileirão - Palpite: Mais de 1.5 Gols", odds: [1.45] },
        { nome: "PSG x Lyon", liga: "Ligue 1 - Palpite: Ambos Marcam", odds: [1.70] },
    ];
    
    let htmlContent = '<h3>Palpites da Múltipla (Odd Total: 2.46)</h3>';
    
    multiplaData.forEach(jogo => {
        htmlContent += `
            <div class="jogo-card multipla-item">
                <div class="info">
                    <strong>${jogo.nome}</strong>
                    <small>${jogo.liga}</small>
                </div>
                <div class="odds">
                    <span class="odd-btn">${jogo.odds[0]}</span>
                </div>
            </div>
        `;
    });

    multiplaLista.innerHTML = htmlContent;
}

// D) RENDERIZA A PÁGINA DEDICADA DA NBA (Fictício)
function renderNbaPage() {
    const nbaLista = document.getElementById('nbaLista');
    if (!nbaLista) return;

    const nbaData = [
        { nome: "Lakers x Celtics", liga: "NBA - 03/12 21:30 (Palpite: LAL ML)", odds: [1.85, 1.95] },
        { nome: "Bulls x Heat", liga: "NBA - 04/12 20:00 (Palpite: Under 220.5)", odds: [1.78, 2.02] },
        { nome: "Grizzlies x Warriors", liga: "NBA - 04/12 23:00 (Palpite: GS Warriors ML)", odds: [1.60, 2.20] },
    ];

    let htmlContent = '';
    
    nbaData.forEach(jogo => {
        htmlContent += `
            <div class="jogo-card nba-item">
                <div class="info">
                    <strong>${jogo.nome}</strong>
                    <small>${jogo.liga}</small>
                </div>
                <div class="odds">
                    <span class="odd-btn odd-home">${jogo.odds[0]}</span>
                    <span class="odd-btn odd-away">${jogo.odds[1]}</span>
                </div>
            </div>
        `;
    });

    nbaLista.innerHTML = htmlContent;
}

// E) RENDERIZA A PÁGINA BINGO (Fictício)
function renderBingoPage() {
    const bingoContent = document.getElementById('bingoContent');
    if (!bingoContent) return;

    // Conteúdo fictício para a página Bingo
    const bingoHtml = `
        <div class="bingo-card" style="background-color: #333; padding: 20px; border-radius: 8px; text-align: center;">
            <h3 style="color: #00ff00; margin-bottom: 10px; font-size: 1.5rem;">Próximo Sorteio: 22:00 BRT</h3>
            <p style="font-size: 1.2rem;">Seu número da sorte: <strong style="color: #ff0000; font-size: 2rem;">B-7</strong></p>
            <p style="margin-top: 10px;">Último Prêmio: <strong>R$ 500,00</strong> em créditos.</p>
        </div>
        <div style="margin-top: 30px; text-align: center;">
            <p style="margin-bottom: 15px;">Clique no botão abaixo para participar!</p>
            <button class="bingo-btn" style="background-color: #00ff00; color: #000; padding: 15px 30px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; font-size: 1.1rem; transition: background-color 0.2s;">PARTICIPAR DO BINGO</button>
        </div>
    `;

    bingoContent.innerHTML = bingoHtml;
}


// =======================================================
// Funções de Navegação e Área VIP
// =======================================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-item');
    
    // Função para esconder todas as páginas e desativar todos os links
    const hideAllPages = () => {
        document.querySelectorAll('.page-content').forEach(page => page.style.display = 'none');
        navLinks.forEach(link => link.classList.remove('active'));
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const pageId = link.getAttribute('data-page');

            // Ignora links sem data-page (Odd do Dia é uma âncora)
            if (!pageId) return; 

            e.preventDefault();
            
            // Lógica para Área VIP: precisa verificar se está logado
            if (pageId === 'vip-login') {
                handleVipAreaClick(link);
                return;
            }

            // Lógica para outras páginas
            hideAllPages();

            // Ativa o link clicado
            link.classList.add('active');
            
            // Mostra a página correspondente
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.style.display = 'block';
            }
        });
    });
}

function handleVipAreaClick(navLink) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginSection = document.getElementById('vip-login');
    const conteudoVipSection = document.getElementById('vip-content');

    const hideAllPages = () => {
        document.querySelectorAll('.page-content').forEach(page => page.style.display = 'none');
        document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
    };
    
    hideAllPages();
    navLink.classList.add('active');

    if (isLoggedIn) {
        // Se logado, mostra o conteúdo VIP
        if (conteudoVipSection) conteudoVipSection.style.display = 'block';
    } else {
        // Se não logado, mostra o formulário de login
        if (loginSection) loginSection.style.display = 'block';
    }
}


function setupVipArea() {
    const loginForm = document.getElementById('loginForm');
    const loginErro = document.getElementById('loginErro');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (!loginForm || !logoutBtn) return;
    
    const showPage = (pageId) => {
        document.querySelectorAll('.page-content').forEach(page => page.style.display = 'none');
        const targetPage = document.getElementById(pageId);
        if (targetPage) targetPage.style.display = 'block';
    };

    // Ação do login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulação de credenciais
        if (username === 'camillo' && password === 'bets2025') {
            localStorage.setItem('isLoggedIn', 'true');
            loginErro.style.display = 'none';
            showPage('vip-content'); // Vai para o conteúdo VIP
        } else {
            loginErro.style.display = 'block';
        }
    });

    // Ação do logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        // Redireciona para a página de jogos do dia após o logout
        showPage('jogos-dia');
        document.querySelector('[data-page="jogos-dia"]').classList.add('active');
        document.querySelector('[data-page="vip-login"]').classList.remove('active');
    });
}
