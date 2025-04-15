const mysql = require('mysql2');

const pool = mysql.createConnection({
    user: "root",
    password: "root",
    database: "Bela",
    host: "localhost",
    port: "3307"
});

exports.execute = (query, params = [], varpool = pool) => {
    return new Promise((resolve, reject) => {
        varpool.query(query, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results); // CORREÇÃO AQUI: retornando os resultados da query
            }
        });
    });
};

exports.pool = pool;
