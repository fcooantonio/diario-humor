const welcomeModal = document.getElementById('welcome-modal');
const usernameInput = document.getElementById('username-input');
const startButton = document.getElementById('start-button');
const appContainer = document.getElementById('app-container');
const welcomeMessage = document.getElementById('welcome-message');

document.addEventListener('click', (event) => {
    if (event.target === startButton) {
        startApp();
    }
});

function startApp() {
    userName = usernameInput.value.trim();
    if (userName) {
        welcomeMessage.textContent = `Olá, ${userName}! Bem-vindo(a) ao seu diário.`;
        welcomeModal.classList.add('hidden');
        appContainer.classList.remove('hidden');

    } else {
        alert('Por favor, digite seu nome para continuar.');
    }
}