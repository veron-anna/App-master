const express = require('express');
const router = express.Router();
const config = require('config');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');

const User = require('../models/Users');

//@route POST api/users
//@desc register route
//@access Public
router.post('/', [
    check('name', 'Укажите имя пользователя').not().isEmpty(),
    check('email', 'Укажите корректный email адрес').isEmail(),
    check('password', 'Укажите пароль длиной не менее 6 символов').isLength({ min:6 })
], async(req, res) => {
    //валидация данных
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //деструктор для извлечения данных пользователя
    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({ email })
        //проверка наличия пользователя
        if (user) {
            res.status(400).json({ errors: [{ msg: 'Пользователь уже существует БРО' }] });
        }
        //создание объекта пользователя
        user = new User({ name, email, password });
        //шифрование пароля
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password,salt);
        //сохранение пользователя
        await user.save();
        //создание загрузчика для генерации токена
        const payload = {
            user: { id: user.id }
        };
        //создание токена
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000},
        (err,token) => {
            if (err) throw err;
            res.json({ token })
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;