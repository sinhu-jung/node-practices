const mysql = require('mysql');
const util = require('util');

const dbconn = require('./dbconn');

module.exports = {
    findAll: async function(){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            return results = await query("select no, name, password, message, date_format(reg_date, '%Y/%m/%d %H:%i:%s') as regDate from guestbook order by no desc", []);
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },

    insert: async function(guestbook) {
        console.log(guestbook);
        console.log(Object.values(guestbook));
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            return results = await query("insert into guestbook values(null, ?, ?, ?, now())", Object.values(guestbook));
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },

    del: async function(guestbook){
        console.log(guestbook);
        console.log(Object.values(guestbook));
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            return results = await query("delete from guestbook where no = ? and password = ?", Object.values(guestbook));
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    }

}