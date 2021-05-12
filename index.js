const express = require('express');
const bodyParser = require('body-parser');

const productRouter = require('./routes/products');
const manufacturerRouter = require('./routes/manufacturers');

const PORT = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/products', productRouter);
app.use('/manufacturers', manufacturerRouter);

app.get('/', (req, res) => {
  res.render('index');
});


app.listen(PORT, () => {
  console.log('Listening on PORT: ', PORT);
});

//connection.end();
