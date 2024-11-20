const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/database');
const port = 3001

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/add-channel', async (req, res) => {
    try {
        // Converte o array de options para string JSON
        const optionsJson = JSON.stringify(req.body.options);

        const newChannel = await db.query(
            'CALL add_channel_with_options($1, $2, $3, $4, $5, $6)',
            [
                req.body.title,
                req.body.description,
                req.body.img,
                req.body.alt,
                req.body.type,
                optionsJson
            ]
        );
        
        res.status(201).json(newChannel.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/delete-channel', async (req, res) => {
    try {
        await db.query('CALL delete_channel($1)', 
            [req.body.id]
        );

        res.status(200).json({ message: 'Canal deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/edit-channel', async (req, res) => {
    try {
        // Criar lista de options a partir do req.body.options
        const options = req.body.options.map(opt => ({
            title: opt.title,
            link: opt.link
        }));

        // Converter para JSON
        const optionsJson = JSON.stringify(options);

        // Verificar se o canal existe
        const channelExists = await db.query(
            'SELECT id FROM channels WHERE id = $1',
            [req.body.id]
        );

        if (channelExists.rows.length === 0) {
            return res.status(404).json({ error: 'Canal não encontrado' });
        }

        // Chamar o procedimento
        await db.query(
            'CALL edit_channel_with_options($1, $2, $3, $4, $5, $6, $7)',
            [
                req.body.id, 
                req.body.title, 
                req.body.description, 
                req.body.img, 
                req.body.alt, 
                req.body.type, 
                optionsJson
            ]
        );

        // Buscar o canal atualizado
        const updatedChannel = await db.query(
            `SELECT 
                c.*,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'title', co.title,
                            'link', co.link
                        )
                    ) FILTER (WHERE co.id IS NOT NULL),
                    '[]'::json
                ) as options
            FROM channels c
            LEFT JOIN channeloptions co ON c.id = co.channelid
            WHERE c.id = $1
            GROUP BY c.id`,
            [req.body.id]
        );

        res.json(updatedChannel.rows[0]);
    } catch (err) {
        console.error('Erro completo:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/get-channels', async (req, res) => {
    try {
        const newChannel = await db.query('SELECT * FROM get_channels()');      
        res.status(201).json(newChannel.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/get-channels-search/:term', async (req, res) => {
    try {
        const searchTerm = req.params.term;
        const result = await db.query(
            `SELECT * FROM get_channels() 
             WHERE title ILIKE $1 
             OR description ILIKE $1
             OR type ILIKE $1`,
            [`%${searchTerm}%`]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/get-channel/:id', async (req, res) => {
    try {
        const result = await db.query(
            `SELECT 
                c.*,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'title', co.title,
                            'link', co.link
                        )
                    ) FILTER (WHERE co.id IS NOT NULL),
                    '[]'::json
                ) as options
            FROM channels c
            LEFT JOIN channeloptions co ON c.id = co.channelid
            WHERE c.id = $1
            GROUP BY c.id`,
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Canal não encontrado' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})