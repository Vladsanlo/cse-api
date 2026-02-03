class AllianceService {
    constructor(pgc) {
      this.pgc = pgc;
    }
  
    // ALTA: Crear una nueva alianza
    async create(id1, id2) {
      // Ordenamos para que el ID menor siempre sea el 1 (evita duplicados espejo)
      const [low, high] = [Math.min(id1, id2), Math.max(id1, id2)];
      
      const query = `
        INSERT INTO character_alliances (character_id_1, character_id_2)
        VALUES ($1, $2)
        RETURNING *;
      `;
      try {
        const res = await this.pgc.query(query, [low, high]);
        return res.rows[0];
      } catch (error) {
        if (error.code === '23505') { // Error de llave duplicada en Postgres
          throw new Error('Esta alianza ya existe');
        }
        throw error;
      }
    }
  
    // CONSULTA: Obtener todos los aliados de un personaje específico
    async findByCharacter(characterId) {
      const query = `
        SELECT c.id, c.character_name, c.pfp
        FROM characters c
        JOIN character_alliances a ON (c.id = a.character_id_1 OR c.id = a.character_id_2)
        WHERE (a.character_id_1 = $1 OR a.character_id_2 = $1)
        AND c.id <> $1;
      `;
      const res = await this.pgc.query(query, [characterId]);
      return res.rows;
    }
  
    // CONSULTA: Listar todas las alianzas del sistema (formato legible)
    async findAll() {
      const query = `
        SELECT 
          c1.character_name as character_a, 
          c2.character_name as character_b 
        FROM character_alliances a
        JOIN characters c1 ON a.character_id_1 = c1.id
        JOIN characters c2 ON a.character_id_2 = c2.id;
      `;
      const res = await this.pgc.query(query);
      return res.rows;
    }
  
    // BAJA: Romper una alianza
    async delete(id1, id2) {
      const [low, high] = [Math.min(id1, id2), Math.max(id1, id2)];
      const query = `
        DELETE FROM character_alliances 
        WHERE character_id_1 = $1 AND character_id_2 = $2
        RETURNING *;
      `;
      const res = await this.pgc.query(query, [low, high]);
      if (res.rowCount === 0) throw new Error('Alianza no encontrada');
      return { message: 'Alianza disuelta' };
    }
  
    // MODIFICACIÓN: Cambiar un miembro de la alianza
    // (Ejemplo: Cambiar aliado A por aliado C para el personaje B)
    async update(oldAllyId, newAllyId, mainCharacterId) {
      // Usamos una transacción simple: borramos la vieja y creamos la nueva
      try {
        await this.pgc.query('BEGIN');
        await this.delete(mainCharacterId, oldAllyId);
        const updated = await this.create(mainCharacterId, newAllyId);
        await this.pgc.query('COMMIT');
        return updated;
      } catch (error) {
        await this.pgc.query('ROLLBACK');
        throw error;
      }
    }
  }
  
  module.exports = AllianceService;