const fs = require('fs');
const path = require('path');
const models = require('../models');

module.exports = {
    main: async (req, res, next) => {
        try {
            const site = await models.Site.findOne({
                attributes: ['title', 'welcome', 'profile', 'description']
            });
            res.render('admin/main', {site: site});
        } catch(e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const file = req.file;
            const storeDirectory = path.join(path.dirname(require.main.filename), process.env.STATIC_RESOURCES_DIRECTORY, process.env.GALLERY_STORE_LOCATION);
            const url = path.join(process.env.GALLERY_STORE_LOCATION, file.filename) + path.extname(file.originalname);
            const storePath = path.join(storeDirectory, file.filename) + path.extname(file.originalname);
            fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory);
            const content = fs.readFileSync(file.path);
            fs.writeFileSync(storePath, content, {flag: 'w+'});

            await User.update({
                title: req.body.title,
                welcome: req.body.welcome,
                profile:  url.replace(/\\/gi, '/'),
                description: req.body.description || ''
              });

            res.redirct('/admin')
        } catch (e) {
            next(e);
        }
    }
}