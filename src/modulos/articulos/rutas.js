const express = require("express");
const response = require("../../red/response");
const controlador = require("./index");

const router = express.Router();

//rutas
router.get("/", fetchAll);
router.get("/:id", fetchOne);
router.put("/", remove);
router.post("/", add)

//funciones
async function fetchAll(req, res, next) {
  try {
    const items = await controlador.fetchAll();
    response.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function fetchOne(req, res, next) {
  try {
    const items = await controlador.fetchOne(req.params.id);
    response.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const items = await controlador.remove(req.body);
    response.success(req, res, "Item eliminado", 200);
  } catch (err) {
    next(err);
  }
}

async function add(req, res, next) {
    try {
      const items = await controlador.add(req.body);
      if(req.body.id === 0){
        message = 'item guardado'
      }else{
        message = 'item actualizado'
      }
      response.success(req, res, message, 201);
    } catch (err) {
      next(err);
    }
  }



module.exports = router;
