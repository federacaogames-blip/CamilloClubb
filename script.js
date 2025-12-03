// E) RENDERIZA A PÁGINA BINGO (AGORA MÚLTIPLA HIGH ODD 20+)
function renderBingoPage() {
    const bingoContent = document.getElementById('bingoContent');
    if (!bingoContent) return;

    // Dados fictícios para a Múltipla High Odd (Exemplo de Odd 20.35)
    const highOddMultipla = [
        { nome: "Manchester City x Liverpool", liga: "City Vence + Over 3.5 Gols", odd: 4.50 },
        { nome: "Milan x Inter de Milão", liga: "Ambos Marcam no 1º Tempo (SIM)", odd: 3.20 },
        { nome: "Seleção Brasileira x Argentina", liga: "Mais de 11 Escanteios no Jogo", odd: 1.80 },
        { nome: "Bayer Leverkusen x Bayern", liga: "X2 (Empate ou Bayern) + Over 2.5", odd: 1.95 }
    ];
    
    // Cálculo fictício da Odd Total: 4.50 * 3.20 * 1.80 * 1.95 = 50.81
    const oddTotal = 50.81;

    let htmlContent = `<h3 style="color: #00ff66;">🎯 ODD TOTAL HOJE: ${oddTotal.toFixed(2)}</h3>`;
    htmlContent += '<p class="multipla-info">A Múltipla de Odd 20+ é o palpite de maior risco/recompensa. Recomendamos aposta baixa ou "por diversão".</p>';
    
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
            <button class="bingo-btn" style="background-color: #00ff66; color: #000; padding: 15px 30px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; font-size: 1.1rem; transition: background-color 0.2s;">COPIAR MÚLTIPLA (ODD ${oddTotal.toFixed(2)})</button>
        </div>
    `;

    bingoContent.innerHTML = htmlContent;
}
