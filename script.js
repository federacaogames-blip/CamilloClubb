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
});

// =======================================================
// Funções de Renderização de Conteúdo
// =======================================================

// A) RENDERIZA OS PRINCIPAIS JOGOS DO DIA
function renderJogosDoDia() {
    const jogosLista = document.getElementById('jogosLista');
    if (!jogosLista) return;

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
    const oddDiaOdd = document.getElementById('oddDiaOdd');
    const oddDiaJogo = document.getElementById('oddDiaJogo');
    const oddDiaDesc = document.getElementById('oddDiaDesc');

    if (oddDiaOdd) oddDiaOdd.textContent = '1.72'; 
    if (oddDiaJogo) oddDiaJogo.textContent = 'Arsenal x Brentford';
    if (oddDiaDesc) oddDiaDesc.textContent = 'Palpite: Under 10.5 Corners';
}

// C) RENDERIZA AS MÚLTIPLAS
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
    const oddMediana = 5.52; 

    // --- MÚLTIPLA 3: OUSADA (Alto Risco) ---
    const multiplaOusada = [
        { nome: "Juventude x Santos", liga: "Brasileirão - Palpite: Over 3.5 Gols", odds: [3.50] },
        { nome: "Juventude x Santos", liga: "Brasileirão - Palpite: Over 9.5 Corners", odds: [2.20] },
        { nome: "Bahia x Sport", liga: "Brasileirão - Palpite: Over 2.5 Gols", odds: [2.80] },
    ];
    const oddOusada = 21.56;

    let htmlContent = '';
    
    const renderMultiplaSection = (titulo, oddTotal, descricao, data, estilo) => {
        let sectionHtml = `<div class="multipla-section">`;
        sectionHtml += `<h3 class="${estilo}">${titulo} (Odd Total: ${oddTotal.toFixed(2)})</h3>`;
        sectionHtml += `<p class="multipla-info" style="color: var(--text-muted);">${descricao}</p>`;
        
        data.forEach(jogo => {
            sectionHtml += `
                <div class="jogo-card multipla-item ${estilo}-card">
                    <div class="info">
                        <strong>${jogo.nome}</strong>
                        <small>${jogo.liga}</small>
                    </div>
                    <div class="odds">
                        <span class="odd-btn" style="background-color: var(--accent-color); color: #000;">${jogo.odds[0].toFixed(2)}</span>
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

    htmlContent += renderMultiplaSection("Múltipla FÁCIL", oddFacil, "Baixo Risco: Foco em Under 2.5 Gols.", multiplaFacil, "facil");
    htmlContent += renderMultiplaSection("Múltipla MEDIANA", oddMediana, "Risco Moderado: Equilíbrio entre BTTS e Overs.", multiplaMediana, "mediana");
    htmlContent += renderMultiplaSection("Múltipla OUSADA", oddOusada, "Alto Risco: Palpites arriscados em Overs.", multiplaOusada, "ousada");

    multiplaLista.innerHTML = htmlContent;
}

// D) RENDERIZA A PÁGINA DEDICADA DA NBA (Placeholder)
function renderNbaPage() {
    const nbaLista = document.getElementById('nbaLista');
    if (!nbaLista) return;
    
    const htmlContent = `
        <div class="placeholder-content">
            <h3>🏀 Em Breve: Análise e Palpites Exclusivos da NBA!</h3>
            <p>Os jogos da temporada de basquete serão publicados aqui em breve. Fique ligado!</p>
        </div>
    `;
    nbaLista.innerHTML = htmlContent;
}

// E) RENDERIZA A PÁGINA BINGO (Placeholder)
function renderBingoPage() {
    const bingoContent = document.getElementById('bingoContent');
    if (!bingoContent) return;
    
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

function setupVipArea() {
    const loginForm = document.getElementById('loginForm');
    const loginErro = document.getElementById('loginErro');
    
    // O botão de logout é recriado em renderVipContent, então configuramos ele lá.
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

        // CHECK DE CREDENCIAIS (Antiga + Nova)
        const loginSuccess = (
            (username === 'camillo' && password === 'bets2025') ||
            (username === 'camillo22' && password === '19032011') 
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

    // Tenta carregar o conteúdo VIP se o usuário já estiver logado
    const vipLink = document.querySelector('[data-page="vip-login"]');
    if (vipLink && localStorage.getItem('isLoggedIn') === 'true') {
        renderVipContent(); 
    }
}

// CONTEÚDO DINÂMICO DO MANUAL DE OURO
function renderVipContent() {
    const vipContentSection = document.getElementById('vip-content'); 
    if (!vipContentSection) return;

    // Conteúdo VIP Premium (Palpite do dia)
    const palpitePremium = `
        <div class="vip-article section-card" style="border-left: 5px solid var(--accent-color);">
            <h3 style="color: var(--primary-color); border-bottom: 1px dashed var(--bg-dark);">💎 Palpite Premium de Hoje:</h3>
            <p style="font-weight: 600;">JOGO EXCLUSIVO: **Liverpool (Vitória) vs. Chelsea**</p>
            <p style="font-weight: 600;">MERCADO SUGERIDO: **Vitória Simples do Liverpool**</p>
            <p style="font-size: 1.5rem; color: var(--accent-color); font-weight: 900;">ODD MÍNIMA: 2.15</p>
            <p style="color: var(--text-muted); margin-top: 10px;">
                Análise: O Liverpool joga em casa, buscando a liderança. O Chelsea tem desfalques no meio-campo. Stake 2% máxima.
            </p>
        </div>
    `;

    // Conteúdo do Manual de Ouro
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

    // Atualiza a seção #vip-content com o novo conteúdo
    vipContentSection.innerHTML = `
        ${palpitePremium}
        ${manualDeOuro}
        <button class="logout" id="logoutBtn" style="margin-top: 30px;">Sair da Área VIP</button>
    `;

    // É CRÍTICO re-adicionar o listener de logout após recriar o botão
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        document.querySelectorAll('.page-content').forEach(page => page.style.display = 'none');
        document.getElementById('jogos-dia').style.display = 'block';
        document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
        document.querySelector('[data-page="jogos-dia"]').classList.add('active');
    });
}
