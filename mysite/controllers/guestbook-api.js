const models = require('../models');
const { Op } = require("sequelize");

module.exports = {
    create: async (req, res, next) => {
        try {   
            const result = await models.Guestbook.create({ 
                name: req.body.name,
                password: req.body.password,
                message: req.body.message,
                regDate: models.sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
                });
            console.log(result);

            res.status(200).send({
                result: 'success',
                data: Object.assign(result, {
                    password: '',
                }),
                message: null
            })
        } catch (e) {
            next(e);
        }
    },
    
    read: async function(req, res, next) {
        try {
            const startNo = req.query.sno || 0;
            const results = await models.Guestbook.findAll({
                attributes: ['no', 'name', 'message'],
                where: (startNo > 0) ? {no: {[Op.lt]: startNo}} : {},
                order: [
                    ['no', 'desc']
                ],
                limit: 3
            });

            res.send({
                result: 'success',
                data: results,
                message: null
            });
        } catch(err){
          next(err);
        }       
    },
    delete: async function(req, res, next) {
        try {
            const result = await models.Guestbook.destroy({
                where: {
                    [Op.and]: [{no: req.params.no}, {password: req.body.password}]
                }
            });
            res.send({
                result: 'success',
                data: req.params.no,
                message: null
            });
        } catch(err){
            next(err);
        }
    }  
}