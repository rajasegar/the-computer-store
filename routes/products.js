const express = require('express');
const router = express.Router();

const { 
  connection,
  getManufacturers,
  getProducts,
  findProduct
} = require('../db');

router.get('/', async (req, res) => {
  const products = await getProducts();

  const manufacturers = await getManufacturers();

  res.render('products/list', { products, manufacturers });
});

router.get('/new', async (req, res) => {
  const manufacturers = await getManufacturers();
  res.render('new-product', { manufacturers });
});

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const [product] = await findProduct(id);
  const manufacturers = await getManufacturers();
  res.render('edit-product', { product, manufacturers });
});

router.post('/', async (req,res) => {
  connection.query('insert into products set ?', req.body, (err, results ,fields) => {
    if(err) throw err;
    console.log(results.insertId);
  });
  res.redirect('/products');
});

router.post('/edit/:id', async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const { name, price, manufacturer } = req.body;
  connection.query('update products set name = ?, price = ?, manufacturer = ? where code = ? ', [name,price, manufacturer, id], (err, results, fields) => {
    if(err) throw err;

  });
  res.redirect('/products');
});

const getProductInfo = (id) => {
  return new Promise((resolve, reject) => {
    const query = `select products.name, products.price,
    manufacturers.code,
    manufacturers.name as manufacturer from products
    inner join manufacturers on products.code = ? and
    products.manufacturer = manufacturers.code`;

    connection.query(query,[id], (err, results, fields) => {
      if(err) reject(err);
      resolve(results);
    });
  });
};

router.get('/show/:id', async (req, res) => {
  const { id } = req.params;
  const [product] = await getProductInfo(id);
  res.render('products/show', { product });
});



module.exports = router;
