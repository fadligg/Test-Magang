const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- 1. DATA DUMMY (ARRAY SEBAGAI DATABASE) ---
// Ini database pura-puranya. NIK harus cocok sama yang di sini biar ketemu.
const databasePenduduk = [
    {
        nik: "1234567890123456",
        nama: "Budi Santoso",
        alamat: "Jl. Merdeka No. 45, Bandung",
        status: "WNI",
        pekerjaan: "Software Engineer"
    },
    {
        nik: "1111111111111111",
        nama: "Siti Aminah",
        alamat: "Jl. Mawar No. 10, Jakarta",
        status: "WNI",
        pekerjaan: "Dokter Umum"
    },
    {
        nik: "8888888888888888",
        nama: "John Doe",
        alamat: "Bali Resort No. 99",
        status: "WNI",
        pekerjaan: "Digital Nomad"
    }
];

// Middleware Security
const apiKeyGuard = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const VALID_KEY = "rahasia-negara-123";

    if (apiKey === VALID_KEY) {
        next();
    } else {
        res.status(403).json({
            status: "error",
            message: "Akses Ditolak: API Key tidak valid."
        });
    }
};

// Route GET dengan Logika Pencarian Array
app.get('/api/citizens/:nik', apiKeyGuard, (req, res) => {
    const { nik } = req.params;

    // --- 2. LOGIKA PENCARIAN (FIND) ---
    // Cari di array 'databasePenduduk' yang nik-nya cocok
    const foundData = databasePenduduk.find(orang => orang.nik === nik);

    // Jika ketemu
    if (foundData) {
        res.status(200).json({
            meta: {
                code: 200,
                status: "success",
                timestamp: new Date().toISOString()
            },
            data: foundData
        });
    } 
    // Jika TIDAK ketemu (misal NIK ngawur)
    else {
        res.status(404).json({
            status: "error",
            // Pesan ini nanti bikin alert merah di frontend
            message: `Data dengan NIK ${nik} tidak ditemukan dalam database.`
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server E-KTP berjalan di http://localhost:${PORT}`);
});