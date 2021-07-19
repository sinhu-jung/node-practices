const models = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const site = await models.Site.findOne({
                attributes: ['title', 'welcome', 'profile', 'description']
            });
            res.render('main/index', {site: site});
        } catch (e) {
            next(e);
        }
    }
}