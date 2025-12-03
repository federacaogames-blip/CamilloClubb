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

// D) RENDERIZA A PÁGINA DEDICADA DA NBA (COMPLETO E SEM ODD TOTAL NO TÍTULO)
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
    
    // --- NBA MULTIPLA 2: SPREADS (Handicap) ---
    const multiplaSpreads = [
        { nome: "DET vs ATL", liga: "Pistons -9.5 (Spread) | Raciocínio: DET 16-4 Home, ATL B
