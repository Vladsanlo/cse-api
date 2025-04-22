const express = require('express');

const charactersservice=require('./character.services')

const routerApi = app => {
  //path global   {
  const router = express.Router();
  app.use('/api/v1',router);
  //  } sirve para "generalizar" una ruta,en este caso,todos van a usar /api/v1
  router.use('/service', charactersservice);
}
module.exports=routerApi;
