// middleware/apiKeyAuth.js
const { User } = require('../models');

const apiKeyAuth = async (req, res, next) => {
  // 1. Ambil kunci dari URL (?api_key=...) atau Header
  const key = req.query.api_key || req.headers['x-api-key'];

  // 2. Cek ada kuncinya ngga?
  if (!key) {
    return res.status(401).json({ 
      status: 'Error',
      message: 'Akses Ditolak! Mana API Key-nya?' 
    });
  }

  // 3. Cek validitas kunci di Database
  const user = await User.findOne({ where: { api_key: key } });

  if (!user) {
    return res.status(403).json({ 
      status: 'Error',
      message: 'API Key palsu atau tidak valid!' 
    });
  }

  // 4. Kunci Valid! Lanjut masuk.
  req.userOwner = user; // Kita catet siapa tamunya
  next();
};

module.exports = apiKeyAuth;