document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o conteúdo de todas as páginas
    renderJogosDoDia();
    renderOddDoDia();
    renderNbaPage(); // Renderiza a página da NBA com as múltiplas
    renderMultiplaDia(); // Renderiza as múltiplas de futebol
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
                    <p>🔥 Sugestão
