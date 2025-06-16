const welcomeModal = document.getElementById('welcome-modal');
const usernameInput = document.getElementById('username-input');
const startButton = document.getElementById('start-button');
const appContainer = document.getElementById('app-container');
const welcomeMessage = document.getElementById('welcome-message');

const emojiSelector = document.querySelector('.emoji-selector');
const emojis = document.querySelectorAll('.emoji');
const selectedMoodNameInput = document.getElementById('selected-mood-name');
const selectedMoodIconInput = document.getElementById('selected-mood-icon');
const moodReasonTextarea = document.getElementById('mood-reason');
const saveButton = document.getElementById('save-button');

document.addEventListener('click', (event) => {
    if (event.target === startButton) {
        startApp();
    }
});

function startApp() {
    userName = usernameInput.value.trim();
    if (userName) {
        welcomeMessage.textContent = `Olá, ${userName}! Boas-vindas ao seu diário.`;
        welcomeModal.classList.add('hidden');
        appContainer.classList.remove('hidden');
    } else {
        alert('Por favor, digite seu nome para continuar.');
    }
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('emoji')) {
        emojis.forEach(emoji => emoji.classList.remove('selected'));
        const selectedEmoji = event.target;
        selectedEmoji.classList.add('selected');
        selectedMoodNameInput.value = selectedEmoji.dataset.mood;
        selectedMoodIconInput.value = selectedEmoji.dataset.icon;
    } else if (event.target === saveButton) {
        const selectedMoodName = selectedMoodNameInput.value.trim();
        const selectedMoodIcon = selectedMoodIconInput.value.trim();
        const moodReason = moodReasonTextarea.value.trim();

        if (selectedMoodName && selectedMoodIcon && moodReason) {
            alert(`Sentimento salvo: ${selectedMoodName} - ${selectedMoodIcon}\nMotivo: ${moodReason}`);
        } else {
            alert('Por favor, selecione um sentimento e escreva um motivo.');
        }
    }
});
