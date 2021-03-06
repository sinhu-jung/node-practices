const dotenv = require('dotenv');
const path = require('path');
const should = require('chai').should();

dotenv.config({path: path.join(path.resolve(__dirname, '..'), 'config/db.env')})

describe('Model Board', function(){
    let models;
    let user;
    before(async function(){
        models = require('../models');
        user = await models.User.create({
            name: 'testUser',
            email: 'testUser@mysite.com',
            password: '1234',
            gender: 'male'
        });
    });
    
    it('Create 3 Board', async function(){
        let board;
        board = await models.Board.create({
            title: 'test',
            contents: 'test',
            hit: 0,
            userNo: user.no
        }); 
        board.no.should.not.equals(undefined);     

        board = await models.Board.create({
            title: 'test',
            contents: 'test',
            hit: 0,
            userNo: user.no
        }); 
        board.no.should.not.equals(undefined);     

        board = await models.Board.create({
            title: 'test',
            contents: 'test',
            hit: 0,
            userNo: user.no
        }); 
        board.no.should.not.equals(undefined); 
    });

    it("Fetch Boards by user(test)", async function() {
        const result = await models.Board.findAll({
            where: {
                userNo: user.no
            },
            include: {
                model: models.User,
                required: true
            }
        });

        result.should.have.lengthOf(3);
    });

    after(async function(){
        await models.User.destroy({
            where: {
                no: user.no
            }
        });

        await models.Board.destroy({
            where: {
                userNo: user.no
            }
        });
    });
})