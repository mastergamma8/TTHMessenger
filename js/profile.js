function loadProfile(user) {
    document.getElementById('profile-nickname').value = user.nickname;
    document.getElementById('profile-description').value = user.description;
}

document.getElementById('save-profile').addEventListener('click', function () {
    const nickname = document.getElementById('profile-nickname').value;
    const description = document.getElementById('profile-description').value;
    
    const currentUsername = document.getElementById('current-username').innerText;
    const user = users.find(u => u.username === currentUsername);

    if (user) {
        user.nickname = nickname;
        user.description = description;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Профиль сохранён!');
    }
});
