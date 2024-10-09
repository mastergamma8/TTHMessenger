const apiUrl = 'http://localhost:3000/api'; // Убедитесь, что вы используете правильный адрес

async function register(username, password) {
    const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return response.json();
}

async function login(username, password) {
    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return response.json();
}

document.getElementById('register-button').addEventListener('click', async function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        const result = await register(username, password);
        document.getElementById('message').innerText = result.message || 'Регистрация успешна!';
    } else {
        document.getElementById('message').innerText = 'Введите имя пользователя и пароль!';
    }
});

document.getElementById('login-button').addEventListener('click', async function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await login(username, password);
    if (result.success) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'block';
        document.getElementById('current-username').innerText = username;
    } else {
        document.getElementById('message').innerText = result.message || 'Неправильное имя пользователя или пароль!';
    }
});

document.getElementById('logout-button').addEventListener('click', function () {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('auth-screen').style.display = 'block';
});
