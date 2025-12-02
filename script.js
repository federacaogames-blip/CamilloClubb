// --- CONFIGURAÇÃO DA API DA PINNACLE (JÁ EXISTENTE) ---
const API_KEY_PINNACLE = '080ec70363mshf4bb5ff3cd88babp14b3d4jsn05e5bd4a7e31'; // SUA CHAVE
const API_HOST_PINNACLE = 'pinnacle-odds.p.rapidapi.com';
const BASE_URL_PINNACLE = 'https://pinnacle-odds.p.rapidapi.com';

// --- CONFIGURAÇÕES DAS NOVAS APIs (Mantidas, mas sem chamada automática) ---
const API_HOST_FUTEBOL = 'wosti-futebol-tv-brasil.p.rapidapi.com';
const BASE_URL_FUTEBOL = 'https://wosti-futebol-tv-brasil.p.rapidapi.com';
const API_HOST_NBA = 'api-nba-v1.p.rapidapi.com';
const BASE_URL_NBA = 'https://api-nba-v1.p.rapidapi.com';

// Exemplo de usuário/senha VIP (DEVE SER MUDADO PARA SEGURANÇA REAL)
const VIP_USER = 'camillovip';
const VIP_PASS = 'melhoresodds2025'; 

// --- FUNÇÃO CENTRAL DE FETCH (AGORA GENÉRICA) ---
async function fetchFromAPI(host, endpoint, baseUrl, key) {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                'X-Rapidapi-Key': key,
                'X-Rapidapi-Host': host,
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}...`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erro na API (${host}):`, error);
        return { error: true, message: error.message }; 
    }
}

// --- FUNÇÕES DE CHAMADA DAS NOVAS APIs (APENAS PARA USO FUTURO) ---

async function buscarTimesDeFutebol() {
    console.log("-> Buscando Times de Futebol (Wosti)...");
    const endpoint = "/api/Teams";
    const dados = await fetchFromAPI(API_HOST_FUTEBOL, endpoint, BASE_URL_FUTEBOL, API_KEY_PINNACLE);
    if (!dados.error) {
        console.log("✅ Dados de Times de Futebol Recebidos:", dados);
    }
}

async function buscarEstatisticasNBA() {
    console.log("-> Buscando Estatísticas da NBA (API-NBA-V1)...");
    const endpoint = "/players/statistics?game=8133"; 
    const dados = await fetchFromAPI(API_HOST_NBA, endpoint, BASE_URL_NBA, API_KEY_PINNACLE);
    if (!dados.error) {
        console.log("✅ Estatísticas da NBA Recebidas:", dados);
    }
}


// --- FUNÇÃO DE CARREGAMENTO DE FALLBACK (JOGOS FICTÍCIOS) ---

function carregarFallback() {
     const jogosLista = document.getElementById('jogosLista');
     // **APARECE QUANDO A COTA DA API ACABA**
     jogosLista.innerHTML = `
        <p style="text-align:center; color:#ff5555; font-size: 1.2rem; margin-top: 20px;">
            ⚠️ **ERRO DE CONEXÃO/COTA DA API.** <br> Exibindo dados de simulação.
        </p>
        <div class="jogo-card" style="animation-delay: 0s;">
            <div class="info">
                <strong>Palmeiras</strong> × <strong>Fluminense</strong><br>
                <small>Brasileirão - 02/12/2025 20:00</small>
            </div>
            <div class="odds">
                <span title="Vitória Palmeiras">1.75</span>
                <span title="Empate">3.60</span>
                <span title="Vitória Fluminense">4.20</span>
            </div>
        </div>
        <div class="jogo-card" style="animation-delay: 0.1s;">
            <div class="info">
                <strong>Real Madrid</strong> × <strong>Barcelona</strong><br>
                <small>La Liga - 02/12/2025 21:00</small>
            </div>
            <div class="odds">
                <span title="Vitória Real Madrid">2.10</span>
                <span title="Empate">3.80</span>
                <span title="Vitória Barcelona">3.10</span>
            </div>
        </div>`;
    
    document.getElementById('oddDiaJogo').textContent = 'Manchester City × Bayern de Munique';
    document.getElementById('oddDiaOdd').textContent = '3.85';
    document.getElementById('oddDiaDesc').textContent = 'Vitória do City + Mais de 2.5 gols';
    
    console.warn("Usando dados de Fallback devido a erro na API ou cota esgotada.");
}

// --- FUNÇÃO PRINCIPAL DE CARREGAMENTO DE JOGOS (PINNACLE) ---

async function carregarJogos() {
    const jogosLista = document.getElementById('jogosLista');
    jogosLista.innerHTML = '<div class="loading"><div class="spinner"></div><p>Carregando odds reais da Pinnacle...</p></div>';

    // Se a API falhar ou a cota acabar, ele chama o carregarFallback()
    const metaPeriods = await fetchFromAPI(API_HOST_PINNACLE, '/kit/v1/meta-periods?sport_id=1', BASE_URL_PINNACLE, API_KEY_PINNACLE);
    if (metaPeriods && metaPeriods.error) { 
        carregarFallback();
        return;
    }

    const oddsData = await fetchFromAPI(API_HOST_PINNACLE, '/kit/v1/odds?sport_id=1&period_number=1&odds_format=decimal&lang=en&date_format=iso', BASE_URL_PINNACLE, API_KEY_PINNACLE);
    if (oddsData && oddsData.error || !oddsData?.leagues?.length) { 
        carregarFallback();
        return;
    }
    
    // ... (restante da lógica de carregamento dos cards de jogo)
    let jogosHTML = '';
    let oddDia = { jogo: '', odd: 'N/A', desc: '' };
    let count = 0;

    oddsData.leagues.forEach(league => {
        league.events?.forEach(event => {
            if (count >= 8) return;

            const home = event.home_team || 'Time da Casa';
            const away = event.away_team || 'Time Visitante';
            const leagueName = league.name || 'Liga Desconhecida';
            const eventDate = event.event_datetime ? new Date(event.event_datetime) : new Date();
            const date = eventDate.toLocaleString('pt-BR', {
                day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            const moneyline = event.moneyline || [];
            const odds = {
                home: moneyline.find(o => o.suspension === false && o.points === 0)?.price?.toFixed(2) || 'N/A',
                draw: moneyline.find(o => o.suspension === false && o.points === 1)?.price?.toFixed(2) || 'N/A',
                away: moneyline.find(o => o.suspension === false && o.points === 2)?.price?.toFixed(2) || 'N/A'
            };

            const card = `
            <div class="jogo-card" style="animation-delay: ${count * 0.1}s;">
                <div class="info">
                    <strong>${home}</strong> × <strong>${away}</strong><br>
                    <small>${leagueName} - ${date}</small>
                </div>
                <div class="odds">
                    <span title="Vitória ${home}">${odds.home}</span>
                    <span title="Empate">${odds.draw}</span>
                    <span title="Vitória ${away}">${odds.away}</span>
                </div>
            </div>`;
            jogosHTML += card;

            if (count === 0 && odds.home !== 'N/A' && odds.draw !== 'N/A') {
                const oddValue = parseFloat(odds.home) > parseFloat(odds.away) ? odds.away : odds.home;
                oddDia = {
                    jogo: `${home} × ${away}`,
                    odd: (parseFloat(oddValue) * 1.5).toFixed(2), 
                    desc: `${parseFloat(oddValue) > 2 ? 'Vitória Simples' : 'Handicap -0.5'} do Time Favorito`
                };
            }

            count++;
        });
    });

    if (jogosHTML) {
        jogosLista.innerHTML = jogosHTML;
        document.getElementById('oddDiaJogo').textContent = oddDia.jogo;
        document.getElementById('oddDiaOdd').textContent = oddDia.odd;
        document.getElementById('oddDiaDesc').textContent = oddDia.desc;
    } else {
        jogosLista.innerHTML = '<p style="text-align:center; color:#aaa;">Nenhum jogo encontrado para hoje. Tente novamente mais tarde.</p>';
    }
}


// --- LÓGICA VIP (MANTIDA IGUAL) ---

const navVipLink = document.getElementById('nav-vip-link');
const loginSection = document.getElementById('login-vip');
const conteudoPadrao = document.getElementById('conteudo-padrao');
const conteudoVip = document.getElementById('conteudo-vip');
const loginForm = document.getElementById('loginForm');
const loginErro = document.getElementById('loginErro');
const logoutBtn = document.getElementById('logoutBtn');

// ... (O restante da lógica VIP: event listeners e função mostrarConteudoVip permanecem iguais) ...
navVipLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        mostrarConteudoVip(true);
    } else {
        mostrarConteudoVip(false);
        loginSection.style.display = 'block';
        conteudoPadrao.style.display = 'none';
    }
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    navVipLink.classList.add('active');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === VIP_USER && pass === VIP_PASS) {
        sessionStorage.setItem('isLoggedIn', 'true');
        loginErro.style.display = 'none';
        mostrarConteudoVip(true);
    } else {
        loginErro.style.display = 'block';
    }
});

logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('isLoggedIn');
    mostrarConteudoVip(false);
    loginSection.style.display = 'block';
    conteudoVip.style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
});

function mostrarConteudoVip(estaLogado) {
    loginSection.style.display = 'none';
    conteudoVip.style.display = 'none';
    conteudoPadrao.style.display = 'none';
    
    if (estaLogado) {
        conteudoVip.style.display = 'flex';
    } else {
        conteudoPadrao.style.display = 'block';
        navVipLink.classList.remove('active');
        const primeiroLink = document.querySelector('nav a:first-child');
        if (primeiroLink) {
             primeiroLink.classList.add('active');
        }
    }
}


// 4. Carrega tudo ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    // Apenas a chamada de Odds da Pinnacle é feita aqui para economizar cota.
    carregarJogos(); 

    // Lógica VIP
    mostrarConteudoVip(false); 

    if (sessionStorage.getItem('isLoggedIn') === 'true') {
         mostrarConteudoVip(true); 
         navVipLink.classList.add('active');
         const primeiroLink = document.querySelector('nav a:first-child');
         if (primeiroLink) {
             primeiroLink.classList.remove('active');
         }
    }
});
