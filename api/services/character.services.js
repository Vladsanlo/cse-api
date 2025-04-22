const express = require('express');

router.get('/', (req, res) => {
  res.json([
    {
      name: 'jose',
      type: 'employee'
    },
    {
      name: 'katy',
      type: 'customer'
    }
  ])
})
//ejercicio
router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id: id,
    name: 'marshal cuso',
    type: 'employee',
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id: id,
    name: 'frances applewhite',
    type: 'employee',
  })
})



module.exports = CharactersService
