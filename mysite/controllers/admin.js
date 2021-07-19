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
            let url;
            if (file !== undefined){
                const storeDirectory = path.join(path.dirname(require.main.filename), process.env.STATIC_RESOURCES_DIRECTORY, process.env.GALLERY_STORE_LOCATION);
                url = path.join(process.env.GALLERY_STORE_LOCATION, file.filename) + path.extname(file.originalname);
                const storePath = path.join(storeDirectory, file.filename) + path.extname(file.originalname);
                fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory);
                const content = fs.readFileSync(file.path);
                fs.writeFileSync(storePath, content, {flag: 'w+'});
            }


            await models.Site.update({
                title: req.body.title,
                welcome: req.body.welcomeMessage,
                profile: url && url.replace(/\\/gi, '/') || undefined,
                description: req.body.description 
              }, {where: {}});

              req.app.siteTitle  = req.body.title;
            
            res.redirect('/admin');
        } catch (e) {
            next(e);
        }
    },

    guestbook: (req, res, next) => {
        try{
            res.render('admin/guestbook');
        } catch(e){
            next(e);
        }
    },

    board: (req, res, next) => {
        try{
            res.render('admin/board');
        } catch(e){
            next(e);
        }
    },

    user: (req, res, next) => {
        try{
            res.render('admin/user');
        } catch(e){
            next(e);
        }
    },
}