const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const auth = require('../middleware/auth');
const User = require('../models/Users');

const {check, validationResult} = require('express-validator');

//@route GET api/auth
//@desc auth route
//@access Public
router.get('/', auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', [
    check('email', 'Укажите email').isEmail(),
    check('password', 'Необходимо указать пароль').exists()
], async (req,res) => { 
//валидация запроса
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
const { email, password } = req.body;
try {
    //проверка наличия пользователя
    let user = await User.findOne({ email });
    if (!user) {
        res.status(400).json({ errors: [{msg: 'Неправильные данные'}] });

    }
    //проверка совпадают ли пароли
    const isMath = await bcryptjs.compare(password, user.password);
    if (!isMath) {
        res.status(400).json({ errors: [{msg: 'Данные не корректны'}]});
    }
    //генерация загрузчика
    const payload = {
        user: { id: user.id }
    }
    //генерация токена
    jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600000},
    (err, token) => {
        if (err) throw err;
        res.json({ token });
    });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
}
});

module.exports = router;