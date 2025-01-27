import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'seila',
  password: 'financemate',
  port: 5432,
});

pool.connect()
  .then(client => {
    console.log('Conectado ao banco de dados com sucesso!');
    client.release();
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
  });

export default pool
