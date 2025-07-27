// src/config/db.js
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL não definida! Verifique seu .env');
}

const sql = postgres(connectionString, {
  ssl: 'require'
});

// Testar conexão
sql`SELECT 1`
  .then(() => console.log('✅ Conectado ao banco Supabase!'))
  .catch(err => console.error('❌ Erro ao conectar ao banco:', err.message));

export default sql;
