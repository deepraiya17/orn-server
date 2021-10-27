const express = require("express");
const Router = express.Router();
const mySQLConnection = require("../connection");

Router.post("/insert", (req, res) => {
  try {
    mySQLConnection.query(req.body.query, (err, rows, fields) => {
      if(err) res.status(406).send({errorMsg:err});
      else res.send("Success");
    });
  } catch (er) {
    res.status(405).send({ er });
  }
});
Router.put("/update", (req, res) => {
  try {
    mySQLConnection.query(req.body.query, (err, rows, fields) => {
      if(err) res.status(406).send({errorMsg:err});
      else res.send("Success");
    });
  } catch (er) {
    res.status(405).send({ er });
  }
});
Router.put("/get", (req, res) => {
  try {
    mySQLConnection.query(req.body.query, (err, rows, fields) => {
      if(err) res.status(406).send({errorMsg:err});
      else res.send(rows);
    });
  } catch (er) {
    res.status(405).send({ er });
  }
});
module.exports = Router;
