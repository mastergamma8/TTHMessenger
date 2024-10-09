let users = JSON.parse(localStorage.getItem('users')) || [];

document.getElementById('register-button').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        if (users.some(user => user.username === username)) {
            document.getElementById('message').innerText = 'Пользователь с таким именем уже существует!';
        } else {
            const newUser = { username, password, description: '', avatar: '', nickname: '' };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            document.getElementById('message').innerText = 'Регистрация успешна!';
            clearInputs();
        }
    } else {
        document.getElementById('message').innerText = 'Введите имя пользователя и пароль!';
    }
});

document.getElementById('login-button').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'block';
        document.getElementById('current-username').innerText = username;
        loadProfile(user);
    } else {
        document.getElementById('message').innerText = 'Неправильное имя пользователя или пароль!';
    }
});

document.getElementById('logout-button').addEventListener('click', function () {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('auth-screen').style.display = 'block';
});

function clearInputs() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}
