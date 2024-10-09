let posts = JSON.parse(localStorage.getItem('posts')) || [];

document.getElementById('publish-button').addEventListener('click', function () {
    const postText = document.getElementById('post-text').value.trim();
    const postImageUpload = document.getElementById('post-image-upload').files[0];

    if (postText || postImageUpload) {
        const post = {
            username: document.getElementById('current-username').innerText,
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

function loadPosts() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `<strong>${post.username}</strong> <em>${post.timestamp}</em><br/>${post.text}`;
        if (post.image) {
            postElement.innerHTML += `<img src="${post.image}" style="max-width: 100%;" />`;
        }
        postList.appendChild(postElement);
    });
}

loadPosts();
