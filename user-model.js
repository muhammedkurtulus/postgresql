const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DB,
  password: process.env.PSQL_PW,
  port: +process.env.PSQL_PORT,
});

const getUsers = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM users", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const createUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;

    pool.query(
      `INSERT INTO users (name, email) VALUES ('${name}', '${email}') RETURNING *`,
      (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results.rows[0]);
      }
    );
  });
};

const deleteUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { id } = body;
    console.log("id", id);
    pool.query(`DELETE FROM users WHERE id = ${id}`, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`User deleted with ID: ${id}`);
    });
  });
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
};
