const models = require('../models');
module.exports = {
    checkemail: async function (req, res, next) {
        try {
            console.log(req.query.email);
            const user = await models.User.findOne({
                attribues: ['no'],
                where: {
                    email: req.query.email || ''
                }
            });
            res.send({
                result: "success",
                data: user,
                maessage: null
            });
        } catch (err) {
            next(err);
        }

    }
}