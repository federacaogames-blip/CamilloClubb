document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa o conteúdo
    renderJogosDoDia();
    renderOddDoDia();
    renderNbaPage(); 
    renderMultiplaDia(); 
    renderBingoPage(); 
    
    // 2. Configura a interatividade principal
    setupNavigation(); 
    setupVipArea();
    setupGameCardToggle();
    
    // Assegura que a página inicial esteja visível e ativa ao carregar
    document.getElementById('jogos-dia').style.display = 'block';
    document.querySelector('[data-page="jogos-dia"]').classList.add('active');
});

// [ ... todas as outras funções de renderização (renderJogosDoDia, renderMultiplaDia, etc.) permanecem as mesmas ]

// =======================================================
// Funções de Interatividade, Navegação e Login
// =======================================================

// Funções renderJogosDoDia, renderOddDoDia, renderMultiplaDia, renderNbaPage, renderBingoPage (Sem alterações do último bloco)
// ... [Mantenha aqui as funções completas que enviei anteriormente, elas são muito longas para repetir]

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-item');
    
    const hideAllPages = () => {
        document.querySelectorAll('.page-content').forEach(page => page.style.display = 'none');
        navLinks.forEach(link => link.classList.remove('active'));
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const pageId = link.getAttribute('data-page');
            
            // CRÍTICO: Se o ID não existe ou o link é inválido, pare aqui.
            if (!pageId) {
                e.preventDefault();
                console.error("Link de navegação sem atributo data-page.");
                return;
            } 
            
            e.preventDefault();
            
            if (pageId === 'vip-login') {
                handleVipAreaClick(link);
                return;
            }
            
            hideAllPages();
            link.classList.add('active');
            
            const targetPage = document.getElementById(pageId);
            
            // CRÍTICO: Checa se a página existe antes de tentar mostrar
            if (targetPage) {
                targetPage.style.display = 'block';
            } else {
                console.error(`Página com ID #${pageId} não encontrada no HTML!`);
                // Volta para a página principal para evitar que o site trave
                document.getElementById('jogos-dia').style.display = 'block';
                document.querySelector('[data-page="jogos-dia"]').classList.add('active');
            }
        });
    });
}
// [ ... todas as outras funções (setupVipArea, setupGameCardToggle, etc.) permanecem as mesmas ]
