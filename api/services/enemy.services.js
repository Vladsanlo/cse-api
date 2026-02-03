class EnemyService {
    constructor(pgc) {
      this.pgc = pgc;
    }
  
    // ALTA (Crear relación de enemigos)
    async create(id1, id2) {
      // Aseguramos que el menor vaya primero para cumplir con el CHECK de la DB
      const [low, high] = [Math.min(id1, id2), Math.max(id1, id2)];
      
      const query = `
        INSERT INTO character_enemies (character_id_1, character_id_2)
        VALUES ($1, $2)
        RETURNING *;
      `;
      const res = await this.pgc.query(query, [low, high]);
      return res.rows[0];
    }
  
    // CONSULTA (Listar todos los enemigos de un personaje específico)
    async findByCharacter(characterId) {
      const query = `
        SELECT c.id, c.character_name, c.pfp
        FROM characters c
        JOIN character_enemies e ON (c.id = e.character_id_1 OR c.id = e.character_id_2)
        WHERE (e.character_id_1 = $1 OR e.character_id_2 = $1)
        AND c.id <> $1;
      `;
      const res = await this.pgc.query(query, [characterId]);
      return res.rows;
    }
  
    // CONSULTA (Listar todas las rivalidades existentes)
    async findAll() {
      const query = `
        SELECT 
          c1.character_name as character, 
          c2.character_name as enemy 
        FROM character_enemies e
        JOIN characters c1 ON e.character_id_1 = c1.id
        JOIN characters c2 ON e.character_id_2 = c2.id;
      `;
      const res = await this.pgc.query(query);
      return res.rows;
    }
  
    // BAJA (Eliminar una rivalidad específica)
    async delete(id1, id2) {
      const [low, high] = [Math.min(id1, id2), Math.max(id1, id2)];
      const query = `
        DELETE FROM character_enemies 
        WHERE character_id_1 = $1 AND character_id_2 = $2
        RETURNING *;
      `;
      const res = await this.pgc.query(query, [low, high]);
      if (res.rowCount === 0) throw new Error('Enmity relationship not found');
      return { message: 'Rivalry ended' };
    }
  
    // MODIFICACIÓN (Cambiar un enemigo por otro)
    // Nota: En tablas intermedias, "modificar" suele ser borrar y crear uno nuevo.
    async update(oldEnemyId, newEnemyId, mainCharacterId) {
      await this.delete(mainCharacterId, oldEnemyId);
      return await this.create(mainCharacterId, newEnemyId);
    }
  }
  
  module.exports = EnemyService;