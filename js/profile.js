const apiUrl = 'http://localhost:3000/api';

async function loadProfile(username) {
    const response = await fetch(`${apiUrl}/profile/${username}`);
    const result = await response.json();
    return result.user;
}

async function updateProfile(username, nickname, description) {
    await fetch(`${apiUrl}/profile/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, description })
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const username = document.getElementById('current-username').innerText;
    const user = await loadProfile(username);
    if (user) {
        document.getElementById('profile-nickname').value = user.nickname;
        document.getElementById('profile-description').value = user.description;
    }
});

document.getElementById('save-profile').addEventListener('click', async function () {
    const nickname = document.getElementById('profile-nickname').value;
    const description = document.getElementById('profile-description').value;
    const username = document.getElementById('current-username').innerText;

    await updateProfile(username, nickname, description);
    alert('Профиль сохранён!');
});
