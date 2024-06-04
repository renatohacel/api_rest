const express = require("express");
const config = require("./config");
const articulos = require("./modulos/articulos/rutas");
const morgan = require("morgan");
const errors = require("./red/errors");
const users = require("./modulos/users/rutas");

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config
app.set("port", config.app.port);

//rutas

app.use("/api/articulos", articulos);
app.use("/api/users", users);


app.use(errors)

module.exports = app;
