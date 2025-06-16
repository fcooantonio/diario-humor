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

const weeklyHistoryContainer = document.getElementById('weekly-history');
const moodSummaryContainer = document.getElementById('mood-summary');

let userName = '';
let moodHistory = JSON.parse(localStorage.getItem('moodDiaryData')) || [];

function startApp() {
    userName = usernameInput.value.trim();
    if (userName) {
        welcomeMessage.textContent = `Olá, ${userName}! Boas-vindas ao seu diário.`;
        welcomeModal.classList.add('hidden');
        appContainer.classList.remove('hidden');
        updateDisplay();
    } else {
        alert('Por favor, digite seu nome para continuar.');
    }
}

function handleEmojiSelect(event) {
    if (!event.target.classList.contains('emoji')) return;

    emojis.forEach(emoji => emoji.classList.remove('selected'));
    const selectedEmoji = event.target;
    selectedEmoji.classList.add('selected');

    selectedMoodNameInput.value = selectedEmoji.dataset.mood;
    selectedMoodIconInput.value = selectedEmoji.dataset.icon;
}

function saveMoodEntry() {
    const moodName = selectedMoodNameInput.value;
    const moodIcon = selectedMoodIconInput.value;
    const reason = moodReasonTextarea.value.trim();

    if (!moodName || !moodIcon) {
        alert('Por favor, selecione um humor clicando em um ícone.');
        return;
    }

    const newEntry = {
        date: new Date().toISOString(),
        mood: moodName,
        icon: moodIcon,
        reason: reason,
    };

    moodHistory.unshift(newEntry);
    localStorage.setItem('moodDiaryData', JSON.stringify(moodHistory));

    updateDisplay();
    clearInputs();
}

function updateDisplay() {
    displayWeeklyHistory();
    displayMoodSummary();
}

function displayWeeklyHistory() {
    weeklyHistoryContainer.innerHTML = '';
    const recentHistory = moodHistory.slice(0, 7);

    if (recentHistory.length === 0) {
        weeklyHistoryContainer.innerHTML = '<p>Nenhum registro encontrado ainda. Salve seu primeiro humor!</p>';
        return;
    }

    recentHistory.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = 'entry';

        const entryDate = new Date(entry.date);
        const formattedDate = entryDate.toLocaleDateString('pt-BR', {
            weekday: 'long', day: '2-digit', month: 'long'
        });

        entryElement.innerHTML = `
            <span class="material-symbols-outlined entry-emoji">${entry.icon}</span>
            <div class="entry-details">
                <p class="entry-date">${formattedDate} (${entry.mood})</p>
                <p class="entry-reason">${entry.reason || 'Nenhum motivo informado.'}</p>
            </div>
        `;
        weeklyHistoryContainer.appendChild(entryElement);
    });
}

function displayMoodSummary() {
    moodSummaryContainer.innerHTML = '';
    if (moodHistory.length === 0) return;

    const moodCounts = moodHistory.reduce((acc, entry) => {
        if (!acc[entry.icon]) {
            acc[entry.icon] = 0;
        }
        acc[entry.icon]++;
        return acc;
    }, {});

    for (const icon in moodCounts) {
        const count = moodCounts[icon];
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `<span class="material-symbols-outlined">${icon}</span> x ${count}`;
        moodSummaryContainer.appendChild(summaryItem);
    }
}

function clearInputs() {
    emojis.forEach(emoji => emoji.classList.remove('selected'));
    selectedMoodNameInput.value = '';
    selectedMoodIconInput.value = '';
    moodReasonTextarea.value = '';
}

startButton.addEventListener('click', startApp);
usernameInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') startApp();
});
emojiSelector.addEventListener('click', handleEmojiSelect);
saveButton.addEventListener('click', saveMoodEntry);