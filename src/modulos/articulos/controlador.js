const db = require("../../db/mysql");

const ArticulosTable = "articulos";

module.exports = function (dbInyectada) {
  let db = dbInyectada;

  if(!db){
    db = require('../../db/mysql')
  }

  function fetchAll() {
    return db.fetchAll(ArticulosTable);
  }

  function fetchOne(id) {
    return db.fetchOne(ArticulosTable, id);
  }

  function add(body) {
    return db.addOne(ArticulosTable, body);
  }

  function remove(body) {
    return db.remove(ArticulosTable, body);
  }
  return {
    fetchAll,
    fetchOne,
    remove,
    add,
  };
};
