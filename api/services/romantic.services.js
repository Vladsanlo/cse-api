class RomanticInterestService {
    constructor(pgc) {
      this.pgc = pgc;
    }
  
    // ALTA: Registrar un interés romántico
    async create(followerId, followedId, isMutual = false) {
      const query = `
        INSERT INTO romantic_interests (follower_id, followed_id, is_mutual)
        VALUES ($1, $2, $3)
        ON CONFLICT (follower_id, followed_id) 
        DO UPDATE SET is_mutual = EXCLUDED.is_mutual
        RETURNING *;
      `;
      const res = await this.pgc.query(query, [followerId, followedId, isMutual]);
      return res.rows[0];
    }
  
    // CONSULTA: Ver a quién ama un personaje
    async findInterestsOf(characterId) {
      const query = `
        SELECT c.id, c.character_name, r.is_mutual
        FROM characters c
        JOIN romantic_interests r ON c.id = r.followed_id
        WHERE r.follower_id = $1;
      `;
      const res = await this.pgc.query(query, [characterId]);
      return res.rows;
    }
  
    // CONSULTA: Ver quién está enamorado de un personaje (pretendientes)
    async findAdmirersOf(characterId) {
      const query = `
        SELECT c.id, c.character_name, r.is_mutual
        FROM characters c
        JOIN romantic_interests r ON c.id = r.follower_id
        WHERE r.followed_id = $1;
      `;
      const res = await this.pgc.query(query, [characterId]);
      return res.rows;
    }
  
    // CONSULTA: Listar todos los romances del sistema
    async findAll() {
      const query = `
        SELECT 
          c1.character_name as lover, 
          c2.character_name as beloved,
          r.is_mutual
        FROM romantic_interests r
        JOIN characters c1 ON r.follower_id = c1.id
        JOIN characters c2 ON r.followed_id = c2.id;
      `;
      const res = await this.pgc.query(query);
      return res.rows;
    }
  
    // MODIFICACIÓN: Actualizar si es mutuo o cambiar el interés
    async updateStatus(followerId, followedId, isMutual) {
      const query = `
        UPDATE romantic_interests 
        SET is_mutual = $3 
        WHERE follower_id = $1 AND followed_id = $2
        RETURNING *;
      `;
      const res = await this.pgc.query(query, [followerId, followedId, isMutual]);
      if (res.rowCount === 0) throw new Error('Relación no encontrada');
      return res.rows[0];
    }
  
    // BAJA: Eliminar el interés romántico (terminar relación o dejar de gustar)
    async delete(followerId, followedId) {
      const query = `
        DELETE FROM romantic_interests 
        WHERE follower_id = $1 AND followed_id = $2
        RETURNING *;
      `;
      const res = await this.pgc.query(query, [followerId, followedId]);
      if (res.rowCount === 0) throw new Error('Relación no encontrada');
      return { message: 'Interest removed' };
    }
  }
  
  module.exports = RomanticInterestService;