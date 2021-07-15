const models = require('../models');
const moment = require('moment');

module.exports = {
    list: async (req, res, next) => {
        try{
            const user = await models.Guestbook.findAll({
                attributes: ['no', 'name', 'password', 'message', 'regDate'],
                order : [ [ 'no' ,  'DESC' ] ]  
            });
            res.render('guestbook/list', {user: user, moment:moment});
        } catch (e) {
            next(e);
        }
    },

    add: async (req, res, next) => {
        try {
            const result = await models.Guestbook.create({ 
                name: req.body.name,
                password: req.body.password,
                message: req.body.content,
                regDate: models.sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
                });
            console.log(result);
            res.redirect('/guestbook/list');
        } catch (e) {
            next(e);
        }
    },

    delete: (req, res, next) => {
        try {
            res.render('guestbook/delete', { no: req.params.no || 0 });
        } catch (e) {
            next(e);
        }
    },

    _delete: async (req, res, next) => {
        try {
            const result = await models.Guestbook.destroy({ // 성공하면 1, 실패하면 0
                where: {
                    no: req.body.no,
                    password: req.body.password
                }
            });
            res.redirect('/guestbook/list');
        } catch (e) {
            next(e);
        }
    }
}