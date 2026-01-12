require('dotenv').config(); 

module.exports = {
  development: {
    username: "root",            // <--- Langsung tulis string
    password: "",                // <--- Kosongin kalo emang gak ada pass
    database: "db_komik_final", 
    host: "127.0.0.1",
    port: 3309,                  // <--- KITA PAKSA PAKE 3309 DISINI!
    dialect: "mysql", 
  },
  test: {
    username: "root",
    password: "",
    database: "db_komik_final_test",
    host: "127.0.0.1",
    port: 3309,
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "",
    database: "db_komik_final_prod",
    host: "127.0.0.1",
    port: 3309,
    dialect: "mysql",
  },
};