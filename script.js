document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o conteúdo de todas as páginas
    renderJogosDoDia();
    renderOddDoDia();
    renderNbaPage();
    renderMultiplaDia();
    renderBingoPage(); // MÚLTIPLA HIGH ODD 20+
    
    // Configura a navegação e o comportamento da Área VIP
    setupNavigation(); 
    setupVipArea();
    
    // NOVO: Configura a interatividade dos cards de jogos
    setupGameCardToggle(); 
});

// =======================================================
// Funções de Renderização de Conteúdo (Com Dados Atualizados)
// =======================================================

// A) RENDERIZA OS PRINCIPAIS JOGOS DO DIA (Agora com Palpite Sugerido)
function renderJogosDoDia() {
    const jogosLista = document.getElementById('jogosLista');
    if (!jogosLista) return;

    // Dados baseados nos jogos do dia 03 de Dezembro de 2025
    const jogosData = [
        // PREMIER LEAGUE
        { 
            nome: "Arsenal x Brentford", 
            liga: "Premier League - 16:30 BRT", 
            odds: [1.45, 4.30, 6.50],
            palpite_unico: "Arsenal Vence Ambos os Tempos", 
            odd_sugerida: 2.75 
        },
        { 
            nome: "Liverpool x Sunderland", 
            liga: "Premier League - 17:15 BRT", 
            odds: [1.20, 5.80, 11.0],
            palpite_unico: "Mais de 10.5 Escanteios", 
            odd_sugerida: 1.90 
        },
        // COPA DA ALEMANHA
        { 
            nome: "Union Berlin x Bayern", 
            liga: "DFB-Pokal - 16:45 BRT", 
            odds: [5.50, 4.20, 1.60],
            palpite_unico: "Ambos Marcam (SIM)", 
            odd_sugerida: 1.85 
        },
        // LA LIGA
        { 
            nome: "Athletic Bilbao x Real Madrid", 
            liga: "La Liga - 15:00 BRT", 
            odds: [3.10, 3.40, 2.15],
            palpite_unico: "Under 2.5 Gols", 
            odd_sugerida: 1.80 
        },
        // BRASILEIRÃO SÉRIE A
        { 
            nome: "Atlético-MG x Palmeiras", 
            liga: "Brasileirão - 21:30 BRT", 
            odds: [2.35, 3.10, 2.95],
            palpite_unico: "Vitória do Atlético-MG (ML)", 
            odd_sugerida: 2.35 
        },
        { 
            nome: "Flamengo x Ceará", 
            liga: "Brasileirão - 21:30 BRT", 
            odds: [1.50, 4.10, 5.80],
            palpite_unico: "Over 1.5 Gols FT", 
            odd_sugerida: 1.35 
        },
    ];

    let htmlContent = '';
    
    // Adiciona o aviso de interação no topo da seção
    htmlContent += '<p class="multipla-info" style="margin-bottom: 20px;">Clique em qualquer jogo para revelar a sugestão de aposta do dia!</p>';


    jogosData.forEach((jogo, index) => {
        htmlContent += `
            <div class="jogo-card" data-game-id="jogo-${index}">
                <div class="info">
                    <strong>${jogo.nome}</strong>
                    <small>${jogo.liga}</small>
                </div>
                <div class="odds">
                    <span class="odd-btn" title="Vitória Casa">${jogo.odds[0]}</span>
                    <span class="odd-btn" title="Empate">${jogo.odds[1]}</span>
                    <span class="odd-btn" title="Vitória Fora">${jogo.odds[2]}</span>
                </div>
                
                <div class="palpite-sugerido hidden"> 
                    <p>🔥 Sugestão do Dia Camillo Bets:</p>
                    <div class="palpite-box">
                        <span class="palpite-desc">${jogo.palpite_unico}</span>
                        <span class="odd-final">@ ${jogo.odd_sugerida}</span>
                    </div>
                </div>
            </div>
        `;
    });

    jogosLista.innerHTML = htmlContent;
}

// NOVO: Função para fazer o toggle do palpite sugerido
function setupGameCardToggle() {
    const jogosLista = document.getElementById('jogosLista');
    if (!jogosLista) return;

    jogosLista.addEventListener('click', (e) => {
        // Encontra o card do jogo clicado
        const card = e.target.closest('.jogo-card');
        if (!card) return; 

        // Encontra a sugestão dentro do card
        const suggestion = card.querySelector('.palpite-sugerido');
        if (suggestion) {
            // Alterna a classe 'hidden' para mostrar/esconder
            suggestion.classList.toggle('hidden');
        }
    });
}


// B) RENDERIZA A ODD DO DIA (Mantido)
function renderOddDoDia() {
    const oddDiaOdd = document.getElementById('oddDiaOdd');
    const oddDiaJogo = document.getElementById('oddDiaJogo');
    const oddDiaDesc = document.getElementById('oddDiaDesc');

    if (oddDiaOdd) oddDiaOdd.textContent = '1.72'; 
    if (oddDiaJogo) oddDiaJogo.textContent = 'Arsenal x Brentford';
    if (oddDiaDesc) oddDiaDesc.textContent = 'Palpite: Under 10.5 Corners';
}

// C) RENDERIZA A PÁGINA MÚLTIPLA DO DIA (Fácil - Baixo Risco - Mantido)
function renderMultiplaDia() {
    const multiplaLista = document.getElementById('multiplaLista');
    if (!multiplaLista) return;

    const multiplaData = [
        { nome: "Red Bull Bragantino × Vitória", liga: "Brasileirão - Palpite: Under 2.5 Gols", odds: [1.80] },
        { nome: "Fortaleza × Corinthians", liga: "Brasileirão - Palpite: Under 2.5 Gols", odds: [1.72] },
        { nome: "Bahia × Sport", liga: "Brasileirão - Palpite: Under 2.5 Gols", odds: [1.85] },
    ];
    
    const oddTotal = 5.71; 
    let htmlContent = `<h3>Palpites da Múltipla (Odd Total: ${oddTotal.toFixed(2)})</h3>`;
    htmlContent += '<p class="multipla-info" style="color: #66ff66;">🎯 BAILARINA: Múltipla de Baixo Risco. (70% under em H2H recentes)</p>';
    
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

// D) RENDERIZA A PÁGINA DEDICADA DA NBA (Mantido)
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
                    <span class="odd-btn odd-home" title="Vitória Casa">${jogo.odds[0]}</span>
                    <span class="odd-btn odd-away" title="Vitória Fora">${jogo.odds[1]}</span>
                </div>
            </div>
        `;
    });

    nbaLista.innerHTML = htmlContent;
}

// E) RENDERIZA A PÁGINA BINGO (MÚLTIPLA HIGH ODD - Mantido)
function renderBingoPage() {
    const bingoContent = document.getElementById('bingoContent');
    if (!bingoContent) return;

    const highOddMultipla = [
        { nome: "Juventude x Santos", liga: "Brasileirão - Palpite: Over 3.5 Gols", odd: 3.50 },
        { nome: "Juventude x Santos", liga: "Brasileirão - Palpite: Over 9.5 Corners", odd: 2.20 },
        { nome: "Bahia x Sport", liga: "Brasileirão - Palpite: Over 2.5 Gols", odd: 2.80 }
    ];
    
    const oddTotal = 21.56; 
    
    let htmlContent = `<h3 style="color: #00ff66;">🎯 MEGA ODD DO DIA: ${oddTotal.toFixed(2)}</h3>`;
    htmlContent += '<p class="multipla-info">🔥 HIGH STAKES: Múltipla de Alto Risco, focada em mercados de volume e placares abertos (Odd: ~21.56).</p>';
    
    htmlContent += '<h3>Jogos da Múltipla High Odd:</h3>';

    highOddMultipla.forEach(item => {
        htmlContent += `
            <div class="jogo-card multipla-high-odd-item">
                <div class="info">
                    <strong>${item.nome}</strong>
                    <small>${item.liga}</small>
                </div>
                <div class="odds">
                    <span class="odd-btn" style="background-color: #00ff66; color: #000;">${item.odd.toFixed(2)}</span>
                </div>
            </div>
        `;
    });
    
    htmlContent += `
        <div style="margin-top: 30px; text-align: center;">
            <button class="bingo-btn">COPIAR MÚLTIPLA (ODD ${oddTotal.toFixed(2)})</button>
        </div>
    `;

    bingoContent.innerHTML = htmlContent;
}


// Funções de Navegação e Área VIP (Mantidas)
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-item');
    const hideAllPages = () => {
        document.querySelectorAll('.page-content').forEach(page => page.style.display = 'none');
        navLinks.forEach(link => link.classList.remove('active'));
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const pageId = link.getAttribute('data-page');
            if (!pageId) return; 
            e.preventDefault();
            if (pageId === 'vip-login') {
                handleVipAreaClick(link);
                return;
            }
            hideAllPages();
            link.classList.add('active');
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
        if (conteudoVipSection) conteudoVipSection.style.display = 'block';
    } else {
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
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username === 'camillo' && password === 'bets2025') {
            localStorage.setItem('isLoggedIn', 'true');
            loginErro.style.display = 'none';
            showPage('vip-content'); 
        } else {
            loginErro.style.display = 'block';
        }
    });
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        showPage('jogos-dia');
        document.querySelector('[data-page="jogos-dia"]').classList.add('active');
        document.querySelector('[data-page="vip-login"]').classList.remove('active');
    });
}
