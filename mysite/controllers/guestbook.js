const models = require('../models');
const moment = require('moment');

module.exports = {
    list: async (req, res) => {
        const user = await models.Guestbook.findAll({
            attributes: ['no', 'name', 'password', 'message', 
            [models.sequelize.Sequelize.fn('date_format', models.sequelize.Sequelize.col('reg_Date'),'%Y-%m-%d'), 'regDate']],
            order : [ [ 'no' ,  'DESC' ] ]  
        });
        res.render('guestbook/list', {user: user});
    },

    add: async (req, res) => {
        const result = await models.Guestbook.create({ 
            name: req.body.name,
            password: req.body.password,
            message: req.body.content,
            regDate: models.sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
            });
        console.log(result);
        res.redirect('/guestbook/list');
    },

    delete: (req, res) => {
        res.render('guestbook/delete', { no: req.params.no || 0 })
    }
    ,

    _delete: async (req, res) => {
        const result = await models.Guestbook.destroy({ // 성공하면 1, 실패하면 0
            where: {
                no: req.body.no,
                password: req.body.password
            }
        });
        res.redirect('/guestbook/list');
    }
}