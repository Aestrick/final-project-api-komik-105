const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Import Model & Library
const db = require('./models');
const { User, Komik } = require('./models');
const { Op } = require('sequelize'); // Buat Search
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Import Middleware
const authenticateToken = require('./middleware/auth');
const apiKeyAuth = require('./middleware/apiKeyAuth');

// =========================================================
// CONFIGURATION
// =========================================================

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================================================
// ROUTE FRONTEND (WEBSITE UI)
// =========================================================

// 1. Tampilkan Halaman Login
app.get('/login', (req, res) => {
    res.render('login');
});

// 2. Proses Login Web
app.post('/login-web', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Cari User + Komiknya
        const user = await User.findOne({ 
            where: { email },
            include: [{ model: db.Komik, as: 'list_komik' }] 
        });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.send(`
                <body style="background-color:#111827; color:white; font-family:sans-serif; text-align:center; padding-top:50px;">
                    <h1 style="color:#ef4444;">Login Gagal! ❌</h1>
                    <p>Email atau Password salah.</p>
                    <a href="/login" style="color:#60a5fa;">Coba Lagi</a>
                </body>
            `);
        }
        res.render('dashboard', { user: user });
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});

// 3. LOGIC REGENERATE API KEY
app.post('/regenerate-key', async (req, res) => {
    try {
        const { email } = req.body;
        const newApiKey = crypto.randomBytes(20).toString('hex');

        await User.update({ api_key: newApiKey }, { where: { email: email } });

        const updatedUser = await User.findOne({ 
            where: { email },
            include: [{ model: db.Komik, as: 'list_komik' }]
        });

        res.render('dashboard', { user: updatedUser });
    } catch (error) {
        res.status(500).send("Gagal generate key: " + error.message);
    }
});

// 4. LOGIC TAMBAH KOMIK DARI WEB
app.post('/tambah-komik-web', async (req, res) => {
    try {
        const { email, judul, penulis, deskripsi } = req.body;
        const user = await User.findOne({ where: { email } });

        await db.Komik.create({
            judul, penulis, deskripsi, userId: user.id
        });

        const updatedUser = await User.findOne({ 
            where: { email },
            include: [{ model: db.Komik, as: 'list_komik' }]
        });

        res.render('dashboard', { user: updatedUser });
    } catch (error) {
        res.status(500).send("Gagal nambah komik: " + error.message);
    }
});

// 5. LOGIC HAPUS KOMIK (DELETE) - FITUR BARU!
app.post('/delete-komik/:id', async (req, res) => {
    try {
        const { id } = req.params; // Ambil ID dari URL
        
        // HAPUS data berdasarkan ID
        await db.Komik.destroy({
            where: { id: id }
        });

        // Balikin ke halaman sebelumnya (Refresh)
        res.redirect('back');

    } catch (error) {
        res.status(500).send("Gagal menghapus: " + error.message);
    }
});

// =========================================================
// AUTHENTICATION API (Thunder Client)
// =========================================================

app.post('/register', async (req, res) => { 
    try {
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newApiKey = crypto.randomBytes(20).toString('hex');

        const newUser = await User.create({
            username, email, password: hashedPassword,
            role: role || 'user', api_key: newApiKey 
        });

        res.status(201).json({
            message: "User created!",
            data: { id: newUser.id, email: newUser.email, apiKey: newUser.api_key }
        });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await db.User.findOne({ where: { username } });
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Salah password/username' });
        }
        
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login success', token });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// =========================================================
// PRIVATE API (Perlu JWT)
// =========================================================

app.post('/komik', authenticateToken, async (req, res) => {
    try {
        const { judul, penulis, deskripsi } = req.body;
        await db.Komik.create({ 
            judul, penulis, deskripsi, userId: req.user.id 
        });
        res.status(201).json({ success: true, message: "Berhasil" });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

app.get('/users-with-komik', authenticateToken, async (req, res) => {
    try {
        const users = await db.User.findAll({
            include: [{ model: db.Komik, as: 'list_komik', attributes: ['judul', 'penulis'] }]
        });
        res.json(users);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

app.get('/komik-with-owner', authenticateToken, async (req, res) => {
    try {
        const komiks = await db.Komik.findAll({
            include: [{ model: db.User, as: 'pemilik', attributes: ['username'] }]
        });
        res.json(komiks);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// =========================================================
// PUBLIC API (Search & Filter)
// =========================================================

app.get('/api/v1/public/komik', apiKeyAuth, async (req, res) => {
    try {
        const { search } = req.query;
        let conditions = { userId: req.userOwner.id };

        if (search) {
            conditions.judul = { [Op.like]: `%${search}%` }; 
        }

        const dataKomik = await db.Komik.findAll({
            where: conditions,
            attributes: ['judul', 'penulis', 'deskripsi', 'createdAt']
        });

        res.status(200).json({
            status: "Success",
            message: search ? `Hasil cari: '${search}'` : `Halo ${req.userOwner.username}, ini koleksimu!`,
            total_data: dataKomik.length,
            data: dataKomik
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// =========================================================
// SERVER LISTEN
// =========================================================
app.listen(port, async () => {
    console.log(`Server jalan di http://localhost:${port}`);
    try { 
        await db.sequelize.authenticate(); 
        console.log('Database Konek! Relasi Siap!'); 
    } catch (err) { console.error(err); }
});