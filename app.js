require('./database/db');
const express = require('express');
const cookie_parser = require('cookie-parser');
const router_products = require('./routes/products');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookie_parser());
app.use('/api/products', router_products);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
