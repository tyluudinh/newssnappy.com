/**
 * Created by dinhty.luu@gmail.com on 1/11/17.
 */
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'root',
  database : 'espn_crawl',
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected Mysql!');
});

module.exports = connection;