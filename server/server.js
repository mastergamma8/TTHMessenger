const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к MongoDB
mongoose.connect('mongodb+### 6. Серверный код (server/server.js) - продолжение

```javascript
// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/tth_messenger', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Подключение к MongoDB успешно!'))
    .catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Модели данных
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    nickname: String,
    description: String,
});

const PostSchema = new mongoose.Schema({
    username: String,
    text: String,
    timestamp: Date,
});

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// API маршруты
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    try {
        await user.save();
        res.status(201).json({ message: 'Пользователь зарегистрирован!' });
    } catch (error) {
        res.status(400).json({ message: 'Ошибка регистрации пользователя', error });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Неправильное имя пользователя или пароль!' });
    }
});

app.get('/api/profile/:username', async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).json({ user });
});

app.put('/api/profile/:username', async (req, res) => {
    const { nickname, description } = req.body;
    await User.updateOne({ username: req.params.username }, { nickname, description });
    res.status(200).json({ message: 'Профиль обновлён!' });
});

app.post('/api/posts', async (req, res) => {
    const { username, text, timestamp } = req.body;
    const post = new Post({ username, text, timestamp });
    await post.save();
    res.status(201).json({ message: 'Пост опубликован!' });
});

app.get('/api/posts', async (req, res) => {
    const posts = await Post.find().sort({ timestamp: -1 });
    res.status(200).json({ posts });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
