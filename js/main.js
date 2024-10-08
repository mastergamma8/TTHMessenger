let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let darkTheme = localStorage.getItem('darkTheme') === 'true';

// Применить тему при загрузке
document.body.classList.toggle('dark-theme', darkTheme);

// Показать экран регистрации
document.getElementById('welcome-screen').style.display = 'block';

// Функция для показа экранов
function showScreen(screenId) {
    const screens = ['welcome-screen', 'feed-screen', 'profile-screen', 'settings-screen', 'edit-screen'];
    screens.forEach(screen => {
        document.getElementById(screen).classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

// Показать экран ленты
function showFeedScreen() {
    showScreen('feed-screen');
    loadPosts();
    displayProfileIcon();
}

// Показать экран профиля
function showProfileScreen() {
    showScreen('profile-screen');
    displayProfileInfo();
}

// Функция для отображения информации профиля
function displayProfileInfo() {
    document.getElementById('profile-avatar').src = currentUser.avatar || 'images/default-avatar.png';
    document.getElementById('profile-username').innerText = currentUser.username;
    document.getElementById('profile-description').innerText = currentUser.description || 'Описание профиля';
    document.getElementById('profile-nickname').innerText = currentUser.nickname ? `@${currentUser.nickname}` : '';
}

// Показать экран входа
document.getElementById('login-button').addEventListener('click', function () {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    currentUser = users.find(user => user.username === username && user.password === password);

    if (currentUser) {
        showFeedScreen();
    } else {
        document.getElementById('message').innerText = 'Неправильное имя пользователя или пароль!';
    }
});
