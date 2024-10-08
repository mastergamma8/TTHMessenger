// Отображение и редактирование профиля
document.getElementById('edit-profile-button').addEventListener('click', function () {
    showScreen('edit-screen');
    document.getElementById('edit-username').value = currentUser.username;
    document.getElementById('edit-password').value = '';
    document.getElementById('edit-description').value = currentUser.description || '';
});

// Сохранение изменений профиля
document.getElementById('save-button').addEventListener('click', function () {
    currentUser.username = document.getElementById('edit-username').value;
    currentUser.password = document.getElementById('edit-password').value || currentUser.password;
    currentUser.description = document.getElementById('edit-description').value;

    const avatarUpload = document.getElementById('avatar-upload').files[0];
    if (avatarUpload) {
        const reader = new FileReader();
        reader.onload = function (e) {
            currentUser.avatar = e.target.result;
            localStorage.setItem('users', JSON.stringify(users));
            showProfileScreen();
        };
        reader.readAsDataURL(avatarUpload);
    } else {
        localStorage.setItem('users', JSON.stringify(users));
        showProfileScreen();
    }
});

// Отмена редактирования
document.getElementById('cancel-button').addEventListener('click', function () {
    showProfileScreen();
});

// Отображение иконки профиля
function displayProfileIcon() {
    document.getElementById('profile-icon').src = currentUser.avatar || 'images/default-avatar.png';
}
