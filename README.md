#Sistem Validasi E-KTP (Studi Kasus Pemerintahan)

Aplikasi validasi data kependudukan (E-KTP) sederhana yang dibangun sebagai solusi untuk studi kasus teknis. Aplikasi ini mensimulasikan integrasi aman antara Frontend dan Backend menggunakan API Key, validasi input yang ketat, dan manajemen sesi data sementara.

##🚀 Fitur Utama

1. Keamanan API (Middleware Guard)

Backend dilindungi oleh middleware khusus yang memverifikasi header X-API-KEY. Request tanpa kunci yang valid akan ditolak secara otomatis (403 Forbidden).

2. Validasi Data Penduduk

Input Filter: Frontend hanya menerima input berupa angka.

Format Check: Memastikan NIK terdiri dari tepat 16 digit sebelum dikirim ke server.

Search Logic: Simulasi pencarian data penduduk dari database (mock array) berdasarkan NIK unik.

3. Keamanan Sesi (Auto-Clear)

Fitur keamanan yang secara otomatis menghapus data sensitif dari layar pengguna setelah 2.5 detik untuk mencegah paparan data yang tidak disengaja.

4. User Interface Modern

Dibangun dengan React.js dan Tailwind CSS.

Tampilan responsif dan format tanggal yang ramah pengguna (Format Indonesia).

##🛠️ Teknologi yang Digunakan

Frontend: React (Vite), Tailwind CSS

Backend: Node.js, Express.js

Keamanan: Custom Middleware for API Key Authentication

Data: In-Memory Array (Mock Database)

##📦 Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal Anda.

Prasyarat

Pastikan Node.js sudah terinstall di komputer Anda.

1. Clone Repository

git clone [https://github.com/username-kamu/nama-repo.git](https://github.com/username-kamu/nama-repo.git)
cd nama-repo


2. Setup & Jalankan Backend (Server)

Buka terminal baru, lalu masuk ke folder server:

cd server
npm install
node index.js


Server akan berjalan di http://localhost:3000

3. Setup & Jalankan Frontend (Client)

Buka terminal baru (berbeda dari terminal server), lalu masuk ke folder client:

cd client
npm install
npm run dev


Aplikasi akan berjalan di http://localhost:5173 (atau port lain yang ditampilkan terminal)

##🔑 Dokumentasi API

Mendapatkan Data Penduduk

Endpoint: GET /api/citizens/:nik

Headers Wajib:
| Key | Value | Deskripsi |
| :--- | :--- | :--- |
| Content-Type | application/json | Format data |
| X-API-KEY | rahasia-negara-123 | Kunci autentikasi |

Contoh Request:

curl -H "X-API-KEY: rahasia-negara-123" http://localhost:3000/api/citizens/1234567890123456


Contoh Response Sukses (200):

{
  "meta": {
    "code": 200,
    "status": "success",
    "timestamp": "2025-12-04T07:00:00.000Z"
  },
  "data": {
    "nik": "1234567890123456",
    "nama": "Budi Santoso",
    "alamat": "Jl. Merdeka No. 45, Bandung",
    "status": "WNI",
    "pekerjaan": "Software Engineer"
  }
}


Contoh Response Gagal (403 Forbidden):

{
  "status": "error",
  "message": "Akses Ditolak: API Key tidak valid."
}


🧪 Data Dummy untuk Pengujian

Gunakan NIK berikut untuk menguji aplikasi:

Budi Santoso: 1234567890123456

Siti Aminah: 1111111111111111

John Doe: 8888888888888888

📝 Catatan Studi Kasus

Project ini dibuat untuk memenuhi persyaratan tugas integrasi sistem pemerintahan yang mencakup:

Pemilihan Stack (NodeJS + React).

Implementasi Middleware Security.

Simulasi logika backend & return JSON metadata.

Styling Frontend dengan validasi visual (Border Merah).

Dibuat dengan ❤️ oleh [Nama Kamu]
