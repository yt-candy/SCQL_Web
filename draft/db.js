const mysql= require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'WangHan@520',
  database : 'user'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});