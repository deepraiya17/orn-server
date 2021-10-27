const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const PornRoutes = require("./PornRoutes");
const mySQLConnection = require("./connection");

const app = express();
const port = process.env.PORT || 3000;
app.use(json());
app.use(cors());
app.use(morgan("combined"));
app.use("/ron", PornRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
