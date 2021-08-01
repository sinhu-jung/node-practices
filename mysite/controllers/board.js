const models = require('../models');
const moment = require('moment');

module.exports = {
    list: async (req, res, next) => {
        try {
            let page = req.params.no || 0;
            let kwd = req.body.kwd || null;
            const listSize = 5;
            const pageSize = 5;
            const totalCount = await models.Board.findAll({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('*')), 'counts']]
            });
            let pageCount = Math.ceil(totalCount.counts / listSize);
            let blockCount = Math.ceil(pageCount / pageSize);
            let currentBlock = Math.ceil(page / pageSize);

            if( page > pageCount ) {
                page = pageCount;
                currentBlock = Math.ceil( page / pageSize );
            }		
            
            if( page < 1 ) {
                page = 1;
                currentBlock = 1;
            }

            const beginPage = currentBlock == 0 ? 1 : (currentBlock - 1) * pageSize + 1;
		    const prevPage = ( currentBlock > 1 ) ? ( currentBlock - 1 ) * pageSize : 0;
		    const nextPage = ( currentBlock < blockCount ) ? currentBlock * pageSize + 1 : 0;
		    const endPage = ( nextPage > 0 ) ? ( beginPage - 1 ) + listSize : pageCount;

            const list = await models.Board.findAll({
                include: {
                    model: models.User,
                    required: true
                },
                order : [ [ 'group_no' ,  'DESC' ] ]  ,
                limit: listSize
            });

            const map = {
                list: list,
                totalCount: totalCount,
                listSize: listSize,
                currentPage: page,
                beginPage: beginPage,
                endPage: endPage,
                prevPage: prevPage,
                keyword: kwd,
                nextPage: nextPage
            }

            res.render('board/list', {map, moment: moment});
        } catch (e) {
            next(e);
        }
    },

    write: (req, res, next) => {
        try {
            res.render('board/write');
        } catch (e) {
            next(e);
        }
    },

    _write: async (req, res, next) => {
        try {
            const groupNo = await models.Board.findOne({
                attributes: ['groupNo'],
                order : [ [ 'group_no' ,  'DESC' ] ]  
            });

            await models.Board.create({
                title: req.body.title,
                contents: req.body.content, 
                hit: req.body.hit || 0,
                groupNo: 0,
                orderNo: 0,
                depth: 0,
                userNo: req.session.no
            });

            res.redirect('/board/1');
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            await models.Board.destroy({
                where: {
                    no: req.params.no,
                    userNo: req.params.userNo
                }
            });

            res.redirect('/board/1');
        } catch (e) {
            next(e);
        }
    },

    view: async (req, res, next) => {
        try {
            await models.Board.update({
                hit: req.params.hit + 1
            }, {where: {no: req.params.no}});

            const content = await models.Board.findOne({
                attributes: ['no', 'title', 'contents', 'userNo'],
                where: {no: req.params.no}
            });

            res.render('board/view', {vo: content})
        } catch(e) {
            next(e);
        }
    },

    comment: (req, res, next) => {
        try{

        }catch(e){
            next(e);
        }
    }

}