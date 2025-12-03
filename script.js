document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa o conteúdo
    renderJogosDoDia();
    renderOddDoDia();
    renderNbaPage(); 
    renderMultiplaDia(); 
    renderBingoPage(); 
    
    // 2. Configura a interatividade principal
    setupNavigation(); 
    setupVipArea();
    setupGameCardToggle();
    
    // Assegura que a página inicial esteja visível e ativa ao carregar
    const jogosDiaPage = document.getElementById('jogos-dia');
    const jogosDiaLink = document.querySelector('[data-page="jogos-dia"]');

    if (jogosDiaPage) jogosDiaPage.style.display = 'block';
    if (jogosDiaLink) jogosDiaLink.classList.add('active');
});

// =======================================================
// Funções de Renderização de Conteúdo
// =======================================================

// A) RENDERIZA OS PRINCIPAIS JOGOS DO DIA (FUTEBOL)
function renderJogosDoDia() {
    const jogosLista = document.getElementById('jogosLista');
    // Checagem robusta
    if (!jogosLista) {
        console.error("ID 'jogosLista' não encontrado no HTML. Palpites do Dia não serão exibidos.");
        return; 
    }

    const jogosData = [
        { nome: "Arsenal x Brentford", liga: "🏆 Premier League | 16:30 BRT", odds: [1.45, 4.30, 6.50], palpite_unico: "Arsenal Vence Ambos os Tempos", odd_sugerida: 2.75 },
        { nome: "Liverpool x Sunderland", liga: "🏆 Premier League | 17:15 BRT", odds: [1.20, 5.80, 11.0], palpite_unico: "Mais de 10.5 Escanteios", odd_sugerida: 1.90 },
        { nome: "Union Berlin x Bayern", liga: "🏆 DFB-Pokal | 16:45 BRT", odds: [5.50, 4.20, 1.60], palpite_unico: "Ambos Marcam (SIM)", odd_sugerida: 1.85 },
        { nome: "Athletic Bilbao x Real Madrid", liga: "🏆 La Liga | 15:00 BRT", odds: [3.10, 3.40, 2.15], palpite_unico: "Under 2.5 Gols", odd_sugerida: 1.80 },
        { nome: "Atlético-MG x Palmeiras", liga: "🇧🇷 Brasileirão Série A | 21:30 BRT", odds: [2.35, 3.10, 2.95], palpite_unico: "Vitória do Atlético-MG (ML)", odd_sugerida: 2.35 },
        { nome: "Flamengo x Ceará", liga: "🇧🇷 Brasileirão Série A | 21:30 BRT", odds: [1.50, 4.10, 5.80], palpite_unico: "Over 1.5 Gols FT", odd_sugerida: 1.35 },
    ];

    let htmlContent = '';
    htmlContent += '<p class="multipla-info" style="margin-bottom: 20px; color: var(--text-muted);">Clique em qualquer jogo para revelar a sugestão de aposta do dia!</p>';

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
    // Checagem robusta em cada elemento
    const oddDiaOdd = document.getElementById('oddDiaOdd');
    const oddDiaJogo = document.getElementById('oddDiaJogo');
    const oddDiaDesc = document.getElementById('oddDiaDesc');

    if (oddDiaOdd) oddDiaOdd.textContent = '1.72'; 
    if (oddDiaJogo) oddDiaJogo.textContent = 'Arsenal x Brentford';
    if (oddDiaDesc) oddDiaDesc.textContent = 'Palpite: Under 10.5 Corners';
}

// C) RENDERIZA AS MÚLTIPLAS DE FUTEBOL
function renderMultiplaDia() {
    const multiplaLista = document.getElementById('multiplaLista');
    // Checagem robusta
    if (!multiplaLista) {
        console.error("ID 'multiplaLista' não encontrado no HTML. Múltiplas de Futebol não serão exibidas.");
        return;
    }

    // --- MÚLTIPLAS FUTEBOL ---
    const multiplaFacil = [
        { nome: "Red Bull Bragantino × Vitória", liga: "Brasileirão - Palpite: Under 2.5 Gols", odds: [1.80] },
        { nome: "Fortaleza × Corinthians", liga: "Brasileirão - Palpite: Under 2.5 Gols", odds: [1.72] },
        { nome: "Bahia × Sport", liga: "Brasileirão - Palpite: Under 2.5 Gols", odds: [1.85] },
    ];
    const oddFacil = 5.71; 
    
    const multiplaMediana = [
        { nome: "Atlético-MG x Palmeiras", liga: "Brasileirão - Palpite: Over 2.5 Gols", odds: [2.10] },
        { nome: "São Paulo x Internacional", liga: "Brasileirão - Palpite: BTTS Sim", odds: [1.95] },
        { nome: "Flamengo x Ceará", liga: "Brasileirão - Palpite: Over 1.5 Gols", odds: [1.35] },
    ];
    const oddMediana = 5.52; 

    const multiplaOusada = [
        { nome: "Juventude x Santos", liga: "Brasileirão - Palpite: Over 3.5 Gols", odds: [3.50] },
        { nome: "Juventude x Santos", liga: "Brasileirão - Palpite: Over 9.5 Corners", odds: [2.20] },
        { nome: "Bahia x Sport", liga: "Brasileirão - Palpite: Over 2.5 Gols", odds: [2.80] },
    ];
    const oddOusada = 21.56;

    let htmlContent = '<h2>⚽ Múltiplas de Futebol</h2>';
    
    const renderMultiplaSection = (titulo, oddTotal, descricao, data, estilo) => {
        let sectionHtml = `<div class="multipla-section">`;
        sectionHtml += `<h3 class="${estilo}">${titulo} (Odd Total: ${oddTotal})</h3>`;
        sectionHtml += `<p class="multipla-info" style="color: var(--text-muted);">${descricao}</p>`;
        
        data.forEach(jogo => {
            sectionHtml += `
                <div class="jogo-card multipla-item ${estilo}-card">
                    <div class="info">
                        <strong>${jogo.nome}</strong>
                        <small>${jogo.liga}</small>
                    </div>
                    <div class="odds">
                        <span class="odd-btn" style="background-color: var(--accent-color); color: #000;">${jogo.odd ? jogo.odd.toFixed(2) : jogo.odds[0].toFixed(2)}</span>
                    </div>
                </div>
            `;
        });

        sectionHtml += `
            <div style="margin-top: 20px; text-align: center;">
                <button class="multipla-btn ${estilo}-btn">COPIAR ${titulo.toUpperCase().replace(/ /g, '_')}</button>
            </div>
        `;
        sectionHtml += `</div>`;
        return sectionHtml;
    };

    // Renderiza Futebol
    htmlContent += renderMultiplaSection("Múltipla FÁCIL", oddFacil.toFixed(2), "Baixo Risco: Foco em Under 2.5 Gols.", multiplaFacil, "facil");
    htmlContent += renderMultiplaSection("Múltipla MEDIANA", oddMediana.toFixed(2), "Risco Moderado: Equilíbrio entre BTTS e Overs.", multiplaMediana, "mediana");
    htmlContent += renderMultiplaSection("Múltipla OUSADA", oddOusada.toFixed(2), "Alto Risco: Palpites arriscados em Overs.", multiplaOusada, "ousada");
    
    multiplaLista.innerHTML = htmlContent;
}

// D) RENDERIZA A PÁGINA DEDICADA DA NBA (AGORA COM MÚLTIPLAS DA NBA)
function renderNbaPage() {
    const nbaLista = document.getElementById('nbaLista');
    // Checagem robusta
    if (!nbaLista) {
        console.error("ID 'nbaLista' não encontrado no HTML. Múltiplas de NBA não serão exibidas.");
        return;
    }

    // --- MÚLTIPLAS NBA ---
    
    // MÚLTIPLA NBA 1: OVER/UNDER (PONTOS)
    const multiplaNbaPontos = [
        { nome: "OKC @ GSW (01:00)", liga: "Seleção: Over 223.5", odd: 1.88, justificativa: "Ambas as equipes veem Over em 24-18 combinados. Modelos projetam 225+." },
        { nome: "POR @ CLE (21:00)", liga: "Seleção: Over 232.5", odd: 1.91, justificativa: "CLE em ritmo alto em casa. POR com overs em 7/10 road games." },
        { nome: "DEN @ IND (21:00)", liga: "Seleção: Over 237.5", odd: 1.85, justificativa: "DEN e IND top-10 em pace; overs em 6/8 H2H recentes." },
    ];
    const oddNbaPontos = (1.88 * 1.91 * 1.85).toFixed(2);
    
    // MÚLTIPLA NBA 2: HANDICAP (SPREADS)
    const multiplaNbaSpread = [
        { nome: "DET vs ATL (21:00)", liga: "Seleção: Pistons -9.5", odd: 1.91, justificativa: "DET 16-4, 13 streak home; ATL sem Young, back-to-back." },
        { nome: "WAS vs MIL (21:00)", liga: "Seleção: Bucks -10.5", odd: 1.91, justificativa: "MIL 7 vitórias H2H; WAS pior defesa." },
        { nome: "UTA vs HOU (23:00)", liga: "Seleção: Rockets -12.5", odd: 1.91, justificativa: "HOU 13-4, 5 streak road; UTA 29º DRTG." },
    ];
    const oddNbaSpread = (1.91 * 1.91 * 1.91).toFixed(2);


    let htmlContent = '<h2>🏀 Múltiplas de NBA</h2>';
    
    const renderNbaMultiplaSection = (titulo, oddTotal, data, estilo) => {
        const destaqueCor = estilo === 'ousada' ? 'var(--primary-color)' : 'var(--accent-color)';
        let sectionHtml = `<div class="multipla-section">
            <h3 style="color: ${destaqueCor}; border-left-color: ${destaqueCor} !important;">${titulo} (Odd Total: ${oddTotal})</h3>`;

        data.forEach(jogo => {
            sectionHtml += `
                <div class="jogo-card multipla-item" style="border-left: 5px solid ${destaqueCor};">
                    <div class="info">
                        <strong>${jogo.nome}</strong>
                        <small>${jogo.liga}</small>
                    </div>
                    <div class="odds">
                        <span class="odd-btn" style="background-color: ${destaqueCor}; color: #000;">${jogo.odd.toFixed(2)}</span>
                    </div>
                    <div class="palpite-sugerido" style="max-height: 100px; padding-top: 10px; margin-top: 10px; opacity: 1;"> 
                        <p style="color: var(--text-muted); font-size: 0.9rem;">*Justificativa: ${jogo.justificativa}</p>
                    </div>
                </div>
            `;
        });

        sectionHtml += `
            <div style="margin-top: 20px; text-align: center;">
                <button class="multipla-btn" style="background-color: ${destaqueCor}; color: ${estilo === 'ousada' ? '#fff' : '#000'}; transition: transform 0.1s;">COPIAR ${titulo.toUpperCase().replace(/ /g, '_')}</button>
            </div>
        </div>`;
        return sectionHtml;
    };
    
    htmlContent += renderNbaMultiplaSection("Múltipla NBA - OVERS/UNDERS", oddNbaPontos, multiplaNbaPontos, "mediana");
    htmlContent += renderNbaMultiplaSection("Múltipla NBA - HANDICAPS", oddNbaSpread, multiplaNbaSpread, "ousada");
    
    nbaLista.innerHTML = htmlContent;
}


// E) RENDERIZA A PÁGINA BINGO (Placeholder)
function renderBingoPage() {
    const bingoContent = document.getElementById('bingoContent');
    // Checagem robusta
    if (!bingoContent) {
        console.error("ID 'bingoContent' não encontrado no HTML. Bingo não será exibido.");
        return;
    }
    
    const htmlContent = `
        <div class="placeholder-content">
            <h2>🎰 BINGO: Grande Aposta da Semana!</h2>
            <p>Esta seção será reservada para uma Aposta Única de Altíssima Odd (Ex: Odd 20+).</p>
            <button class="bingo-btn" style="margin-top: 15px;">Aguarde o Próximo Lançamento</button>
        </div>
    `;
    bingoContent.innerHTML = htmlContent;
}

// =======================================================
// Funções de Interatividade, Navegação e Login
// =======================================================

function setupGameCardToggle() {
    const jogosLista = document.getElementById('jogosLista');
    
    const addToggleListener = (container) => {
        if (!container) return;
        container.addEventListener('click', (e) => {
            const card = e.target.closest('.jogo-card');
            if (!card) return; 
            if (card.querySelector('.palpite-box')) { 
                const suggestion = card.querySelector('.palpite-sugerido');
                if (suggestion) {
                    suggestion.classList.toggle('hidden');
                }
            }
        });
    };
    
    addToggleListener(jogosLista);
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
            
            if (!pageId) {
                e.preventDefault();
                return;
            } 
            
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
            } else {
                console.error(`Página com ID #${pageId} não encontrada no HTML!`);
                document.getElementById('jogos-dia').style.display = 'block';
                document.querySelector('[data-page="jogos-dia"]').classList.add('active');
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
        if (conteudoVipSection) {
            conteudoVipSection.style.display = 'block';
            renderVipContent();
        }
    } else {
        if (loginSection) loginSection.style.display = 'block';
    }
}

function setupVipArea() {
    const loginForm = document.getElementById('loginForm');
    const loginErro = document.getElementById('loginErro');
    
    if (!loginForm) return;
    
    const showPage = (pageId) => {
        document.querySelectorAll('.page-content').forEach(page => page.style.display = 'none');
        const targetPage = document.getElementById(pageId);
        if (targetPage) targetPage.style.display = 'block';
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const loginSuccess = (
            (username === 'camillo' && password === 'bets2025') ||
            (username === 'camillo22' && password === '19032011') 
        );

        if (loginSuccess) {
            localStorage.setItem('isLoggedIn', 'true');
            loginErro.style.display = 'none';
            showPage('vip-content'); 
            renderVipContent();
        } else {
            loginErro.style.display = 'block';
        }
    });

    const vipLink = document.querySelector('[data-page="vip-login"]');
    if (vipLink && localStorage.getItem('isLoggedIn') === 'true') {
        renderVipContent(); 
    }
}

function renderVipContent() {
    const vipContentSection = document.getElementById('vip-content'); 
    if (!vipContentSection) return;

    const palpitePremium = `
        <div class="vip-article section-card" style="border-left: 5px solid var(--accent-color);">
            <h3 style="color: var(--primary-color); border-bottom: 1px dashed var(--bg-card); padding-bottom: 10px;">💎 Palpite Premium de Hoje:</h3>
            <p style="font-weight: 600;">JOGO EXCLUSIVO: **Liverpool (Vitória) vs. Chelsea**</p>
            <p style="font-weight: 600;">MERCADO SUGERIDO: **Vitória Simples do Liverpool**</p>
            <p style="font-size: 1.5rem; color: var(--accent-color); font-weight: 900;">ODD MÍNIMA: 2.15</p>
            <p style="color: var(--text-muted); margin-top: 10px;">
                Análise: O Liverpool joga em casa, buscando a liderança. O Chelsea tem desfalques no meio-campo. Stake 2% máxima.
            </p>
        </div>
    `;

    const manualDeOuro = `
        <div class="vip-article section-card" style="margin-top: 20px;">
            <h2 style="color: var(--primary-color); border-bottom: 2px solid var(--primary-color);">👑 MANUAL DE OURO: Gestão de Banca</h2>
            <p style="font-weight: 600; color: var(--accent-color);">Este guia é o pilar do lucro a longo prazo. Siga à risca.</p>

            <h3 style="color: var(--text-light); border-bottom: 1px dashed #555; margin-top: 20px;">1. As 7 Regras Sagradas da Gestão</h3>
            <ul style="list-style-type: none; padding-left: 0;">
                <li style="margin-bottom: 5px;"><i class="fas fa-check-circle" style="color: var(--accent-color); margin-right: 8px;"></i>**1–2% por entrada:** Stake = 1–2% da banca total.</li>
                <li style="margin-bottom: 5px;"><i class="fas fa-check-circle" style="color: var(--accent-color); margin-right: 8px;"></i>**Recalculo:** Atualize sua stake a cada 7-10 dias.</li>
                <li style="margin-bottom: 5px;"><i class="fas fa-check-circle" style="color: var(--accent-color); margin-right: 8px;"></i>**Stop-Loss Diário:** Pare se perder 3 unidades no dia.</li>
                <li style="margin-bottom: 5px;"><i class="fas fa-check-circle" style="color: var(--accent-color); margin-right: 8px;"></i>**Stop-Loss Mensal:** Pare se perder 20% da banca no mês.</li>
            </ul>

            <h3 style="color: var(--text-light); border-bottom: 1px dashed #555; margin-top: 20px;">2. Tabela Prática de Stakes (Máxima 2%)</h3>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                    <thead>
                        <tr style="background-color: var(--primary-color);">
                            <th style="padding: 10px; text-align: left; color: #000;">Banca Atual</th>
                            <th style="padding: 10px; text-align: left; color: #000;">Stake 1%</th>
                            <th style="padding: 10px; text-align: left; color: #000;">Stake 2% (Máx)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background-color: #3a3a3a;">
                            <td style="padding: 10px; border: 1px solid #555;">R$ 500</td>
                            <td style="padding: 10px; border: 1px solid #555;">R$ 5</td>
                            <td style="padding: 10px; border: 1px solid #555; color: var(--accent-color); font-weight: 700;">R$ 10</td>
                        </tr>
                        <tr style="background-color: #2c2c2c;">
                            <td style="padding: 10px; border: 1px solid #555;">R$ 2.000</td>
                            <td style="padding: 10px; border: 1px solid #555;">R$ 20</td>
                            <td style="padding: 10px; border: 1px solid #555; color: var(--accent-color); font-weight: 700;">R$ 40</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    vipContentSection.innerHTML = `
        ${palpitePremium}
        ${manualDeOuro}
        <button class="logout" id="logoutBtn" style="margin-top: 30px;">Sair da Área VIP</button>
    `;

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        document.querySelectorAll('.page-content').forEach(page => page.style.display = 'none');
        document.getElementById('jogos-dia').style.display = 'block';
        document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
        document.querySelector('[data-page="jogos-dia"]').classList.add('active');
    });
}
