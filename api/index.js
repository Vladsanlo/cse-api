const express = require('express');

const routerApi=require('./services/index')

// const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

// require("express-async-errors");

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.com']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error);
    }
  }
}

routerApi(app);

app.get('/api', (req, res) => {
  res.send('Api de la serie Common Side Effects');
})

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Nueva Ruta');
})

//routerApi(app);

app.listen(port, () => {
  console.log('mi port' + port)
})
