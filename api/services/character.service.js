const express = require('express');
const router = express.Router();

const db = require('./query.service')

router.get('/', async (req, res) => {
  try {
    const queryText = `
      SELECT 
        c.id, 
        c.character_name, 
        s.status, 
        c.times_dead, 
        c.times_shroom_taken, 
        c.pfp
      FROM characters c
      JOIN character_status s ON c.status = s.id
      ORDER BY c.id ASC
    `;
    const { rows } = await db.query(queryText);

    res.json(rows);
  } catch (err) {

    console.error(err);

    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const queryText = `
    SELECT * FROM characters WHERE id = $1
  `

  const { rows } = await db.query(queryText, [id])

  if (rows.length === 1)
    res.json(rows[0])
  else
    res.json({ error: 'Not found' })
})

router.post('/', async (req, res) => {
  const { name, status, times_dead, times_shroom_taken, pfp } = req.body;
  const newCharacter = [name, status, times_dead, times_shroom_taken, pfp]

  const queryText = `
    INSERT INTO characters (
      character_name,
      status,
      times_dead,
      times_shroom_taken,
      pfp
    ) VALUES (
      $1, $2, $3, $4, $5
    )
  `

  await db.query(queryText, newCharacter);

  res.json(newCharacter)
})



module.exports = router;
