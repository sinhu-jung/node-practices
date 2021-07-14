const models = require('../models');

module.exports = {
    joinform: (req, res) => res.render('user/joinform'),
    
    joinsuccess: (req, res) => {
        console.log(req.body);
        res.render('user/joinsuccess');
    },
    
    join: async (req, res) => {
        // const result = await User.create({ firstName: "Jane", lastName: "Doe" });
        res.redirect('/user/joinsuccess');
    }
}