const models = require('../models');
const { Sequelize } = require('sequelize');

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

    read: async (req, res, next)  => {
        try {
            const startNo = req.query.sno || 0;
            if(startNo == 0){
                const results = await models.Guestbook.findAll({
                    order: [['no','DESC']],
                    offset: 0, limit: 3
                });
                res.status(200).send({
                    result: 'success',
                    data: results || [],
                    message: null
                });
            } else {
                const results = await models.Guestbook.findAll({   
                    where:{
                        no: { [Sequelize.Op.lt] : startNo }  
                    },
                    order: [['no','DESC']],
                    offset: 0, limit: 3
                });
                res.status(200).send({
                    result: 'success',
                    data: results || [],
                    message: null
                });
            }

        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try{
            const result = await models.Guestbook.destroy({ // 성공하면 1, 실패하면 0
                where: {
                    no: req.params.no,
                    password: req.body.password
                }
            });

            res.status(200).send({
                result:'success',
                data: req.params.no,
                message: null
            })
        } catch (e) {
            next(e);
        }
    }
}