// D) RENDERIZA A PÁGINA DEDICADA DA NBA (AGORA COM MÚLTIPLAS DETALHADAS)
function renderNbaPage() {
    const nbaLista = document.getElementById('nbaLista');
    if (!nbaLista) return;

    // --- NBA MULTIPLA 1: OVERS (Pontuação) ---
    // Total Odd calculado assumindo 5 jogos @ 1.90 (24.76)
    const multiplaOvers = [
        { nome: "OKC @ GSW", liga: "Over 223.5 | Justificativa: Alto Ritmo (24-18 Overs)", odds: [1.90] },
        { nome: "POR @ CLE", liga: "Over 232.5 | Justificativa: CLE em ritmo alto (média 235+)", odds: [1.90] },
        { nome: "DEN @ IND", liga: "Over 237.5 | Justificativa: Top-10 em Pace (Esperado 240+)", odds: [1.90] },
        { nome: "LAC @ ATL", liga: "Over 233.0 | Justificativa: ATL permite 118+ em casa", odds: [1.90] },
        { nome: "DET @ MIL", liga: "Over 233.5 | Justificativa: DET 80% Overs, Antetokounmpo", odds: [1.90] },
    ];
    const oddOvers = 24.76; 

    // --- NBA MULTIPLA 2: SPREADS (Handicap) ---
    // Total Odd calculado assumindo 4 jogos @ 1.91 (13.31)
    const multiplaSpreads = [
        { nome: "DET vs ATL", liga: "Pistons -9.5 (Spread) | Raciocínio: DET 16-4 Home, ATL B2B", odds: [1.91] },
        { nome: "WAS vs MIL", liga: "Bucks -10.5 (Spread) | Raciocínio: MIL 7 vitórias H2H, WAS pior defesa", odds: [1.91] },
        { nome: "UTA vs HOU", liga: "Rockets -12.5 (Spread) | Raciocínio: HOU 13-4 Road, UTA 29º DRTG", odds: [1.91] },
        { nome: "LAL vs PHX", liga: "Lakers -5.5 (Spread) | Raciocínio: LAL 15-4, 7 Streak", odds: [1.91] },
    ];
    const oddSpreads = 13.31;
    
    // Lista de todos os jogos (ML) - Mantida para exibição completa abaixo
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
    
    // Funcao auxiliar para renderizar multiplas NBA (similar ao futebol)
    const renderNbaMultiplaSection = (titulo, oddTotal, data, estilo) => {
        let sectionHtml = `<div class="multipla-section nba-multipla-section">`;
        sectionHtml += `<h3 class="${estilo}">${titulo} (Odd Total: ${oddTotal.toFixed(2)})</h3>`;
        sectionHtml += `<p class="multipla-info">Estratégia focada em ${titulo.includes('OVERS') ? 'pontuações altas (Alto Risco)' : 'vitórias por diferença (Moderado)'}.</p>`;
        
        data.forEach(jogo => {
            // Aposta e Justificativa ficam na tag <small>
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
    
    // Renderiza a Múltipla de OVERS (Alto Risco - Vermelho/Ousada)
    htmlContent += renderNbaMultiplaSection(
        "Múltipla de OVERS (Pontuação)", 
        oddOvers, 
        multiplaOvers, 
        "ousada" 
    );
    
    // Renderiza a Múltipla de SPREADS (Risco Moderado - Amarelo/Mediana)
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
                    <span class="odd-btn odd-home" title="Vitória ${casa} (ML)">${jogo.odds[0]}</span>
                    <span class="odd-btn odd-away" title="Vitória ${fora} (ML)">${jogo.odds[1]}</span>
                </div>
            </div>
        `;
    });

    nbaLista.innerHTML = htmlContent;
}
