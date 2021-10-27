const mySQL = require("mysql");
let mySQLConnection = mySQL.createConnection({
  host: "localhost",
  user: "deep",
  password: "deep1234",
  database: "pornvideolist",
  port: 3306,
});
mySQLConnection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log(err);
  }
});
module.exports = mySQLConnection;
