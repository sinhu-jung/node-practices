const models = require('../models');

module.exports = {
    join: (req, res) => res.render('user/join'),
    
    joinsuccess: (req, res) => {
        console.log(req.body);
        res.render('user/joinsuccess');
    },
    
    _join: async (req, res) => {
        const result = await models.User.create({ 
            name: req.body.name , 
            email: req.body.email, 
            password: req.body.password, 
            gender: req.body.gender });
        console.log(result);
        res.redirect('/user/joinsuccess');
    },

    login: (req, res) => res.render('user/login'),
    
    _login: async (req, res) => {
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
    },

    logout: async (req, res) => {
        await req.session.destroy();
        res.redirect("/");
    },

    update: async (req, res) => {
        const user = await models.User.findOne({
            attributes: ['name', 'email', 'role', 'gender'],
            where: {
                no: req.session.authUser.no
            }
        });
        res.render('user/update', {user: user.dataValues});
    },

    _update: async (req, res) => {
        req.body.name == '' ? req.body.name = req.session.authUser.name : req.session.authUser.name = req.body.name

        if(req.body.password == ''){
            req.body.password = req.session.authUser.password;
        }

        const user = await models.User.update(
            req.body, {where: {no: req.session.authUser.no}})
        res.redirect('/');
    }
 
}