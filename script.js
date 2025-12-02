// --- CONFIGURAÇÃO DA API ---
const API_KEY = '080ec70363mshf4bb5ff3cd88babp14b3d4jsn05e5bd4a7e31'; // SUA CHAVE
const API_HOST = 'pinnacle-odds.p.rapidapi.com';
const BASE_URL = 'https://pinnacle-odds.p.rapidapi.com';

// Exemplo de usuário/senha VIP (DEVE SER MUDADO PARA SEGURANÇA REAL)
const VIP_USER = 'camillovip';
const VIP_PASS = 'melhoresodds2025'; 

// --- FUNÇÃO CENTRAL DE FETCH DA API ---
async function fetchFromAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'X-Rapidapi-Key': API_KEY,
                'X-Rapidapi-Host': API_HOST,
                ...options.headers
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}...`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na API:', error);
        return { error: true, message: error.message }; 
    }
}

// --- FUNÇÃO DE CARREGAMENTO DE FALLBACK (DADOS MOCADOS) ---
function carregarFallback() {
     const jogosLista = document.getElementById('jogosLista');
     jogosLista.innerHTML = `
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
    
    console.warn("Usando dados de Fallback devido a erro na API.");
}

// --- FUNÇÃO PRINCIPAL DE CARREGAMENTO DE JOGOS ---
async function carregarJogos() {
    const jogosLista = document.getElementById('jogosLista');
    jogosLista.innerHTML = '<div class="loading"><div class="spinner"></div><p>Carregando jogos...</p></div>';

    // Chama a API para pegar o meta-periods (necessário para a próxima chamada)
    const metaPeriods = await fetchFromAPI('/kit/v1/meta-periods?sport_id=1');
    if (metaPeriods && metaPeriods.error) { 
        carregarFallback();
        return;
    }

    // Chama a API para pegar as odds
    const oddsData = await fetchFromAPI('/kit/v1/odds?sport_id=1&period_number=1&odds_format=decimal&lang=en&date_format=iso');
    if (oddsData && oddsData.error || !oddsData?.leagues?.length) { 
        carregarFallback();
        return;
    }

    let jogosHTML = '';
    let oddDia = { jogo: '', odd: 'N/A', desc: '' };
    let count = 0;

    oddsData.leagues.forEach(league => {
        league.events?.forEach(event => {
            if (count >= 8) return; // Limita a 8 jogos

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
                    // Multiplicado por 1.5 para dar uma 'turbinada' na Odd do Dia de exemplo
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


// --- LÓGICA VIP (LOGIN/LOGOUT) ---

const navVipLink = document.getElementById('nav-vip-link');
const loginSection = document.getElementById('login-vip');
const conteudoPadrao = document.getElementById('conteudo-padrao');
const conteudoVip = document.getElementById('conteudo-vip');
const loginForm = document.getElementById('loginForm');
const loginErro = document.getElementById('loginErro');
const logoutBtn = document.getElementById('logoutBtn');

// 1. Alterna para a tela de Login/Conteúdo VIP
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

// 2. Processa o Login
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

// 3. Processa o Logout
logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('isLoggedIn');
    mostrarConteudoVip(false);
    loginSection.style.display = 'block';
    conteudoVip.style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
});

// Função para alternar as visualizações (Login/VIP/Padrão)
function mostrarConteudoVip(estaLogado) {
    loginSection.style.display = 'none';
    conteudoVip.style.display = 'none';
    conteudoPadrao.style.display = 'none';
    
    if (estaLogado) {
        conteudoVip.style.display = 'flex';
    } else {
        conteudoPadrao.style.display = 'block';
        navVipLink.classList.remove('active');
        // Mantém o primeiro link (Ao Vivo) como ativo ao voltar
        const primeiroLink = document.querySelector('nav a:first-child');
        if (primeiroLink) {
             primeiroLink.classList.add('active');
        }
    }
}

// 4. Carrega tudo ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    carregarJogos();

    // Inicia mostrando o conteúdo padrão
    mostrarConteudoVip(false); 

    // Verifica se o usuário estava logado na última sessão
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
         mostrarConteudoVip(true); 
         // Define a Área VIP como ativa na navegação
         navVipLink.classList.add('active');
         const primeiroLink = document.querySelector('nav a:first-child');
         if (primeiroLink) {
             primeiroLink.classList.remove('active');
         }
    }
});
