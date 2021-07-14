const models = require('../models');

module.exports = {
    joinform: (req, res) => res.render('user/joinform'),
    
    joinsuccess: (req, res) => {
        console.log(req.body);
        res.render('user/joinsuccess');
    },
    
    join: async (req, res) => {
        const result = await models.User.create({ 
            name: req.body.name , 
            email: req.body.email, 
            password: req.body.password, 
            gender: req.body.gender });
        console.log(result);
        res.redirect('/user/joinsuccess');
    },

    loginform: (req, res) => res.render('user/loginform'),
    
    login: async (req, res) => {
        const user = await models.User.findOne({
            attributes: ['no', 'name', 'role'],
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });
        if(user == null){
            res.render('user/loginform', {
                result: 'fail'
            });
        }
        res.redirect('/');
    }
}