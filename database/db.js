const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://admin:admin@localhost:27017/products?directConnection=true&authSource=products'

mongoose.connect(uri);

const con = mongoose.connection;
con.on('error', (err) => console.error('Could not connect to MongoDB, ' + err));
con.once('open', () => console.log('Connected to MongoDB...'));

process.on('exit', function(){
    mongoose.disconnect();
});

module.exports = con;
