/* Alterna entre o tema padrão e um tema de Alto Contraste / Modo Escuro.*/

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-contrast');
    const themeLink = document.getElementById('tema-preto-css');
    const body = document.body;

    // 1. Verifica o estado salvo no localStorage
    const currentTheme = localStorage.getItem('tema') || 'default';
    
    if (currentTheme === 'high-contrast') {
        themeLink.disabled = false;
        body.classList.add('high-contrast-mode');
    }

    // 2. Adiciona o listener ao botão
    if (toggleButton && themeLink) {
        toggleButton.addEventListener('click', () => {
            if (themeLink.disabled) {
                // Ativa o tema de alto contraste
                themeLink.disabled = false;
                body.classList.add('high-contrast-mode');
                localStorage.setItem('tema', 'high-contrast');
                toggleButton.textContent = 'Modo Padrão / Contraste Baixo';
                console.log('Modo Alto Contraste / Escuro Ativado.');
            } else {
                // Desativa e volta ao padrão
                themeLink.disabled = true;
                body.classList.remove('high-contrast-mode');
                localStorage.setItem('tema', 'default');
                toggleButton.textContent = 'Modo Escuro / Alto Contraste';
                console.log('Modo Padrão Ativado.');
            }
        });
    }
});