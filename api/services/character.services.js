const express = require('express');
const router = express.Router();

let characters = [
  {
    id: 1,
    name: 'jose',
    type: 'employee',
    image: ''
  },
  {
    id: 2,
    name: 'katy',
    type: 'customer'
  },
  {
    id: 3,
    name: "Hildy",
    type: "Culera"
  }
]

router.get('/', (req, res) => {
  res.json(characters)
})
//ejercicio
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundCharacter = characters.find(({id: character_id}) => character_id == id)

  if (foundCharacter)
    res.json(foundCharacter)
  else
    res.json({error: 'Not found'})
})

router.post('/', (req, res) => {
  const { name, type } = req.body;
  const newCharacter =  { id: characters.length + 1,  name: name, type: type }

  characters = [...characters, newCharacter]

  res.json(newCharacter)
})



module.exports = router;
