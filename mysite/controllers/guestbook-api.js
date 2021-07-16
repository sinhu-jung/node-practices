module.exports = {
    create: async (req, res, next) => {
        try {   
            console.log(req.body);

            res.status(200).send({
                result: 'success',
                data: Object.assign(req.body, {
                    no: 10,
                    password: '',
                    regDate: new Date()
                }),
                message: null
            })
        } catch (e) {
            next(e);
        }
    },

    read: async (req, res, next)  => {
        try {
            const startNo = req.query.sno || 0;
            console.log(startNo);

            res.status(200).send({
                result: 'success',
                data: [{ no : 9, name: '둘리', message: '호이~', regDate: new Date()}, 
                {no : 8, name: '마이콜', message: '구공ㅌ탄', regDate: new Date()}, 
                {no : 7, name: '도우너', message: '둘리야~', regDate: new Date()}]
            })

        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try{
            console.log(req.params.no + ":" + req.body.password);
            res.status(200).send({
                result:'success',
                data: req.params.no,
                message: null
            })
        } catch (e) {
            next(e);
        }
    }
}