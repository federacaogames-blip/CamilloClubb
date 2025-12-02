// --- FUNÇÃO DE CARREGAMENTO DE FALLBACK (AGORA MOSTRA APENAS O ERRO) ---

function carregarFallback() {
     const jogosLista = document.getElementById('jogosLista');
     
     // Remove os jogos de simulação e exibe a mensagem de erro da API
     jogosLista.innerHTML = `
        <div style="text-align:center; padding: 50px 0;">
            <i class="fas fa-exclamation-triangle" style="color: #ff5555; font-size: 3rem; margin-bottom: 15px;"></i>
            <p style="color:#ff5555; font-size: 1.2rem; margin-top: 20px; font-weight: 600;">
                ⚠️ **ERRO NA API.** <br>
                Não foi possível carregar as odds ao vivo. <br>
                O limite de requisições gratuitas pode ter sido esgotado.
            </p>
        </div>`;
    
    // Zera os dados da Odd do Dia também
    document.getElementById('oddDiaJogo').textContent = 'Erro de Conexão';
    document.getElementById('oddDiaOdd').textContent = '0.00';
    document.getElementById('oddDiaDesc').textContent = 'Tente recarregar mais tarde.';
    
    console.warn("Usando fallback: API falhou ou cota esgotada.");
}
