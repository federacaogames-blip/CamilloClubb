// --- CONFIGURAÇÃO DA NOVA API DE ESTATÍSTICAS (SPORTAPI7) ---
const API_HOST_FUTEBOL = 'sportapi7.p.rapidapi.com';
const BASE_URL_FUTEBOL = 'https://sportapi7.p.rapidapi.com';

// --- CONFIGURAÇÃO DA API DA NBA FREE DATA (MANTIDA) ---
const API_HOST_NBA = 'nba-api-free-data.p.rapidapi.com';
const BASE_URL_NBA = 'https://nba-api-free-data.p.rapidapi.com';

// Sua chave de API (USADA PARA RAPIDAPI)
const API_KEY = '080ec70363mshf4bb5ff3cd88babp14b3d4jsn05e5bd4a7e31'; 

// Exemplo de usuário/senha VIP
const VIP_USER = 'camillovip';
const VIP_PASS = 'melhoresodds2025'; 

// --- FUNÇÃO CENTRAL DE FETCH (MANTIDA PARA RAPIDAPI) ---
async function fetchFromAPI(host, endpoint, baseUrl, key, method = 'GET', body = null) {
    const headers = {
        'X-Rapidapi-Key': key,
        'X-Rapidapi-Host': host,
    };
    
    if (method === 'POST' && body) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: method,
            headers: headers,
            body: body 
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}...`);
        }
        
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return await response.json();
        } else {
            return await response.text();
        }

    } catch (error) {
        console.error(`Erro na API (${host} - ${method}):`, error);
        return { error: true, message: error.message }; 
    }
}


// --- FUNÇÃO DE CARREGAMENTO DE JOGOS E ODDS (FICTÍCIAS/PALPITES) ---
// MANTIDA IGUAL À VERSÃO ANTERIOR
function carregarJogosFicticios() {
    const jogosLista = document.getElementById('jogosLista');
    
    const jogosFicticios = [
        { home: 'Arsenal', away: 'Tottenham', liga: 'Premier League', oddH: 1.80, oddD: 3.50, oddA: 4.10, date: '03/12 17:00' },
        { home: 'Real Madrid', away: 'Barcelona', liga: 'La Liga', oddH: 2.10, oddD: 3.40, oddA: 3.00, date: '04/12 16:30' },
        { home: 'Flamengo', away: 'Palmeiras', liga: 'Brasileirão', oddH: 2.30, oddD: 3.20, oddA: 2.80, date: '05/12 21:30' },
        { home: 'Bayern', away: 'Dortmund', liga: 'Bundesliga', oddH: 1.50, oddD: 4.50, oddA: 5.50, date: '06/12 14:00' },
    ];

    let jogosHTML = '';
    let oddDia = { jogo: 'Arsenal × Tottenham', odd: '1.80', desc: 'Vitória Simples do Arsenal (Palpite)' };
    
    jogosFicticios.forEach((jogo, index) => {
        const card = `
        <div class="jogo-card" style="animation-delay: ${index * 0.1}s;">
            <div class="info">
                <strong>${jogo.home}</strong> × <strong>${jogo.away}</strong><br>
                <small>${jogo.liga} - ${jogo.date} (PALPITE)</small>
            </div>
            <div class="odds">
                <span title="Vitória ${jogo.home}">${jogo.oddH}</span>
                <span title="Empate">${jogo.oddD}</span>
                <span title="Vitória ${jogo.away}">${jogo.oddA}</span>
            </div>
        </div>`;
        jogosHTML += card;
    });

    jogosLista.innerHTML = jogosHTML;
    document.getElementById('oddDiaJogo').textContent = oddDia.jogo;
    document.getElementById('oddDiaOdd').textContent = oddDia.odd;
    document.getElementById('oddDiaDesc').textContent = oddDia.desc;
}

// --- FUNÇÃO DE ESTATÍSTICAS DO FUTEBOL (USANDO SPORTAPI7) ---

async function buscarEstatisticasFutebol() {
    console.log("-> Buscando Ratings de Jogador (SportAPI7)...");
    
    // Endpoint fornecido (assumindo que retorna as estatísticas que você precisa)
    const endpoint = '/api/v1/player/817181/unique-tournament/132/season/65360/ratings'; 

    const dados = await fetchFromAPI(
        API_HOST_FUTEBOL, 
        endpoint, 
        BASE_URL_FUTEBOL, 
        API_KEY,
        'GET'
    );

    const estatisticasDadosDiv = document.getElementById('estatisticas-dados');
    const estatisticasTimeSmall = document.getElementById('estatisticas-time');
    
    if (dados && !dados.error && dados.ratings && dados.ratings.length > 0) {
        // Pegamos o primeiro rating para exibição
        const rating = dados.ratings[0];
        
        estatisticasTimeSmall.textContent = `Stats de Jogador (ID: 817181)`; 
        estatisticasDadosDiv.innerHTML = `
            <div class="stat-item"><span>Status API</span> <strong>✅ Conectado</strong></div>
            <div class="stat-item"><span>Rating Média</span> <strong>${rating.average}</strong></div>
            <div class="stat-item"><span>Temporada</span> <strong>${dados.season.name}</strong></div>
            <div class="stat-item"><span>Jogos Totais</span> <strong>${dados.count}</strong></div>
        `;
        console.log("✅ Dados da SportAPI7 Recebidos.");
    } else {
        estatisticasTimeSmall.textContent = `SportAPI: Falha/Cota`;
        estatisticasDadosDiv.innerHTML = `<div class="stat-item"><span>Status</span> <strong>❌ Erro/Cota</strong></div>`;
        console.warn("SportAPI7 falhou. Cota esgotada ou sem dados.");
    }
}


// --- INTEGRAÇÃO DA API DA NBA FREE DATA (MANTIDA) ---

async function buscarEstatisticasNBA() {
    console.log("-> Buscando Estatísticas da NBA (Free Data)...");
    const endpoint = "/nba-atlantic-team-list"; 
    
    const dados = await fetchFromAPI(
        API_HOST_NBA, 
        endpoint, 
        BASE_URL_NBA, 
        API_KEY,
        'GET' 
    );
    
    const mainContentWrapper = document.getElementById('main-content-wrapper');

    if (dados && !dados.error && dados.teams && dados.teams.length > 0) {
        const primeiroTime = dados.teams[0];

        const nbaSectionHTML = `
            <section id="nba-stats" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
                <h2>🏀 Times da Divisão Atlantic (NBA)</h2>
                <div class="highlight-card">
                    <h3>Primeiro Time Listado</h3>
                    <p>Nome: <strong>${primeiroTime.name}</strong></p>
                    <p>Cidade: <strong>${primeiroTime.city}</strong></p>
                    <small>Dados fornecidos pela NBA-API-Free-Data.</small>
                </div>
            </section>
        `;
        mainContentWrapper.insertAdjacentHTML('beforeend', nbaSectionHTML);
    } else {
        const nbaErrorHTML = `
            <section id="nba-stats" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
                <h2>🏀 Destaques da NBA</h2>
                <p style="color: #ff5555; text-align: center;">Não foi possível carregar os dados da NBA. Cota esgotada ou erro de conexão.</p>
            </section>
        `;
        mainContentWrapper.insertAdjacentHTML('beforeend', nbaErrorHTML);
    }
}


// --- LÓGICA VIP E CARREGAMENTO (MANTIDA IGUAL) ---
const navVipLink = document.getElementById('nav-vip-link');
const loginSection = document.getElementById('login-vip');
const conteudoPadrao = document.getElementById('conteudo-padrao');
const conteudoVip = document.getElementById('conteudo-vip');
const loginForm = document.getElementById('loginForm');
const loginErro = document.getElementById('loginErro');
const logoutBtn = document.getElementById('logoutBtn');

// ... (Restante da lógica VIP omitida por brevidade, mantendo-se a mesma) ...

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
    // 1. Odds/Palpites Fictícios
    carregarJogosFicticios(); 

    // 2. Estatísticas de Futebol (AGORA USANDO SPORTAPI7)
    buscarEstatisticasFutebol(); 
    
    // 3. Estatísticas de Basquete (NBA Free Data)
    buscarEstatisticasNBA();

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
