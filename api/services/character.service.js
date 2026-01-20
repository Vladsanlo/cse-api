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

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  // 1. Map req.body keys to Database column names
  const mapping = {
    name: 'character_name',
    status: 'status',
    deadCount: 'times_dead',
    shroomCount: 'times_shroom_taken',
    image: 'pfp'
  };

  const columnsToUpdate = [];
  const values = [];

  // 2. Build the query based on mapped keys
  Object.keys(mapping).forEach((apiKey) => {
    if (body[apiKey] !== undefined) {
      const dbColumn = mapping[apiKey];
      columnsToUpdate.push(`${dbColumn} = $${values.length + 1}`);
      values.push(body[apiKey]);
    }
  });

  if (columnsToUpdate.length === 0) {
    return res.status(400).json({ error: 'No valid fields provided' });
  }

  // Add the ID as the final parameter
  values.push(id);

  try {
    const queryText = `
      UPDATE characters 
      SET ${columnsToUpdate.join(', ')} 
      WHERE id = $${values.length} 
      RETURNING *;
    `;

    const { rows } = await db.query(queryText, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
})

module.exports = router;
