var mysqlb = require('mysql2/promise');
const mysql = require('mysql')

require('dotenv').config();

async function query(sql, params) {

    var connection =await mysqlb.createConnection({
        host: "localhost",
        user: "root",
        password: "tasnim",
        port: 3306 ,
        database: "mes_database"
        
    });

    const [results] = await connection.execute(sql, params)

    return results;
}


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tasnim",
    port: 3306 ,
    database: "mes_database",
    
});
connection.connect()


module.exports = {query:query, connection: connection};