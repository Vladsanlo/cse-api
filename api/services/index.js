const express = require('express');

const charactersService = require('./character.service')

const routerApi = app => {
  //path global   {
  const router = express.Router();
  app.use('/api/v1', router);
  //  } sirve para "generalizar" una ruta,en este caso,todos van a usar /api/v1
  router.use('/characters', charactersService);
}


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await charactersservice.delete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.message === 'Character not found' ? 404 : 500).json({
      error: error.message
    });
  }
});

// POST /api/v1/enemies
router.post('/', async (req, res) => {
  const { character_id, enemy_id } = req.body;
  try {
    const newEnmity = await enemyService.create(character_id, enemy_id);
    res.status(201).json(newEnmity);
  } catch (err) {
    res.status(400).json({ error: 'Already enemies or invalid IDs' });
  }
});

// GET /api/v1/enemies/character/1
router.get('/character/:id', async (req, res) => {
  const enemies = await enemyService.findByCharacter(req.params.id);
  res.json(enemies);
});



// POST: Vincular dos personajes como aliados
router.post('/', async (req, res) => {
  const { id1, id2 } = req.body;
  try {
    const alliance = await allianceService.create(id1, id2);
    res.status(201).json(alliance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET: Ver aliados de un ID
router.get('/:characterId', async (req, res) => {
  try {
    const allies = await allianceService.findByCharacter(req.params.characterId);
    res.json(allies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Romper alianza
router.delete('/', async (req, res) => {
  const { id1, id2 } = req.body;
  try {
    const result = await allianceService.delete(id1, id2);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


module.exports = routerApi;
