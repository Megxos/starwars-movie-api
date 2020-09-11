const msql = require("mysql");
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

let connection = msql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});
connection.connect((error)=>{
    if(error) return console.log(error);
    console.log("database connection successful");
});

module.exports = connection;