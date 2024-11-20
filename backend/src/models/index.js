// Arquivo que usa a conexão
const pool = require('../config/database');

async function executaQuery() {
    try {
        // Exemplo de consulta
        const resultado = await pool.query('SELECT * FROM sua_tabela');
        console.log(resultado.rows);
    } catch (error) {
        console.error('Erro na consulta:', error);
    }
}