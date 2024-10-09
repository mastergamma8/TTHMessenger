const apiUrl = 'http://localhost:3000/api';

async function publishPost(username, text) {
    await fetch(`${apiUrl}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, text, timestamp: new Date().toISOString() })
    });
}

async function loadPosts() {
    const response = await fetch(`${apiUrl}/posts`);
    const result = await response.json();
    return result.posts;
}

document.getElementById('publish-button').addEventListener('click', async function () {
    const postText = document.getElementById('post-text').value.trim();
    const username = document.getElementById('current-username').innerText;

    if (postText) {
        await publishPost(username, postText);
        loadPostList();
        document.getElementById('post-text').value = '';
    } else {
        alert('Введите текст.');
    }
});

async function loadPostList() {
    const posts = await loadPosts();
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `<strong>${post.username}</strong> <em>${new Date(post.timestamp).toLocaleString()}</em><br/>${post.text}`;
        postList.appendChild(postElement);
    });
}

loadPostList();
