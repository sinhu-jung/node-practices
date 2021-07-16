const models = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try{
            res.render('gallery/index');
        } catch (e) {
            next(e);
        }
    }
}