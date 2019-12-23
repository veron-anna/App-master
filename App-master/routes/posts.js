const express = require('express');
const router = express.Router();

const Post = require('../models/Posts');
const User = require('../models/Users');

const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');

//@route POST api/post
//@desc создание постов пользователей
//@access Private
router.post('/', auth, [
    check('text', 'Укажите текст для сообщения')
], async (req,res) => {
    //валидация запроса
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //поиск id пользователя
        const user = await User.findById(req.user.id).select('-password');
        //создание объекта поста
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            user:req.user.id
        });
        //сохраниение поста в бд
        const post = await newPost.save();
        //ответ сервера
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route PUT api/posts/:id
//@desc обновление постов пользователя
//@access Private
router.put('/:id', auth, [
    check('text', 'Введите текст').not().isEmpty()
], async (req,res) => {
    //валидация запроса
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //поиск поста по id
        const post = await Post.findById(req.params.id);
        if (!post) {
        return res.status(400).json({ msg: 'Пост не найден' });
        }
        //проверка пользователя
        if (post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Пользователь не авторизован'});
        }
        //сохранение текста в объект поста
        post.text = req.body.text;
        //сохранение поста
        await post.save();
        //ответ сервера
        res.json(post);    
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route /api/posts/:id
//@desc удаление поста пользователем
//@access Private
router.delete('/:id', auth, async (req,res) => {
    try {
         //поиск поста по id
         const post = await Post.findById(req.params.id);
         if (!post) {
         return res.status(400).json({ msg: 'Пост не найден' });
         }
         //проверка пользователя
         if (post.user.toString() !== req.user.id){
             return res.status(401).json({ msg: 'Пользователь не авторизован'});
         }
         //удаление поста
         await post.delete();
         res.json({ msg: 'Post deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET /api/posts
//@desc вывод всех постов пользователя
//@acess private
router.get('/', auth, async (req,res) => {
    try {
        const user_id = req.user.id;
        const posts = await Post.find({'user': user_id }).sort({ date:-1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//route GET /api/posts/all
//@desc вывести все посты пользователей
//@access Private
router.get('/all/', auth, async (req,res) => {
    try {
        const posts = await Post.find().sort({ date:-1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;