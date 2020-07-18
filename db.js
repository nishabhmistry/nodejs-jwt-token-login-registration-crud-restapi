const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'DB HOST',
  user: 'DB USERNAME',
  password: 'DB PASSWORD',
  database: 'DB NAME'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

module.exports = connection;
