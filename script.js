document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o conteúdo de todas as páginas
    renderJogosDoDia();
    renderOddDoDia();
    renderNbaPage(); // Renderiza a página da NBA com as múltiplas
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

// A) RENDERIZA OS PRINCIPAIS JOGOS DO DIA (FUTEBOL)
function renderJogosDoDia() {
    const jogosLista = document.getElementById('jogosLista');
    if (!jogosLista) return;

    const jogosData = [
        // PREMIER LEAGUE
        { 
            nome: "Arsenal x Brentford", 
            liga: "🏆 Premier League | 16:30 BRT", 
            odds: [1.45, 4.30, 6.50],
            palpite_unico: "Arsenal Vence Ambos os Tempos", 
            odd_sugerida: 2.75 
        },
        { 
            nome: "Liverpool x Sunderland", 
            liga: "🏆 Premier League | 17:15 BRT", 
            odds: [1.20, 5.80, 11.0],
            palpite_unico: "Mais de 10.5 Escanteios", 
            odd_sugerida: 1.90 
        },
        // COPA DA ALEMANHA
        { 
            nome: "Union Berlin x Bayern", 
            liga: "🏆 DFB-Pokal | 16:45 BRT", 
            odds: [5.50, 4.20, 1.60],
            palpite_unico: "Ambos Marcam (SIM)", 
            odd_sugerida: 1.85 
        },
        // LA LIGA
        { 
            nome: "Athletic Bilbao x Real Madrid", 
            liga: "🏆 La Liga | 15:00 BRT", 
            odds: [3.10, 3.40, 2.15],
            palpite_unico: "Under 2.5 Gols", 
            odd_sugerida: 1.80 
        },
        // BRASILEIRÃO SÉRIE A
        { 
            nome: "Atlético-MG x Palmeiras", 
            liga: "🇧🇷 Brasileirão Série A | 21:30 BRT", 
            odds: [2.35, 3.10, 2.95],
            palpite_unico: "Vitória do Atlético-MG (ML)", 
            odd_sugerida: 2.35 
        },
        { 
            nome: "Flamengo x Ceará", 
            liga: "🇧🇷 Brasileirão Série A | 21:30 BRT", 
            odds: [1.50, 4.10, 5.80],
            palpite_unico: "Over 1.5 Gols FT", 
            odd_sugerida: 1.35 
        },
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

// B) RENDERIZA A ODD DO DIA
function renderOddDoDia() {
    const oddDiaOdd = document.getElementById('oddDiaOdd');
    const oddDiaJogo = document.getElementById('oddDiaJogo');
    const oddDiaDesc = document.getElementById('oddDiaDesc');

    if (oddDiaOdd) oddDiaOdd.textContent = '1.72'; 
    if (oddDiaJogo) oddDiaJogo.textContent = 'Arsenal x Brentford';
    if (oddDiaDesc) oddDiaDesc.textContent = 'Palpite: Under 10.5 Corners';
}

// C) RENDERIZA A PÁGINA MÚLTIPLA DO DIA (FUTEBOL)
function renderMultiplaDia() {
    const multiplaLista = document.getElementById('multiplaLista');
    if (!multiplaLista) return;

    // --- MÚLTIPLA 1: FÁCIL (Baixo Risco) ---
    const multiplaFacil = [
        { nome: "Red Bull Bragantino × Vitória", liga: "Brasileirão - Palpite: Under 2.5 Gols", odds: [1.80] },
        { nome: "Fortaleza × Corinthians", liga: "Brasileirão - Palpite: Under 2.5 Gols", odds: [1.72] },
        { nome: "Bahia × Sport", liga: "Brasileirão - Palpite: Under 2.5 Gols", odds: [1.85] },
    ];
    const oddFacil = 5.71; 
    
    // --- MÚLTIPLA 2: MEDIANA (Moderado) ---
    const multiplaMediana = [
        { nome: "Atlético-MG x Palmeiras", liga: "Brasileirão - Palpite: Over 2.5 Gols", odds: [2.10] },
        { nome: "São Paulo x Internacional", liga: "Brasileirão - Palpite: BTTS Sim", odds: [1.95] },
        { nome: "Flamengo x Ceará", liga: "Brasileirão - Palpite: Over 1.5 Gols", odds: [1.35] },
    ];
    const oddMediana = 5.52; // 2.10 * 1.95 * 1.35 = 5.52

    // --- MÚLTIPLA 3: OUSADA (Alto Risco) ---
    const multiplaOusada = [
        { nome: "Juventude x Santos", liga: "Brasileirão - Palpite: Over 3.5 Gols", odds: [3.50] },
        { nome: "Juventude x Santos", liga: "Brasileirão - Palpite: Over 9.5 Corners", odds: [2.20] },
        { nome: "Bahia x Sport", liga: "Brasileirão - Palpite: Over 2.5 Gols", odds: [2.80] },
    ];
    const oddOusada = 21.56; 

    let htmlContent = '';
    
    // Funcao auxiliar para renderizar a tabela
    const renderMultiplaSection = (titulo, oddTotal, descricao, data, estilo) => {
        let sectionHtml = `<div class="multipla-section">`;
        sectionHtml += `<h3 class="${estilo}">${titulo} (Odd Total: ${oddTotal.toFixed(2)})</h3>`;
        sectionHtml += `<p class="multipla-info">${descricao}</p>`;
        
        data.forEach(jogo => {
            sectionHtml += `
                <div class="jogo-card multipla-item ${estilo}-card">
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
            <div style="margin-top: 20px; text-align: center;">
                <button class="multipla-btn ${estilo}-btn">COPIAR ${titulo.toUpperCase()}</button>
            </div>
        `;
        sectionHtml += `</div>`;
        return sectionHtml;
    };

    htmlContent += renderMultiplaSection(
        "Múltipla FÁCIL", 
        oddFacil, 
        "Baixo Risco: Foco em Under 2.5 Gols em H2H recentes e defesas sólidas.", 
        multiplaFacil, 
        "facil"
    );

    htmlContent += renderMultiplaSection(
        "Múltipla MEDIANA", 
        oddMediana, 
        "Risco Moderado: Equilíbrio entre BTTS e Overs em jogos de times com boas médias de gols.", 
        multiplaMediana, 
        "mediana"
    );
    
    htmlContent += renderMultiplaSection(
        "Múltipla OUSADA", 
        oddOusada, 
        "Alto Risco: Palpites arriscados em mercados de Over Gols e Escanteios, alto potencial de lucro.", 
        multiplaOusada, 
        "ousada"
    );

    multiplaLista.innerHTML = htmlContent;
}

// D) RENDERIZA A PÁGINA DEDICADA DA NBA (COMPLETO)
function renderNbaPage() {
    const nbaLista = document.getElementById('nbaLista');
    if (!nbaLista) return;

    // --- NBA MULTIPLA 1: OVERS (Pontuação) ---
    const multiplaOvers = [
        { nome: "OKC @ GSW", liga: "Over 223.5 | Justificativa: Alto Ritmo (24-18 Overs)", odds: [1.90] },
        { nome: "POR @ CLE", liga: "Over 232.5 | Justificativa: CLE em ritmo alto (média 235+)", odds: [1.90] },
        { nome: "DEN @ IND", liga: "Over 237.5 | Justificativa: Top-10 em Pace (Esperado 240+)", odds: [1.90] },
        { nome: "LAC @ ATL", liga: "Over 233.0 | Justificativa: ATL permite 118+ em casa", odds: [1.90] },
        { nome: "DET @ MIL", liga: "Over 233.5 | Justificativa: DET 80% Overs, Antetokounmpo", odds: [1.90] },
    ];
    const oddOvers = 24.76; 

    // --- NBA MULTIPLA 2: SPREADS (Handicap) ---
    const multiplaSpreads = [
        { nome: "DET vs ATL", liga: "Pistons -9.5 (Spread) | Raciocínio: DET 16-4 Home, ATL B2B", odds: [1.91] },
        { nome: "WAS vs MIL", liga: "Bucks -10.5 (Spread) | Raciocínio: MIL 7 vitórias H2H, WAS pior defesa", odds: [1.91] },
        { nome: "UTA vs HOU", liga: "Rockets -12.5 (Spread) | Raciocínio: HOU 13-4 Road, UTA 29º DRTG", odds: [1.91] },
        { nome: "LAL vs PHX", liga: "Lakers -5.5 (Spread) | Raciocínio: LAL 15-4, 7 Streak", odds: [1.91] },
    ];
    const oddSpreads = 13.31;
    
    // Lista de todos os jogos (ML)
    const allNbaGames = [
        { nome: "Oklahoma City x Golden State", liga: "01:00 BRT", odds: [1.90, 1.90] },
        { nome: "Portland x Cleveland", liga: "21:00 BRT", odds: [1.35, 3.10] },
        { nome: "Denver x Indiana", liga: "21:00 BRT", odds: [1.50, 2.70] },
        { nome: "San Antonio x Orlando", liga: "21:00 BRT", odds: [2.50, 1.55] },
        { nome: "LA Lakers x Atlanta", liga: "21:30 BRT", odds: [1.70, 2.15] },
        { nome: "Charlotte x New York", liga: "21:30 BRT", odds: [1.45, 2.90] },
        { nome: "Brooklyn x Chicago", liga: "22:00 BRT", odds: [2.20, 1.75] },
        { nome: "Sacramento x Houston", liga: "22:00 BRT", odds: [1.40, 3.00] },
        { nome: "Detroit x Milwaukee", liga: "22:00 BRT", odds: [5.00, 1.15] },
        { nome: "Miami x Washington", liga: "22:00 BRT", odds: [1.65, 2.25] },
    ];

    let htmlContent = '<h2>🏀 Múltiplas Analisadas da NBA (HOJE)</h2>';
    
    // Funcao auxiliar para renderizar multiplas NBA
    const renderNbaMultiplaSection = (titulo, oddTotal, data, estilo) => {
        let sectionHtml = `<div class="multipla-section nba-multipla-section">`;
        sectionHtml += `<h3 class="${estilo}">${titulo} (Odd Total: ${oddTotal.toFixed(2)})</h3>`;
        sectionHtml += `<p class="multipla-info">Estratégia focada em ${titulo.includes('OVERS') ? 'pontuações altas (Alto Risco)' : 'vitórias por diferença (Moderado)'}.</p>`;
        
        data.forEach(jogo => {
            const oddDisplay = jogo.odds.length === 1 ? jogo.odds[0].toFixed(2) : 'N/A';
            
            sectionHtml += `
                <div class="jogo-card multipla-item ${estilo}-card">
                    <div class="info">
                        <strong>${jogo.nome}</strong>
                        <small>${jogo.liga}</small>
                    </div>
                    <div class="odds">
                        <span class="odd-btn">${oddDisplay}</span>
                    </div>
                </div>
            `;
        });

        sectionHtml += `
            <div style="margin-top: 20px; text-align: center;">
                <button class="multipla-btn ${estilo}-btn">COPIAR ${titulo.toUpperCase()}</button>
            </div>
        `;
        sectionHtml += `</div>`;
        return sectionHtml;
    };
    
    // Renderiza a Múltipla de OVERS
    htmlContent += renderNbaMultiplaSection(
        "Múltipla de OVERS (Pontuação)", 
        oddOvers, 
        multiplaOvers, 
        "ousada" 
    );
    
    // Renderiza a Múltipla de SPREADS
    htmlContent += renderNbaMultiplaSection(
        "Múltipla de SPREADS (Handicap)", 
        oddSpreads, 
        multiplaSpreads, 
        "mediana" 
    );

    htmlContent += '<h2>🏀 Lista Completa de Jogos (Moneyline)</h2>';
    
    // Renderiza a lista de todos os jogos (ML)
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

// E) RENDERIZA A PÁGINA BINGO (Placeholder)
function renderBingoPage() {
    const bingoContent = document.getElementById('bingoContent');
    if (!bingoContent) return;
    
    const htmlContent = `
        <div class="placeholder-content">
            <h2>🎰 BINGO: Grande Aposta da Semana!</h2>
            <p>Esta seção será reservada para uma Aposta Única de Altíssima Odd (Ex: Odd 20+) ou aposta especial da semana, lançada com pouca frequência.</p>
            <button class="bingo-btn" style="margin-top: 15px;">Aguarde o Próximo Lançamento</button>
        </div>
    `;

    bingoContent.innerHTML = htmlContent;
}

// =======================================================
// Funções de Interatividade e Login
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
