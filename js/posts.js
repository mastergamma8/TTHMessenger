// Публикация поста
document.getElementById('publish-button').addEventListener('click', function () {
    const postText = document.getElementById('post-text').value;
    const postImageUpload = document.getElementById('post-image-upload').files[0];

    if (postText || postImageUpload) {
        const post = {
            username: currentUser.username,
            text: postText,
            image: '',
            timestamp: new Date().toLocaleString()
        };

        if (postImageUpload) {
            const reader = new FileReader();
            reader.onload = function (e) {
                post.image = e.target.result;
                posts.push(post);
                localStorage.setItem('posts', JSON.stringify(posts));
                loadPosts();
            };
            reader.readAsDataURL(postImageUpload);
        } else {
            posts.push(post);
            localStorage.setItem('posts', JSON.stringify(posts));
            loadPosts();
        }

        document.getElementById('post-text').value = '';
        document.getElementById('post-image-upload').value = '';
    } else {
        alert('Введите текст или загрузите изображение.');
    }
});

// Загрузка постов
function loadPosts() {
    const feedContainer = document.getElementById('feed-container');
    feedContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const postHeader = document.createElement('div');
        postHeader.innerHTML = `<strong>${post.username}</strong> <span>${post.timestamp}</span>`;
        postElement.appendChild(postHeader);

        const postText = document.createElement('p');
        postText.innerText = post.text;
        postElement.appendChild(postText);

        if (post.image) {
            const postImage = document.createElement('img');
            postImage.src = post.image;
            postImage.classList.add('post-image');
            postElement.appendChild(postImage);
        }

        feedContainer.appendChild(postElement);
    });
}
