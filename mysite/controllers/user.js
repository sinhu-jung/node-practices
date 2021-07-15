const models = require('../models');

module.exports = {
    join: (req, res, next) => {
        try {
            res.render('user/join')
        } catch (e) {
            next(e);
        }
    },
    
    joinsuccess: (req, res, next) => {
        try {
            res.render('user/joinsuccess');
        } catch(e){
            next(e);
        }
    },
    
    _join: async (req, res, next) => {
        try {
            const result = await models.User.create({ 
                name: req.body.name , 
                email: req.body.email, 
                password: req.body.password, 
                gender: req.body.gender });
            console.log(result);
            res.redirect('/user/joinsuccess');
        } catch (e) {
            next(e);
        }
    },

    login: (req, res, next) => {
        try {
            res.render('user/login')    
        } catch(e) {
            next(e);
        }
    },
    
    _login: async (req, res, next) => {
        try {
            const user = await models.User.findOne({
                attributes: ['no', 'name', 'role'],
                where: {
                    email: req.body.email,
                    password: req.body.password
                }
            });
            if(user == null){
                res.render('user/login', Object.assign(req.body, {result: 'fail', password: ''}));
                return;
            }

            // 로그인 처리 
            req.session.authUser = user;
            res.redirect('/'); 
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            await req.session.destroy();
            res.redirect("/");
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const user = await models.User.findOne({
                attributes: ['name', 'email', 'role', 'gender'],
                where: {
                    no: req.session.authUser.no
                }
            });
            res.render('user/update', {user: user.dataValues});
        } catch (e) {
            next(e);
        }
    },

    _update: async (req, res, next) => {
        try {
            req.body.name == '' ? req.body.name = req.session.authUser.name : req.session.authUser.name = req.body.name

            const updateObject = Object.assign(req.body);
            if(req.body.password == ''){
                delete updateObject['password'];
            }

            // const {[req.body.password == '' ? 'password' : '']: remove, ...updateObject} = req.body;

            const user = await models.User.update(
                updateObject , {where: {no: req.session.authUser.no}})
            res.redirect('/');
        } catch(e) {
            next(e);
        }
    }
 
}