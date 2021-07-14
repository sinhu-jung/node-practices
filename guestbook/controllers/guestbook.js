const model = require('../models/guestbook');

module.exports = {
    index: async function(req, res) {
        const results = await model.findAll();
        res.render('index', {list:results || []});
    },

    add: async function(req, res){
        const results = await model.insert(req.body);
        console.log(results);
        res.redirect("/");
    },

    form: (req, res) => res.render('deleteform', { no: req.params.no || 0 }),

    delete: async (req, res) =>{
        const results = await model.del(req.body);
        console.log(results);
        res.redirect("/");
    }

}