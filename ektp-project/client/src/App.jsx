// client/src/App.jsx
import { useState, useEffect } from 'react';

function App() {
  const [nik, setNik] = useState('');
  const [citizenData, setCitizenData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  // (State timeLeft dihapus karena tidak lagi menampilkan countdown)

  // Fungsi validasi input (Hanya Angka)
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNik(value);
    }
  };

  // Format Tanggal jadi Bahasa Indonesia
  const formatWaktu = (isoString) => {
    if (!isoString) return '-';
    const options = { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
      hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' 
    };
    return new Date(isoString).toLocaleString('id-ID', options);
  };

  const isInvalid = nik.length > 0 && nik.length < 16;

  // --- LOGIC AUTO-CLEAR (useEffect) ---
  useEffect(() => {
    // Jika ada data citizen, pasang timer untuk menghapusnya
    if (citizenData) {
      const timer = setTimeout(() => {
        setCitizenData(null); // Hapus data
        setNik(''); // Hapus inputan juga biar bersih
      }, 3000); // 2.5 Detik (2500 ms)

      // Membersihkan timer jika komponen unmount atau data berubah sebelum waktu habis
      return () => clearTimeout(timer);
    }
  }, [citizenData]);

  const fetchData = async () => {
    if (nik.length !== 16) return; 

    setLoading(true);
    setErrorMsg('');
    setCitizenData(null);

    try {
      const response = await fetch(`http://localhost:3000/api/citizens/${nik}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'rahasia-negara-123'
        }
      });

      const result = await response.json();

      if (response.status === 200) {
        setCitizenData(result);
        // Tidak perlu setTimeLeft lagi
      } else {
        setErrorMsg(result.message || 'Terjadi kesalahan');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Cek Data E-KTP</h1>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Masukkan NIK
          </label>
          
          <input
            type="text"
            value={nik}
            onChange={handleInputChange}
            maxLength={16}
            placeholder="16 Digit NIK"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
              ${isInvalid 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:ring-blue-200'
              }`}
          />
          
          {isInvalid && (
            <p className="text-red-500 text-xs mt-1">
              *NIK harus terdiri dari 16 digit angka.
            </p>
          )}
        </div>

        <button
          onClick={fetchData}
          disabled={nik.length !== 16 || loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {loading ? 'Memuat...' : 'Validasi Data'}
        </button>

        {citizenData && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded relative overflow-hidden">
            

            <h3 className="font-bold text-green-800 mb-2">Data Valid!</h3>
            <div className="space-y-1">
                <p className="text-sm"><strong>Nama:</strong> {citizenData.data.nama}</p>
                <p className="text-sm"><strong>Status:</strong> {citizenData.data.status}</p>
                <p className="text-sm"><strong>Alamat:</strong> {citizenData.data.alamat}</p>
                <p className="text-sm"><strong>Pekerjaan:</strong> {citizenData.data.pekerjaan}</p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-green-200">
               <p className="text-xs text-gray-500 font-semibold">Divalidasi pada:</p>
               <p className="text-xs text-gray-700">
                  {formatWaktu(citizenData.meta.timestamp)}
               </p>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;