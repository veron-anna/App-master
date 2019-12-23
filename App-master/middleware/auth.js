const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    //изъятие токена из заголовков
    const token = req.header('x-auth-token');
    //проверка на наличие токена
    if (!token) {
        return res.status(401).json({ msg: 'Нет токена, авторизация отклонена'});
    }
    //проверка токена
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json('Токен не подтвержен');
    }
}