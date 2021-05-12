require('dotenv').config();
const mysql = require('mysql');

const DB_HOST = process.env.NODE_ENV === 'production' ? process.env.MYSQL_HOST : 'localhost';
const DB_USER = process.env.NODE_ENV === 'production' ? process.env.MYSQL_USER : 'root';
const DB_PASS = process.env.NODE_ENV === 'production' ? process.env.MYSQL_PASSWORD : 'root';
const DB_NAME = process.env.NODE_ENV === 'production' ? process.env.MYSQL_DATABASE : 'computer_store';

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME
});

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

