module.exports = {
    index: (req, res, next) => {
        try {
            res.render('main/index')
        } catch (e) {
            next(e);
        }
    }
}