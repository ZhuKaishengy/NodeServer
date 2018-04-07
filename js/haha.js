var express = require("express");
var app = express();

app.use(express.static("/html")).listen(9001);