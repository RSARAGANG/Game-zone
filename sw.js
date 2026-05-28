// sw.js - Berjalan di latar belakang HP Anda
self.addEventListener('push', function(event) {
    // Pesan default jika server tidak mengirimkan teks spesifik
    let payload = { 
        title: 'Notifikasi Masuk', 
        body: 'Ada informasi terbaru untuk Anda!' 
    };

    // Mengecek dan membaca data kiriman dari backend server
    if (event.data) {
        try {
            payload = event.data.json();
        } catch (e) {
            payload.body = event.data.text();
        }
    }

    const options = {
        body: payload.body,
        icon: '/icon.png',  // Ganti dengan logo gambar website Anda (format PNG)
        badge: '/icon.png', // Ikon kecil status bar untuk pengguna HP Android
        vibrate: [100, 50, 100] // Pola HP bergetar saat notifikasi masuk
    };

    event.waitUntil(
        self.registration.showNotification(payload.title, options)
    );
});