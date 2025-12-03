document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o conteúdo de todas as páginas
    renderJogosDoDia();
    renderOddDoDia();
    renderNbaPage(); 
    renderMultiplaDia(); 
    renderBingoPage(); 
    
    // Configura a navegação e o comportamento da Área VIP
    setupNavigation(); 
    setupVipArea();
    
    // Configura a interatividade dos cards de jogos (Futebol)
    setupGameCardToggle(); 
});

// =======================================================
// Funções de Renderização de Conteúdo
// =======================================================

function renderJogosDoDia() {
    const jogosLista = document.getElementById('jogosLista');
    if (!jogosLista) return;

    const jogosData = [
        { nome: "Arsenal x Brentford", liga: "🏆 Premier League | 16:30 BRT", odds: [1.45, 4.30, 6.50], palpite_unico: "Arsenal Vence Ambos os Tempos", odd_sugerida: 2.75 },
        { nome: "Liverpool x Sunderland", liga: "🏆 Premier League | 17:15 BRT", odds: [1.20, 5.80, 11.0], palpite_unico: "Mais de 10.5 Escanteios", odd_sugerida: 1.90 },
        { nome: "Union Berlin x Bayern", liga: "🏆 DFB-Pokal | 16:45 BRT", odds: [5.50, 4.20, 1.60], palpite_unico: "Ambos Marcam (SIM)", odd_sugerida: 1.85 },
        { nome: "Atlético-MG x Palmeiras", liga: "🇧🇷 Brasileirão Série A | 21:30 BRT", odds: [2.35, 3.10, 2.95], palpite_unico: "Vitória do Atlético-MG (ML)", odd_sugerida: 2.35 },
        { nome: "Flamengo x Ceará", liga: "🇧🇷 Brasileirão Série A | 21:30 BRT", odds: [1.50, 4.10, 5.80], palpite_unico: "Over 1.5 Gols FT", odd_sugerida: 1.35 },
    ];

    let htmlContent = '';
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
                
                <div class="palpite-sugerido"> 
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

function renderOddDoDia() {
    const oddDiaOdd = document.getElementById('oddDiaOdd');
    const oddDiaJogo = document.getElementById('oddDiaJogo');
    const oddDiaDesc = document.getElementById('oddDiaDesc');

    if (oddDiaOdd) oddDiaOdd.textContent = '1.72'; 
    if (oddDiaJogo) oddDiaJogo.textContent = 'Arsenal x Brentford';
    if (oddDiaDesc) oddDiaDesc.textContent = 'Palpite: Under 10.5 Corners';
}

function renderMultiplaDia() {
    const multiplaLista = document.getElementById('multiplaLista');
    if (!multiplaLista) return;

    // Dados de exemplo simplificados
    const multiplaFacil = [
        { nome: "Bragantino × Vitória", liga: "Brasileirão - Palpite: Under 2.5 Gols", odds: [1.80] },
        { nome: "Fortaleza × Corinthians", liga: "Brasileirão - Palpite: Under 2.5 Gols", odds: [1.72] },
    ];
    const oddFacil = 3.09; 
    
    const renderMultiplaSection = (titulo, oddTotal, descricao, data, estilo) => {
        let sectionHtml = `<div class="multipla-section">`;
        sectionHtml += `<h3 class="${estilo}">${titulo} (Odd Total: ${oddTotal.toFixed(2)})</h3>`;
        sectionHtml += `<p class="multipla-info">${descricao}</p>`;
        
        data.forEach(jogo => {
            sectionHtml += `
                <div class="jogo-card multipla-item">
                    <div class="info">
                        <strong>${jogo.nome}</strong>
                        <small>${jogo.liga}</small>
                    </div>
                    <div class="odds">
                        <span class="odd-btn">${jogo.odds[0].toFixed(2)}</span>
                    </div>
                </div>
            `;
        });

        sectionHtml += `
            <div style="margin-top: 10px; text-align: center;">
                <button class="multipla-btn ${estilo}-btn">COPIAR ${titulo.toUpperCase()}</button>
            </div>
        `;
        sectionHtml += `</div>`;
        return sectionHtml;
    };

    let htmlContent = renderMultiplaSection("Múltipla FÁCIL", oddFacil, "Baixo Risco: Foco em Under 2.5 Gols.", multiplaFacil, "facil");
    htmlContent += renderMultiplaSection("Múltipla MEDIANA", 5.52, "Risco Moderado: Equilíbrio entre BTTS e Overs.", multiplaFacil, "mediana");
    htmlContent += renderMultiplaSection("Múltipla OUSADA", 21.56, "Alto Risco: Palpites arriscados em Overs.", multiplaFacil, "ousada");

    multiplaLista.innerHTML = htmlContent;
}

function renderNbaPage() {
    const nbaLista = document.getElementById('nbaLista');
    if (!nbaLista) return;

    const allNbaGames = [
        { nome: "Oklahoma City x Golden State", liga: "01:00 BRT", odds: [1.90, 1.90] },
        { nome: "Portland x Cleveland", liga: "21:00 BRT", odds: [1.35, 3.10] },
        { nome: "Denver x Indiana", liga: "21:00 BRT", odds: [1.50, 2.70] },
    ];

    let htmlContent = '<h2>🏀 Jogos da NBA (Moneyline)</h2>';
    
    allNbaGames.forEach(jogo => {
        const [casa, fora] = jogo.nome.split(' x ');
        
        htmlContent += `
            <div class="jogo-card nba-item">
                <div class="info">
                    <strong>${casa} x ${fora}</strong>
                    <small>${jogo.liga}</small>
                </div>
                <div class="odds">
                    <span class="odd-btn odd-home" title="Vitória ${casa} (ML)">${jogo.odds[0].toFixed(2)}</span>
                    <span class="odd-btn odd-away" title="Vitória ${fora} (ML)">${jogo.odds[1].toFixed(2)}</span>
                </div>
            </div>
        `;
    });

    nbaLista.innerHTML = htmlContent;
}

function renderBingoPage() {
    const bingoContent = document.getElementById('bingoContent');
    if (!bingoContent) return;
    
    const htmlContent = `
        <div class="placeholder-content">
            <h2>🎰 BINGO: Grande Aposta da Semana!</h2>
            <p>Esta seção será reservada para uma Aposta Única de Altíssima Odd.</p>
        </div>
    `;

    bingoContent.innerHTML = htmlContent;
}

// =======================================================
// Funções de Interatividade e Login (INCLUINDO CONTEÚDO VIP)
// =======================================================

function setupGameCardToggle() {
    const jogosLista = document.getElementById('jogosLista');
    if (!jogosLista) return;

    jogosLista.addEventListener('click', (e) => {
        const card = e.target.closest('.jogo-card');
        if (!card) return; 
        const suggestion = card.querySelector('.palpite-sugerido');
        if (suggestion) {
            suggestion.classList.toggle('hidden');
        }
    });
}

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
            
            // Tratamento especial para a Área VIP
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

// FUNÇÃO ATUALIZADA PARA TRATAR A NAVEGAÇÃO VIP
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
        if (conteudoVipSection) {
            conteudoVipSection.style.display = 'block';
            renderVipContent(); // <-- CHAMA O CONTEÚDO VIP
        }
    } else {
        if (loginSection) loginSection.style.display = 'block';
    }
}

// FUNÇÃO ATUALIZADA PARA LOGIN E CARREGAMENTO DO CONTEÚDO
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

        // CHECK DE CREDENCIAIS (Antiga + Nova)
        const loginSuccess = (
            (username === 'camillo' && password === 'bets2025') ||
            (username === 'camillo22' && password === '19032011') // NOVO USUÁRIO
        );

        if (loginSuccess) {
            localStorage.setItem('isLoggedIn', 'true');
            loginErro.style.display = 'none';
            showPage('vip-content'); 
            renderVipContent(); // <-- CHAMA O CONTEÚDO VIP APÓS LOGIN
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

// CONTEÚDO DIDÁTICO DO MANUAL DE OURO
function renderVipContent() {
    const vipContent = document.getElementById('vip-content-body'); 
    if (!vipContent) return;

    const htmlContent = `
        <div class="vip-article">
            <h2>👑 O Manual de Ouro: Gestão de Banca (2025)</h2>
            <p>Este material é o pilar de qualquer apostador profissional. Siga as regras à risca para garantir lucro a longo prazo.</p>

            <h3>1. Quanto dinheiro colocar na banca inicial?</h3>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr><th>Perfil</th><th>Valor sugerido (R$)</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Iniciante / recreativo</td><td>300 – 1.000</td></tr>
                        <tr><td>Semi-profissional</td><td>2.000 – 10.000</td></tr>
                    </tbody>
                </table>
            </div>

            <h3>3. As 7 Regras Sagradas da Gestão de Banca</h3>
            <ul>
                <li>**1–2% por entrada:** Stake = 1–2% da banca atual.</li>
                <li>**Nunca faça “all-in”** ou “martingale”.</li>
                <li>Recalcule a stake a cada **7–10 dias**.</li>
                <li>Separe lucro todo mês (**regra 50/30/20**).</li>
                <li>Tenha **2 contas separadas** (Ativa e Reserva).</li>
                <li>Regra dos **100 unidades mínimas**.</li>
                <li>Pare se perder **20–25% da banca em um mês** (“Stop-loss mensal”).</li>
            </ul>

            <h3>4. Tabela Prática de Stakes (1% e 2%)</h3>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr><th>Banca Atual</th><th>Stake 1%</th><th>Stake 2%</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>R$ 1.000</td><td>R$ 10</td><td>R$ 20</td></tr>
                        <tr><td>R$ 5.000</td><td>R$ 50</td><td>R$ 100</td></tr>
                        <tr><td>R$ 10.000</td><td>R$ 100</td><td>R$ 200</td></tr>
                    </tbody>
                </table>
            </div>

            <h3>7. Checklist diário antes de apostar (Imprima!)</h3>
            <ul class="checklist">
                <li>⚫ Minha stake está correta?</li>
                <li>⚫ Estou *tiltado* ou querendo recuperar perdas?</li>
                <li>⚫ Já perdi 3 unidades hoje? → **PARE.**</li>
            </ul>
        </div>
