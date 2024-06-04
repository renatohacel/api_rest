const mysql = require("mysql2");
const config = require("../config");

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let conn;

function conMysql() {
  conn = mysql.createConnection(dbConfig);

  conn.connect((err) => {
    if (err) {
      console.log("[DB ERROR]", err);
      setTimeout(conMysql, 200);
    }
    console.log("BD Conectada");
  });

  conn.on("error", (err) => {
    console.log("[DB ERROR]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      conMysql();
    }
    throw error;
  });
}

conMysql()

function fetchAll(table) {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM ${table}`, (err, result) => {
            return err ? reject(err) : resolve(result)
        })
    })
}

function fetchOne(table, id) {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, result) => {
            return err ? reject(err) : resolve(result)
        })
    })
}

function addOne(table, data) {
    if(data && data.id === 0){
        return add(table, data)
    }else{
        return update(table, data)
    }
}

function remove(table, data) {
    return new Promise((resolve, reject) => {
        conn.query(`DELETE FROM ${table} WHERE id = ?`, data.id, (err, result) => {
            return err ? reject(err) : resolve(result)
        })
    })
}

function add(table, data) {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            return err ? reject(err) : resolve(result)
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE ${table} SET ? WHERE id = ?`,[data,data.id], (err, result) => {
            return err ? reject(err) : resolve(result)
        })
    })
}

module.exports = {
  fetchAll,
  fetchOne,
  addOne,
  update,
  remove,
};
