const express = require('express');
const router = express.Router();

const { 
  getManufacturers,
  getProductsByManufacturer,
  findManufacturer,
} = require('../db');

router.get('/show/:id', async (req, res) => {
  const { id } = req.params;
  const [man] = await findManufacturer(id);
  const products = await getProductsByManufacturer(id);
  res.render('manufacturers/show', { man, products });
});

router.get('/', async (req, res) => {
  const results = await getManufacturers();
  res.render('manufacturers/list', { items: results });
});



module.exports = router;
