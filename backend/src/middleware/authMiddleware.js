const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                message: 'Token não fornecido' 
            });
        }
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        
        next();
    } catch (error) {
        return res.status(401).json({ 
            message: 'Token inválido' 
        });
    }
};

module.exports = authMiddleware;