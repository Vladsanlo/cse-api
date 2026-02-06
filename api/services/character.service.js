const db = require('./query.service');

class CharactersService {
  constructor() {
    // Mapeo de campos: API Key -> Database Column
    this.columnMapping = {
      name: 'character_name',
      status: 'status_id', // Ajustado a status_id por la normalización
      deadCount: 'times_dead',
      shroomCount: 'times_shroom_taken',
      image: 'pfp'
    };
  }

  async getAll() {
    const queryText = `
      SELECT 
        c.id, 
        c.character_name AS name, 
        s.status, 
        c.times_dead AS "deadCount", 
        c.times_shroom_taken AS "shroomCount", 
        c.pfp AS image
      FROM characters c
      JOIN character_status s ON c.status_id = s.id
      ORDER BY c.id ASC
    `;
    const { rows } = await db.query(queryText);
    return rows;
  }

  async getById(id) {
    const queryText = `
      SELECT 
        c.id, 
        c.character_name AS name, 
        s.status, 
        c.times_dead AS "deadCount", 
        c.times_shroom_taken AS "shroomCount", 
        c.pfp AS image
      FROM characters c
      JOIN character_status s ON c.status_id = s.id
      WHERE c.id = $1
    `;
    const { rows } = await db.query(queryText, [id]);
    return rows[0] || null;
  }

  async create(data) {
    const { name, status, deadCount, shroomCount, image } = data;
    const queryText = `
      INSERT INTO characters (
        character_name, status_id, times_dead, times_shroom_taken, pfp
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING id, character_name AS name;
    `;
    const values = [name, status, deadCount || 0, shroomCount || 0, image];
    const { rows } = await db.query(queryText, values);
    return rows[0];
  }

  async update(id, body) {
    const columnsToUpdate = [];
    const values = [];

    Object.keys(this.columnMapping).forEach((apiKey) => {
      if (body[apiKey] !== undefined) {
        const dbColumn = this.columnMapping[apiKey];
        columnsToUpdate.push(`${dbColumn} = $${values.length + 1}`);
        values.push(body[apiKey]);
      }
    });

    if (columnsToUpdate.length === 0) return null;

    values.push(id);
    const queryText = `
      UPDATE characters 
      SET ${columnsToUpdate.join(', ')} 
      WHERE id = $${values.length} 
      RETURNING *;
    `;

    const { rows } = await db.query(queryText, values);
    return rows[0] || null;
  }

  async delete(id) {
    const queryText = 'DELETE FROM characters WHERE id = $1 RETURNING *';
    const { rows, rowCount } = await db.query(queryText, [id]);
    return rowCount > 0 ? rows[0] : null;
  }
}

module.exports = new CharactersService(); // Exportamos una instancia