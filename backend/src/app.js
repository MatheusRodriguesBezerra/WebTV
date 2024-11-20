const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/database');
const authMiddleware = require('./middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const port = 3001

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'TgPtvHjKMOoYtCCk7TdKVDWut8NCNirBxi3s/GhuSas=';

app.post('/add-channel', authMiddleware, async (req, res) => {
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

app.post('/delete-channel', authMiddleware, async (req, res) => {
    try {
        await db.query('CALL delete_channel($1)', 
            [req.body.id]
        );

        res.status(200).json({ message: 'Canal deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/edit-channel', authMiddleware, async (req, res) => {
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

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await db.query('SELECT * FROM admin WHERE email = $1', 
            [email]
        );
        
        if (!user.rows[0]) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        
        const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
        
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const existingUser = await db.query('SELECT * FROM admin WHERE email = $1', 
            [email]
        );
        
        if (existingUser.rowCount > 0) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.query('INSERT INTO admin (email, password) VALUES ($1, $2) RETURNING *', 
            [
                email, 
                hashedPassword
            ]
        );

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})