require('dotenv').config();
const mysql = require('mysql');
const fs = require('fs');

const DB_URL = process.env.NODE_ENV === 'production' ? process.env.CLEARDB_DATABASE_URL  : 'mysql://root:root@localhost/computer_store?reconnect=true';

const connection = mysql.createConnection(DB_URL);

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const getManufacturers = () => {
  return new Promise((resolve, reject) => {
    connection.query('select * from manufacturers', (err, results, fields) => {
      if(err) reject(err);
      resolve(results);
    });
  });
}

const getProducts = () => {
  return new Promise((resolve, reject) => {
    const query = `select products.code, products.name, products.price, 
    manufacturers.name as manufacturer, 
    manufacturers.code as man_code
    from products inner join manufacturers on products.manufacturer = manufacturers.code`
    connection.query(query, (err, results, fields) => {
      if(err) reject(err);
      resolve(results);
    });
  });
}

const getProductsByManufacturer = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'select * from products where manufacturer = ?';
    connection.query(query, [id], (err, results, fields) => {
      if(err) reject(err);
      resolve(results);
    });
  });
};

const findProduct = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`select * from products where code=${id}`, (err, results, fields) => {
      if(err) reject(err);
      resolve(results);
    });
  });
}

const findManufacturer = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`select * from manufacturers where code=${id}`, (err, results, fields) => {
      if(err) reject(err);
      resolve(results);
    });
  });
}

module.exports =  {
  connection,
  getProducts,
  getManufacturers,
  getProductsByManufacturer,
  findManufacturer,
  findProduct
}

