// --- CONFIGURAÇÃO DA NOVA API DE ESTATÍSTICAS (SOCCERSAPI) ---
const SOCCERSAPI_USER = 'i2SEG';
const SOCCERSAPI_TOKEN = '9GCBipYN1E';
const BASE_URL_SOCCERSAPI = `https://api.soccersapi.com/v2.2`;
const SOCCERSAPI_AUTH = `?user=${SOCCERSAPI_USER}&token=${SOCCERSAPI_TOKEN}`;

// --- CONFIGURAÇÃO DA API DA NBA FREE DATA (MANTIDA) ---
const API_HOST_NBA = 'nba-api-free-data.p.rapidapi.com';
const BASE_URL_NBA = 'https://nba-api-free-data.p.rapidapi.com';
const API_KEY = '080ec70363mshf4bb5ff3cd88babp14b3d4jsn05e5bd4a7e31'; // Sua chave RapidAPI

// Exemplo de usuário/senha VIP
const VIP_USER = 'camillovip';
const VIP_PASS = 'melhoresodds2025'; 

// --- FUNÇÃO CENTRAL DE FETCH (MANTIDA PARA RAPIDAPI) ---
async function fetchFromAPI(host, endpoint, baseUrl, key, method = 'GET', body = null) {
    // ... (Esta função é mantida, mas agora é usada apenas pela NBA API) ...
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

function carregarJogosFicticios() {
    const jogosLista = document.getElementById('jogosLista');
    
    // Dados de jogos e palpites que você mesmo irá gerenciar
    const jogosFicticios = [
        { home: 'Arsenal', away: 'Tottenham', liga: 'Premier League', oddH: 1.80, oddD: 3.50, oddA: 4.10, date: '03/12 17:00' },
        { home: 'Real Madrid', away: 'Barcelona', liga: 'La Liga', oddH: 2.10, oddD: 3.40, oddA: 3.00, date: '04/12 16:30' },
        { home: 'Flamengo', away: 'Palmeiras', liga: 'Brasileirão', oddH: 2.30, oddD: 3.20, oddA: 2.80, date: '05/12 21:30' },
        { home: 'Bayern', away: 'Dortmund', liga: 'Bundesliga', oddH: 1.50, oddD: 4.50, oddA: 5.50, date: '06/12 14:00' },
    ];

    let jogosHTML = '';
    let oddDia = { jogo: 'Arsenal × Tottenham', odd: '1.80', desc: 'Vitória Simples do Arsenal (Palpite)' };
    
    // ... (Construção dos cards HTML mantida igual) ...
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

// --- FUNÇÃO DE ESTATÍSTICAS DO FUTEBOL (USANDO SOCCERSAPI) ---

async function buscarEstatisticasFutebol() {
    console.log("-> Buscando Ligas de Futebol (SoccersAPI)...");
    
    // Endpoint para buscar a lista de ligas
    const endpoint = `/leagues/${SOCCERSAPI_AUTH}&t=list`; 

    try {
        const response = await fetch(`${BASE_URL_SOCCERSAPI}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const dados = await response.json();
        
        const estatisticasDadosDiv = document.getElementById('estatisticas-dados');
        const estatisticasTimeSmall = document.getElementById('estatisticas-time');

        if (dados && dados.data && dados.data.length > 0) {
            // Pegamos o nome da primeira liga para mostrar que a conexão funcionou
            const primeiraLiga = dados.data[0];
            
            // Você pode mudar este HTML para exibir estatísticas como 'Gols', 'Escanteios' etc.
            // assim que tiver os endpoints corretos (ex: /livescore)
            estatisticasTimeSmall.textContent = `SoccersAPI: Conectado`; 
            estatisticasDadosDiv.innerHTML = `
                <div class="stat-item"><span>Status</span> <strong>✅ OK</strong></div>
                <div class="stat-item"><span>1ª Liga</span> <strong>${primeiraLiga.name}</strong></div>
                <div class="stat-item"><span>ID da Liga</span> <strong>${primeiraLiga.league_id}</strong></div>
            `;
            console.log("✅ Dados da SoccersAPI Recebidos. Primeira Liga:", primeiraLiga.name);
        } else {
            estatisticasTimeSmall.textContent = `SoccersAPI: Sucesso, mas sem dados`;
            estatisticasDadosDiv.innerHTML = `<div class="stat-item"><span>Status</span> <strong>✅ Conexão OK</strong></div>`;
        }

    } catch (error) {
        console.error(`Erro na SoccersAPI:`, error);
        const estatisticasDadosDiv = document.getElementById('estatisticas-dados');
        const estatisticasTimeSmall = document.getElementById('estatisticas-time');
        estatisticasTimeSmall.textContent = `SoccersAPI: Erro ${error.message}`;
        estatisticasDadosDiv.innerHTML = `<div class="stat-item"><span>Status</span> <strong>❌ Erro</strong></div>`;
    }
}


// --- INTEGRAÇÃO DA API DA NBA FREE DATA (MANTIDA) ---

async function buscarEstatisticasNBA() {
    console.log("-> Buscando Estatísticas da NBA (Free Data)...");
    const endpoint = "/nba-atlantic-team-list"; 
    
    // Usando a função fetchFromAPI para a API RapidAPI
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

    // 2. Estatísticas de Futebol (AGORA USANDO SOCCERSAPI)
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
