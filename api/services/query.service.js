const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: 'magical_fungus',
    port: 5432,
});

// Helper for logging queries (optional but helpful for development)
module.exports = {
  query: (text, params) => pool.query(text, params),
};