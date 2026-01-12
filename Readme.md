# Praktikum 7: Relasi Data (One-to-Many) & Query Lanjutan

Proyek ini adalah pengembangan dari API sebelumnya dengan penambahan fitur **Relasi Database**. 
Sistem ini menghubungkan tabel `Users` dan `Komik` menggunakan relasi **One-to-Many**, di mana satu User (Penulis) dapat memiliki banyak Komik.

Dibuat menggunakan:
* **Express.js** (Server)
* **Sequelize ORM** (Manajemen Database & Relasi)
* **PostgreSQL** (Database)
* **JWT** (Autentikasi)

## 🔗 Struktur Relasi

* **User `hasMany` Komik**: Satu user bisa membuat/memiliki banyak data komik.
* **Komik `belongsTo` User**: Setiap komik terikat pada satu user pembuatnya.

---

## 📸 Hasil Pengujian (5 Skenario Utama)

Berikut adalah bukti pengujian API menggunakan Postman yang menunjukkan implementasi relasi data dan *eager loading* (query lanjutan).

### 1. Register User (Penulis)
Mendaftarkan user baru yang akan bertindak sebagai pemilik/penulis komik.
![Register](SS7/01-register.png)

### 2. Login & Ambil Token
User melakukan login untuk mendapatkan Token JWT. Token ini membawa identitas ID user yang akan digunakan otomatis saat membuat data.
![Login](SS7/02-login.png)

### 3. Create Komik (Otomatisasi Relasi)
User membuat data komik. Sistem secara otomatis mendeteksi `userId` dari token yang sedang login dan menyimpannya sebagai *Foreign Key* di tabel komik.
![Create Komik](SS7/03-create-komik.png)

### 4. Query Lanjutan 1: User beserta Komiknya
Endpoint `GET /users-with-komik`.
Mengambil data User, dan API otomatis menyertakan daftar komik yang dimilikinya (menggunakan fitur `include` Sequelize).
![User With Komik](SS7/04-user-with-komik.png)

### 5. Query Lanjutan 2: Komik beserta Pemiliknya
Endpoint `GET /komik-with-owner`.
Mengambil data Komik, dan API otomatis menyertakan informasi detail tentang User pemiliknya.
![Komik With Owner](SS7/05-komik-with-owner.png)