const mysql = require('mysql');
const util = require('util');

const dbconn = require('./dbconn');

module.exports = {
    findAll: async function() {
        const conn = dbconn();
        //const query = (sql, data) => new Promise((resolve, reject) => conn.query(sql, data, (error, rows, field) => error ? reject(error) : resolve(rows)));
        const query = util.promisify(conn.query).bind(conn);
        try {
            const results = await query("select first_name as firstName, last_name as lastName, email from emaillist order by no desc", []);
            return results;    
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },

    insert: function() {
    }
}