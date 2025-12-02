// --- CONFIGURAÇÃO DA API DA PINNACLE (JÁ EXISTENTE) ---
const API_KEY_PINNACLE = '080ec70363mshf4bb5ff3cd88babp14b3d4jsn05e5bd4a7e31'; // SUA CHAVE
const API_HOST_PINNACLE = 'pinnacle-odds.p.rapidapi.com';
const BASE_URL_PINNACLE = 'https://pinnacle-odds.p.rapidapi.com';

// --- CONFIGURAÇÕES DAS NOVAS APIs (Chaves mantidas, mas sem chamada automática) ---
const API_HOST_FUTEBOL = 'wosti-futebol-tv-brasil.p.rapidapi.com';
const BASE_URL_FUTEBOL = 'https://wosti-futebol-tv-brasil.p.rapidapi.com';
const API_HOST_NBA = 'api-nba-v1.p.rapidapi.com';
const BASE_URL_NBA = 'https://api-nba-v1.p.rapidapi.com';

// Exemplo de usuário/senha VIP (DEVE SER MUDADO PARA SEGURANÇA REAL)
const VIP_USER = 'camillovip';
const VIP_PASS = 'melhoresodds2025'; 

// --- FUNÇÃO CENTRAL DE FETCH ---
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

// --- FUNÇÃO DE CARREGAMENTO DE FALLBACK (Mostra o erro de cota/conexão) ---

function carregarFallback() {
     const jogosLista = document.getElementById('jogosLista');
     
     // Conteúdo de erro de cota
     jogosLista.innerHTML = `
        <div style="text-align:center; padding: 50px 0;">
            <i class="fas fa-exclamation-triangle" style="color: #ff5555; font-size: 3rem; margin-bottom: 15px;"></i>
            <p style="color:#ff5555; font-size: 1.2rem; margin-top: 20px; font-weight: 600;">
                ⚠️ **ERRO NA API.** <br>
                Não foi possível carregar as odds ao vivo. <br>
                O limite de requisições gratuitas pode ter sido esgotado.
            </p>
        </div>`;
    
    // Zera os dados de Odd do Dia
    document.getElementById('oddDiaJogo').textContent = 'Erro de Conexão';
    document.getElementById('oddDiaOdd').textContent = '0.00';
    document.getElementById('oddDiaDesc').textContent = 'Tente recarregar mais tarde.';
    
    console.warn("Usando fallback: API falhou ou cota esgotada.");
}

// --- FUNÇÃO PRINCIPAL DE CARREGAMENTO DE JOGOS (PINNACLE) ---

async function carregarJogos() {
    const jogosLista = document.getElementById('jogosLista');
    jogosLista.innerHTML = '<div class="loading"><div class="spinner"></div><p>Carregando odds reais da Pinnacle...</p></div>';

    // Se a API falhar ou a cota acabar, ele cai no carregarFallback()
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
    
    let jogosHTML = '';
    let oddDia = { jogo: '', odd: 'N/A', desc: '' };
    let count = 0;

    oddsData.
