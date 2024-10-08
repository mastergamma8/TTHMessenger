// Регистрация нового пользователя
document.getElementById('register-button').addEventListener('click', function () {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

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
        document.getElementById('message').innerText = 'Введите имя пользователя и пароль

!';
    }
});

// Очистка полей ввода
function clearInputs() {
    document.getElementById('register-username').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
}
