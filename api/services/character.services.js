const express = require('express');
const router = express.Router();

let characters = [
  {
    id: 1,
    name: 'Marshall Cuso',
    status: 'vivo',
    aliansas: 'Frances applewhite,Hildy,Hillbily',
    dead: '6 veces',
    hongo:'6 veces tomado',
    amor: 'Frances applewhite',
    image: 'https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/marshall_cuso.png'
  },
  {
    id: 2,
    name: 'Frances Applewhite',
    status: 'viva',
    aliansas: 'Marshall cuso,hillbilly,Reutical',
    dead: '0',
    hongo:'1 vez tomado',
    amor: 'Marshall Cuso ',
    image: 'https://static.tvtropes.org/pmwiki/pub/images/frances_applewhite.png'
  },
  {
    id: 3,
    name: 'Jonas Backstein',
    status: 'Vivo, en coma',
    aliansas: 'Reutical',
    dead: '0',
    hongo:'mas de una vez',
    amor: 'dinero',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ObdHG93t5GcSGGmG_9l0tuIM2YcHcbLCLw&s'
  },
  {
    id: 4,
    name: 'Agente Copano',
    status: 'vivo',
    aliansas: 'DEA,Agente Harrington',
    dead: '0',
    hongo:'1 vez',
    amor: 'ninguno',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAOL_q3qUsmrHJcaYG9faQLjCpVa5EKKld4A&s'
  },
  {
    id: 5,
    name: 'Agente Harrington',
    status: 'vivo',
    aliansas: 'DEA,Agente Copano',
    dead: '0',
    hongo:'0 veces',
    amor: 'Amelia',
    image: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2025/03/common-side-effects-season-1-finale-9.jpg'
  },
  {
    id: 6,
    name: 'Hildy',
    status: 'viva',
    aliansas: 'Marshall cuso,Hillbilly,Sadius,Linda Tree',
    dead: '1 vez',
    hongo:'1 vez',
    amor: 'ninguno',
    image: 'https://media.cdn.adultswim.com/uploads/20250131/thumbnails/2_251311454265-CommonSideEffects-103-Hildy-1920x1080.jpg'
  },
  {
    id: 7,
    name: 'Amelia ',
    status: 'viva',
    aliansas: 'DEA,Hildy,Hillbilly',
    dead: '0',
    hongo:'0 veces',
    amor: 'Agente Harrington',
    image: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2025/02/common-side-effects-episode-103.jpg'
  },
  {
    id: 8,
    name: 'Rick Kruger',
    status: 'vivo',
    aliansas: 'Riutical,Frances AppleWhite',
    dead: '0',
    hongo:'0 veces',
    amor: 'ninguno',
    image: 'https://media.tenor.com/6z8O3uQa3xgAAAAe/next-question-rick-kruger.png'
  },
  {
    id: 9,
    name: 'Policia Jimmer Jarvis	',
    status: 'vivo',
    aliansas: 'Rusty,Marshall Cuso,Frances Applewhite,hildy',
    dead: '0',
    hongo:'0 veces',
    amor: 'esposa',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy-qmgin_YJ11jOIocCoOE1V4HNFkZowqRGQ&s'
  },
  {
    id: 10,
    name: 'Rusty',
    status: 'muerto',
    aliansas: 'Policia Jimmer Jarvis,Marshall Cuso,Frances Applewhite,hildy',
    dead: '1',
    hongo:'0 veces',
    amor: 'ninguno',
    image: 'https://static.wikia.nocookie.net/doblaje/images/4/41/Sobrino_de_Jimmer-EC.png/revision/latest?cb=20250217210801&path-prefix=es'
  },
  {
    id: 11,
    name: 'Nick',
    status: 'vivo',
    aliansas: 'Frances applewhite',
    dead: '0',
    hongo:'0 veces',
    amor: 'Frances applewhite',
    image: 'https://static.wikia.nocookie.net/doblaje/images/3/38/Nick-EC.png/revision/latest?cb=20250217204304&path-prefix=es  '
  },
  {
    id: 12,
    name: 'Cecily',
    status: 'viva',
    aliansas: 'Riutical,Rick Kruger,DEA',
    dead: '0',
    hongo:'0 veces',
    amor: 'ninguno',
    image: 'https://static.wikia.nocookie.net/doblaje/images/6/65/Cecily-EC.png/revision/latest?cb=20250311003434&path-prefix=es'
  },
  {
    id: 13,
    name: 'Sadius',
    status: 'vivo',
    aliansas: 'Hildy,Linda Tree',
    dead: '0',
    hongo:'0 veces',
    amor: 'ninguno',
    image: 'https://static.wikia.nocookie.net/doblaje/images/6/68/Sadius-EC.png/revision/latest?cb=20250217210343&path-prefix=es'
  },
  {
    id: 14,
    name: 'Linda Tree',
    status: 'viva',
    aliansas: 'Hildy,sadius',
    dead: '0',
    hongo:'0 veces',
    amor: 'ninguno',
    image: 'https://static.wikia.nocookie.net/doblaje/images/a/ae/Linda_Tree-EC.png/revision/latest?cb=20250328202401&path-prefix=es'
  },
  {
    id: 15,
    name: 'Sonia Applewhite',
    status: 'muerta',
    aliansas: 'Frances Applewhite',
    dead: '1',
    hongo:'1 vez',
    amor: 'Ninguno',
    image: 'https://static.wikia.nocookie.net/doblaje/images/b/bb/Sonia_Applewhite-EC.png/revision/latest?cb=20250318004241&path-prefix=es'
  },
  {
    id: 16,
    name: 'Kenji		',
    status: 'vivo',
    aliansas: 'DEA,Agente Copano,Agente Harrington,Cecily',
    dead: '0',
    hongo:'0 veces',
    amor: 'ninguno',
    image: 'https://static.wikia.nocookie.net/doblaje/images/c/c4/Agente_hombre_2-EC.png/revision/latest?cb=20250311003538&path-prefix=es'
  },
  {
    id: 17,
    name: 'Kiki',
    status: 'viva',
    aliansas: 'Frances Applewhite,Riutical,Rick Kruger',
    dead: '0',
    hongo:'0 veces',
    amor: 'ninguno',
    image: 'https://static.wikia.nocookie.net/doblaje/images/3/33/Kiki-EC.png/revision/latest?cb=20250311005030&path-prefix=es'
  },
  {
    id: 18,
    name: 'Hoang',
    status: 'vivo',
    aliansas: 'Marshall Cuso',
    dead: '0',
    hongo:'0 veces',
    amor: 'ninguno',
    image: 'https://static.wikia.nocookie.net/doblaje/images/5/5b/Hoang-EC.png/revision/latest?cb=20250311005017&path-prefix=es'
  },
  {
    id: 19,
    name: 'John Taylor',
    status: 'vivo',
    aliansas: 'Marshall Cuso',
    dead: '1 vez',
    hongo:'1 vez',
    amor: 'esposa',
    image: 'https://static.wikia.nocookie.net/doblaje/images/c/cf/John_Taylor2-EC.png/revision/latest?cb=20250328202447&path-prefix=es'
  },
  {
    id: 20,
    name: 'Zane',
    status: 'vivo',
    aliansas: 'Marshall Cuso',
    dead: '0',
    hongo:'0 veces',
    amor: 'ninguno',
    image: 'https://static.wikia.nocookie.net/doblaje/images/a/a4/Zane-EC.png/revision/latest?cb=20250215202345&path-prefix=es'
  },
  {
  id: 21,
  name: ' Agente hombre de la DEA',
  status: 'muerto',
  aliansas: 'DEA,Riutical',
  dead: '1',
  hongo:'0 veces',
  amor: 'esposa',
  image: 'https://static.wikia.nocookie.net/doblaje/images/2/25/Agente_ep.6_2-EC.png/revision/latest?cb=20250311004957&path-prefix=es'
},
]

router.get('/', (req, res) => {
  res.json(characters)
})
//ejercicio
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundCharacter = characters.find(({ id: character_id }) => character_id == id)

  if (foundCharacter)
    res.json(foundCharacter)
  else
    res.json({ error: 'Not found' })
})

router.post('/', (req, res) => {
  const { name, type } = req.body;
  const newCharacter = { id: characters.length + 1, name: name, type: type }

  characters = [...characters, newCharacter]

  res.json(newCharacter)
})



module.exports = router;
