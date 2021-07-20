const dotenv = require('dotenv');
const path = require('path');
const assert = require('assert').strict;

dotenv.config({path: path.join(path.resolve(__dirname, '..'), 'config/db.env')})

describe('Model User', function(){
    let models = null;

    before(async function(){
        models = require('../models');
    });
    
    it('Test!!!!!', async function(){
        const user = await models.User.findOne({
            where: {
                no: 3
            }
        });
        assert.equal(user.no, 3);
    });

    after(async function(){
    });
})