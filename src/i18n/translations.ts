/**
 * Kumpulan terjemahan aplikasi.
 *
 * Strategi:
 * - Bahasa Indonesia adalah bahasa sumber; teks di komponen ditulis dalam
 *   Bahasa Indonesia dan dipakai apa adanya saat `language === "id"`.
 * - Modul ini berisi dictionary untuk bahasa Inggris (`en`).
 * - Key adalah teks Indonesia (di-`trim` di `translateValue`).
 * - Untuk menambah project/halaman baru, tulis teks di komponennya lalu
 *   tambahkan pasangan `"Teks Indonesia": "English text"` pada section yang
 *   sesuai di bawah. Section baru dibuat dengan komentar `// ── Nama ──`.
 *
 * Catatan: kode/bahasa pemrograman (regex, command git, tag status HTTP)
 * sengaja TIDAK diterjemahkan — elemen <code>/<pre> dilewati oleh penerjemah.
 */

export type Language = "id" | "en"
export type TranslationDictionary = Record<string, string>

export const en: TranslationDictionary = {
  // ── Shell & navigasi ──
  Beranda: "Home",
  "Kembali ke beranda": "Back to home",
  "Kembali ke Beranda": "Back to Home",
  Tentang: "About",
  Proyek: "Projects",
  Kategori: "Categories",
  Cari: "Search",
  "Cari project...": "Search projects...",
  "Jumlah project": "Number of projects",
  "Lihat Project": "View project",
  "Lihat source code": "View source code",
  Tampilkan: "Show",
  "project / halaman": "projects / page",
  Halaman: "Page",
  dari: "of",
  Menampilkan: "Showing",
  Semua: "All",
  Lainnya: "Other",
  Kembali: "Back",
  Batal: "Cancel",
  Hapus: "Delete",
  Tambah: "Add",
  Simpan: "Save",
  Reset: "Reset",
  Salin: "Copy",
  Unduh: "Download",
  "Navigasi utama mobile": "Main mobile navigation",
  "Link footer": "Footer links",
  "GitHub evanazhr": "GitHub evanazhr",
  GitHub: "GitHub",
  "mini projects. Dibuat untuk terus mencoba hal kecil.":
    "mini projects. Built to keep exploring little things.",
  "Kumpulan tools kecil untuk belajar, bereksperimen, dan menyelesaikan masalah sehari-hari.":
    "Small tools for learning, experimenting, and solving everyday problems.",

  // ── Beranda ──
  "Project, tools, dan utility": "Projects, tools, and utilities",
  "Ilustrasi kumpulan project, tools, dan utility":
    "Illustration of the project, tools, and utility collection",
  "Hal kecil yang": "Small things that",
  "bisa dipakai.": "you can use.",
  "Kumpulan mini project untuk belajar, bereksperimen, dan membantu menyelesaikan masalah sehari-hari.":
    "A collection of small projects for learning, experimenting, and solving everyday problems.",
  "Tidak ada project ditemukan": "No projects found",
  "Coba kata kunci atau kategori lain": "Try another keyword or category",

  // ── Tentang (sisi yang dirender via dictionary; sebagian besar pakai konten bilingual) ──
  "Tentang Proyek": "About the project",
  "Siapa Saya": "About me",
  Aktif: "Active",
  "Fokus & Pendekatan di website ini": "Focus and approach",
  "Buka GitHub evanazhr": "Open evanazhr GitHub",

  // ── Kategori ──
  "Developer Tools": "Developer Tools",
  Finance: "Finance",
  Productivity: "Productivity",
  Cryptography: "Cryptography",
  Game: "Game",
  String: "String",
  Math: "Math",
  Utility: "Utility",

  // ── Metadata project (judul & deskripsi) ──
  "Palindrom Checker": "Palindrome Checker",
  "Cek apakah sebuah kata atau kalimat merupakan palindrom.":
    "Check whether a word or sentence is a palindrome.",
  "Interpolasi Linear Calculator": "Linear Interpolation Calculator",
  "Mencari nilai dari Interpolasi Linier dengan kalkulator interaktif.":
    "Find values with an interactive linear interpolation calculator.",
  "To-Do List": "To-Do List",
  "Kelola daftar tugas harian Anda dengan mudah.": "Manage your daily tasks with ease.",
  "Monoalphabetic Cipher": "Monoalphabetic Cipher",
  "Enkripsi dan dekripsi teks menggunakan sandi substitusi monoalfabetik.":
    "Encrypt and decrypt text with a monoalphabetic substitution cipher.",
  "Roll Dice": "Roll Dice",
  "Simulasi melempar dadu dengan animasi interaktif dan riwayat lemparan.":
    "Simulate dice rolls with interactive animation and roll history.",
  "QR Code Generator": "QR Code Generator",
  "Buat kode QR kustom dari URL atau teks dengan fitur unduh dan pratinjau.":
    "Create custom QR codes from URLs or text with download and preview.",
  "Brain Dump": "Brain Dump",
  "Tuang semua yang ada di pikiranmu. Catatan otomatis terhapus sesuai waktu yang kamu atur.":
    "Empty your mind. Notes are automatically deleted after the time you set.",
  "HTTP Status Explorer": "HTTP Status Explorer",
  "Cari arti dan penggunaan kode status HTTP dengan cepat.":
    "Quickly find the meaning and usage of HTTP status codes.",
  "Git Cheat Sheet": "Git Cheat Sheet",
  "Temukan command Git berdasarkan workflow dan salin dengan satu klik.":
    "Find Git commands by workflow and copy them with one click.",
  "Expense Splitter": "Expense Splitter",
  "Bagi tagihan bersama teman dan lihat siapa membayar atau menerima.":
    "Split bills with friends and see who pays or receives money.",
  "Pomodoro Timer": "Pomodoro Timer",
  "Fokus dengan countdown kerja, waktu istirahat, alarm, dan riwayat sesi.":
    "Focus with work countdowns, breaks, alarms, and session history.",
  "Regex Tester": "Regex Tester",
  "Uji regular expression dan lihat match serta capture group secara langsung.":
    "Test regular expressions and see matches and capture groups live.",
  "Kumpulan mini project interaktif yang dibuat oleh evanazhr untuk belajar dan bereksperimen.":
    "A collection of interactive mini projects by evanazhr for learning and experimentation.",

  // ── Halaman 404 & error ──
  "Halaman Tidak Ditemukan": "Page Not Found",
  "Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin alamat URL salah ketik atau halaman telah dihapus.":
    "Sorry, the page you're looking for could not be found. The URL may be mistyped or the page may have been removed.",
  "Terjadi Kesalahan": "Something Went Wrong",
  "Aplikasi Mengalami Kendala": "The App Ran Into a Problem",
  "Maaf, terjadi kesalahan tak terduga saat memproses halaman ini. Silakan coba memuat ulang halaman.":
    "Sorry, an unexpected error occurred while processing this page. Please try reloading it.",
  "Coba Lagi": "Try Again",
  "Detail Kesalahan": "Error Details",

  // ── Palindrom Checker ──
  "Apa itu palindrom?": "What is a palindrome?",
  "Palindrom adalah kata atau kalimat yang jika dibaca dari depan dan belakang menghasilkan urutan yang sama.":
    "A palindrome is a word or sentence that reads the same forwards and backwards.",
  "Contoh:": "Example:",
  "Pengecekan mengabaikan huruf kapital dan spasi.":
    "Checking ignores capitalization and spaces.",
  "Masukkan Teks": "Enter Text",
  Teks: "Text",
  "contoh: katak, radar, level...": "e.g. katak, radar, level...",
  "Cek Sekarang": "Check Now",

  // ── Interpolasi Linear ──
  "Masukkan Koordinat & Titik X": "Enter Coordinates & X Point",
  "Titik x₀": "Point x₀",
  "Titik x₁": "Point x₁",
  "Nilai f(x₀)": "Value f(x₀)",
  "Nilai f(x₁)": "Value f(x₁)",
  "Nilai x (yang dicari)": "Value x (to find)",
  "contoh: 1": "e.g. 1",
  "contoh: 2": "e.g. 2",
  "contoh: 3": "e.g. 3",
  "contoh: 6": "e.g. 6",
  "contoh: 2 (harus di antara x₀ dan x₁)": "e.g. 2 (must be between x₀ and x₁)",
  Hitung: "Calculate",
  "Hasil Interpolasi Linier": "Linear Interpolation Result",
  "Apa itu Interpolasi Linear?": "What is Linear Interpolation?",
  "Interpolasi linear adalah metode untuk menentukan nilai di antara dua titik data yang diketahui secara linier.":
    "Linear interpolation is a method for determining a value between two known data points linearly.",
  "Metode ini mengasumsikan hubungan antara kedua titik tersebut membentuk garis lurus.":
    "This method assumes the relationship between the two points forms a straight line.",

  // ── To-Do List ──
  "Daftar Tugas Baru": "New Task List",
  "Masukkan tugas baru...": "Enter a new task...",
  "Belum ada tugas harian": "No daily tasks yet",
  "Silakan tambahkan tugas baru menggunakan kolom di atas.":
    "Please add a new task using the field above.",
  "Tugas Baru": "New Task",
  "Tips Penggunaan": "Usage Tips",
  "Klik tombol check di sebelah kiri tugas untuk menandai tugas selesai atau belum selesai.":
    "Click the check button to the left of a task to mark it complete or incomplete.",
  "Gunakan tombol panah ke atas (↑) dan ke bawah (↓) untuk mengubah prioritas atau urutan tugas.":
    "Use the up (↑) and down (↓) arrow buttons to change task priority or order.",
  "Tugas Anda disimpan secara lokal di browser, sehingga tidak akan hilang saat halaman dimuat ulang.":
    "Your tasks are stored locally in the browser, so they won't disappear when the page reloads.",
  "Tambah tugas": "Add task",
  "Simpan perubahan": "Save changes",
  "Batal edit": "Cancel edit",
  "Edit tugas": "Edit task",
  "Pindahkan ke atas": "Move up",
  "Pindahkan ke bawah": "Move down",
  "Hapus tugas": "Delete task",
  "Tandai belum selesai": "Mark as not done",
  "Tandai selesai": "Mark as done",

  // ── Monoalphabetic Cipher ──
  "Pengaturan Kunci Substitusi": "Substitution Key Settings",
  "Kata Kunci / Keyword (A-Z)": "Keyword (A-Z)",
  "Masukkan kata kunci... (contoh: RAHASIA)": "Enter a keyword... (e.g. RAHASIA)",
  "Acak Kunci (Shuffle)": "Shuffle Key",
  "Tabel Pemetaan Abjad (Alphabet Mapping Table)": "Alphabet Mapping Table",
  Sebelum: "Before",
  Sesudah: "After",
  "Proses Enkripsi & Dekripsi": "Encrypt & Decrypt Process",
  "Enkripsi Teks": "Encrypt Text",
  "Dekripsi Teks": "Decrypt Text",
  "Teks Masuk (": "Input Text (",
  "Hasil (": "Output (",
  "Ketik pesan rahasia yang ingin dienkripsi...": "Type the secret message to encrypt...",
  "Ketik sandi rahasia yang ingin didekripsi...": "Type the secret cipher to decrypt...",
  "Hasil akan muncul di sini secara otomatis...": "The result will appear here automatically...",
  Tersalin: "Copied",
  "Cara Kerja Sandi Substitusi Monoalfabetik": "How Monoalphabetic Substitution Works",
  "Sandi substitusi monoalfabetik bekerja dengan memetakan setiap huruf dalam alfabet asli (plaintext) ke huruf lain secara konsisten berdasarkan baris kunci (ciphertext).":
    "A monoalphabetic substitution cipher maps each letter of the original alphabet (plaintext) to another letter consistently based on the key row (ciphertext).",
  "Kata Kunci": "Keyword",
  ": Huruf unik dari kata kunci diletakkan di awal alfabet baru, lalu huruf alfabet lainnya yang belum dipakai akan diisikan berurutan. Misalnya, kunci":
    ": The unique letters of the keyword are placed at the beginning of the new alphabet, followed by the remaining unused letters in order. For example, key",
  "diikuti oleh abjad tersisa (": "followed by the remaining letters (",
  "memetakan huruf abjad pertama ke": "maps the first letters of the alphabet to",
  ": Mengacak 26 huruf alfabet secara acak tanpa kata kunci spesifik untuk mendapatkan keamanan pemetaan yang lebih tinggi.":
    ": Shuffles all 26 alphabet letters randomly without a specific keyword for stronger mapping security.",
  "Simbol, angka, dan spasi tidak diubah demi mempertahankan struktur kalimat asli. Kapitalisasi huruf (casing) dipertahankan saat proses selesai.":
    "Symbols, numbers, and spaces are not changed to preserve the original sentence structure. Letter casing is preserved when the process is done.",

  // ── Roll Dice ──
  "Papan Kocok Dadu": "Dice Rolling Board",
  "Lempar Dadu": "Roll Dice",
  "Statistik Distribusi Lemparan": "Roll Distribution Statistics",
  "Dadu": "Die",
  Kali: "times",
  "Total Lemparan": "Total Rolls",
  "Total Nilai": "Total Value",
  "Rata-Rata Nilai": "Average Value",
  "Riwayat Lemparan": "Roll History",
  "Silakan lempar dadu untuk memulai pencatatan.": "Roll the dice to start recording.",
  "Belum ada riwayat": "No history yet",
  "Cara kerja Roll Dice": "How Roll Dice Works",
  "Tekan Lempar Dadu untuk menghasilkan angka acak dari 1 sampai 6.":
    "Press Roll Dice to generate a random number from 1 to 6.",
  "Riwayat menyimpan hasil lemparan dan statistik menampilkan frekuensi, total, serta rata-rata nilai.":
    "History stores roll results and the statistics show frequency, total, and average value.",
  "Gunakan Reset untuk menghapus riwayat dan mengembalikan statistik ke kondisi awal.":
    "Use Reset to clear the history and restore statistics to their initial state.",

  // ── QR Code Generator ──
  "URL atau Teks bebas": "URL or free text",
  "Masukkan URL / Teks": "Enter URL / Text",
  "Ketik tautan atau teks di sini...": "Type a link or text here...",
  "Mendukung semua protokol URL standar (http, https, mailto, tel) atau teks paragraf bebas.":
    "Supports all standard URL protocols (http, https, mailto, tel) or free paragraph text.",
  "Warna Utama (Foreground)": "Primary Color (Foreground)",
  "Latar Belakang (Background)": "Background Color",
  "Warna saat ini:": "Current color:",
  Hitam: "Black",
  Biru: "Blue",
  Merah: "Red",
  Hijau: "Green",
  Ungu: "Purple",
  Putih: "White",
  "Kuning Pastel": "Pastel Yellow",
  "Biru Muda": "Light Blue",
  Transparan: "Transparent",
  "Kustom Warna": "Custom Color",
  "Kustom Warna Latar": "Custom Background",
  "Tingkat Koreksi Kesalahan (ECL)": "Error Correction Level (ECL)",
  Rendah: "Low",
  Sedang: "Medium",
  Tinggi: "High",
  "Sangat Tinggi": "Very High",
  "Tips Kontras:": "Contrast Tips:",
  "Tips Kontras": "Contrast Tips",
  "Pastikan warna utama (Foreground) jauh lebih gelap dibandingkan warna latar belakang (Background) agar kode QR dapat dipindai dengan mudah oleh kamera ponsel pintar.":
    "Make sure the foreground color is much darker than the background so the QR code can be scanned easily by smartphone cameras.",
  Ukuran: "Size",
  "Ukuran (px)": "Size (px)",
  "Koreksi (ECL)": "Correction (ECL)",
  "Pilih Ukuran": "Choose Size",
  "Kecil (200 x 200 px)": "Small (200 x 200 px)",
  "Sedang (300 x 300 px)": "Medium (300 x 300 px)",
  "Besar (400 x 400 px)": "Large (400 x 400 px)",
  "Data Masih Kosong": "No Data Yet",
  "Ketik URL atau teks untuk melihat kode QR Anda di sini":
    "Type a URL or text to see your QR code here",
  "Unduh Gambar (PNG)": "Download Image (PNG)",
  "Mengunduh...": "Downloading...",
  "Salin Input": "Copy Input",
  "Apa itu QR Code?": "What is a QR Code?",
  "QR Code adalah kode dua dimensi yang menyimpan informasi seperti URL, teks, email, atau nomor telepon.":
    "A QR code is a two-dimensional code that stores information such as URLs, text, emails, or phone numbers.",
  "Gunakan warna foreground yang kontras dengan background agar kamera mudah membacanya.":
    "Use a foreground color that contrasts with the background so cameras can read it easily.",
  "ECL menentukan kemampuan QR Code memulihkan data yang rusak: L sekitar 7%, M 15%, Q 25%, dan H 30%.":
    "ECL determines how much damaged data a QR code can recover: L ~7%, M 15%, Q 25%, and H 30%.",

  // ── Brain Dump ──
  "Note Baru": "New Note",
  "TUANG SEMUA": "BRAIN DUMP",
  "Tulis apa saja yang ada di pikiranmu...": "Write down anything on your mind...",
  "Hapus dalam:": "Delete in:",
  "Warna:": "Color:",
  "Ctrl+Enter untuk simpan": "Ctrl+Enter to save",
  "1 menit": "1 minute",
  "5 menit": "5 minutes",
  "15 menit": "15 minutes",
  "30 menit": "30 minutes",
  "1 jam": "1 hour",
  "3 jam": "3 hours",
  "6 jam": "6 hours",
  "24 jam": "24 hours",
  "catatan aktif": "active notes",
  "Hapus semua": "Delete all",
  "Banyak pikiran?": "Too many thoughts?",
  "Tulis sesuatu di atas, semua akan hilang sendiri.":
    "Write something above; everything disappears on its own.",
  "Tersimpan!": "Saved!",
  "Hapus catatan": "Delete note",
  "Apa itu brain dump?": "What is a brain dump?",
  "Metode untuk menumpahkan semua isi kepala, ide, dan kekhawatiran ke dalam tulisan tanpa perlu langsung memfilternya.":
    "A method to empty your head — ideas, worries, and everything in between — onto paper without filtering them first.",
  "Membantu mengurangi beban kognitif (*mental clutter*) dan menurunkan rasa cemas akibat terlalu banyak hal yang dipikirkan.":
    "Helps reduce cognitive load (*mental clutter*) and lowers anxiety caused by thinking about too many things at once.",
  "Memudahkan kamu memilah mana tugas yang mendesak, penting, atau bisa ditunda setelah semuanya tercatat dengan rapi.":
    "Makes it easier to sort tasks into urgent, important, or postponable once everything is written down.",

  // ── HTTP Status Explorer ──
  "Cari status HTTP": "Search HTTP status",
  "Contoh: 404, not found, redirect...": "e.g. 404, not found, redirect...",
  Search: "Search",
  "Status tidak ditemukan": "No status found",
  "Coba cari dengan kode seperti 404 atau kata seperti “unauthorized”.":
    "Try searching for a code like 404 or a word like “unauthorized”.",
  "Reset filter": "Reset filter",
  "Apa itu status HTTP?": "What is an HTTP status?",
  "Status HTTP adalah kode dari server yang menjelaskan hasil sebuah request.":
    "An HTTP status is a code from the server explaining the result of a request.",
  Kode: "Code",
  "berarti berhasil,": "means success,",
  "berarti pengalihan,": "means redirection,",
  "berarti masalah dari request atau akses, dan":
    "means a problem with the request or access, and",
  "berarti masalah di server.": "means a problem on the server.",
  "berarti resource tidak ditemukan, sedangkan":
    "means the resource was not found, while",
  "berarti terjadi error internal server.":
    "means an internal server error occurred.",
  "Permintaan berhasil diproses.": "The request was processed successfully.",
  "Resource baru berhasil dibuat.": "A new resource was created.",
  "Berhasil tanpa response body.": "Succeeded with no response body.",
  "URL resource telah berpindah permanen.": "The URL of the resource has moved permanently.",
  "Request tidak valid atau gagal dipahami.": "The request is invalid or cannot be understood.",
  "Autentikasi diperlukan atau tidak valid.": "Authentication is required or invalid.",
  "Server memahami request, tetapi menolaknya.": "The server understood the request but refuses to authorize it.",
  "Resource yang diminta tidak ditemukan.": "The requested resource was not found.",
  "Data valid secara sintaks tetapi gagal validasi.": "The data is syntactically valid but failed validation.",
  "Terlalu banyak request dalam waktu singkat.": "Too many requests in a short period.",
  "Server mengalami error yang tidak terduga.": "The server encountered an unexpected error.",
  "Service sedang tidak tersedia.": "The service is currently unavailable.",
  "Membaca data atau menampilkan halaman.": "Reading data or displaying a page.",
  "Membuat user atau posting baru.": "Creating a new user or post.",
  "Update atau delete yang tidak mengembalikan data.": "Update or delete that returns no data.",
  "Redirect domain lama ke domain baru.": "Redirecting an old domain to a new domain.",
  "Payload JSON tidak sesuai format.": "The JSON payload doesn't match the format.",
  "Token login hilang atau expired.": "The login token is missing or expired.",
  "User tidak memiliki permission.": "The user lacks permission.",
  "Endpoint atau halaman tidak tersedia.": "The endpoint or page is unavailable.",
  "Form berisi email yang sudah terdaftar.": "The form contains an already-registered email.",
  "Rate limit API tercapai.": "The API rate limit was reached.",
  "Exception pada backend.": "An exception in the backend.",
  "Maintenance atau server overload.": "Maintenance or server overload.",

  // ── Git Cheat Sheet ──
  "Cari command Git": "Search Git commands",
  "Cari command atau workflow...": "Search commands or workflows...",
  "Membuat repository baru": "Create a new repository",
  "Menyalin repository remote": "Clone a remote repository",
  "Melihat perubahan file": "View file changes",
  "Menambahkan semua perubahan ke staging": "Stage all changes",
  "Membuat commit": "Create a commit",
  "Membuat dan berpindah branch": "Create and switch to a branch",
  "Menggabungkan branch": "Merge a branch",
  "Mengambil dan menggabungkan perubahan": "Fetch and merge changes",
  "Mengirim commit ke remote": "Send commits to the remote",
  "Membatalkan perubahan lokal": "Discard local changes",
  "Copy command": "Copy command",
  "Apa itu Git?": "What is Git?",
  "Git adalah sistem version control untuk mencatat perubahan kode dan bekerja bersama tim.":
    "Git is a version control system for tracking code changes and collaborating with a team.",
  "memilih perubahan,": "selects changes,",
  "menyimpan snapshot, dan": "saves a snapshot, and",
  "mengirimnya ke remote.": "pushes them to the remote.",
  "Mulai dari": "Start with",
  "untuk melihat kondisi repository sebelum menjalankan command lain.":
    "to see the repository state before running other commands.",

  // ── Expense Splitter ──
  Peserta: "People",
  "Barang yang dibeli": "Purchased items",
  "Tambah barang": "Add item",
  "Nama orang baru": "New person's name",
  "Nama barang": "Item name",
  "Harga satuan (Rp)": "Unit price (Rp)",
  "Jumlah barang": "Item quantity",
  "Siapa yang membeli/menggunakan?": "Who is buying/using it?",
  "Harga dibagi rata untuk:": "Split evenly among:",
  "Tambah ke tagihan": "Add to bill",
  "Edit barang": "Edit Item",
  "Belum ada barang. Tambahkan barang di atas.": "No items yet. Add an item above.",
  "Cara kerja Expense Splitter": "How Expense Splitter Works",
  "Tambahkan semua orang yang ikut membayar, lalu masukkan nama barang, harga satuan, dan jumlahnya.":
    "Add everyone who is paying, then enter the item name, unit price, and quantity.",
  "Pilih orang yang menggunakan barang. Harga barang akan dibagi rata di antara orang yang dipilih.":
    "Select the people using the item. The item price is split evenly between them.",
  "Contoh: barang seharga Rp30.000 dengan jumlah 2 dan dipakai 3 orang akan menjadi Rp60.000, lalu masing-masing membayar Rp20.000.":
    "Example: an item costing Rp30,000 with quantity 2 shared by 3 people becomes Rp60,000, so each pays Rp20,000.",
  "Setiap orang membayar sesuai barang yang dipilihnya.":
    "Everyone pays according to the items they selected.",

  // ── Pomodoro ──
  "Waktu fokus": "Focus time",
  "Waktu istirahat": "Break time",
  Mulai: "Start",
  Fokus: "Focus",
  Istirahat: "Break",
  "Sesi selesai:": "Sessions completed:",
  "Notifikasi browser": "Browser notifications",
  "Dapatkan pemberitahuan saat sesi fokus atau istirahat selesai.":
    "Get notified when a focus or break session ends.",
  "Aktifkan notifikasi": "Enable notifications",
  "Notifikasi aktif.": "Notifications enabled.",
  "Notifikasi diblokir. Aktifkan dari pengaturan browser.":
    "Notifications blocked. Enable them in your browser settings.",
  "Notifikasi browser muncul saat sesi selesai jika izin notifikasi sudah diaktifkan.":
    "A browser notification appears when a session ends if notification permission is enabled.",
  "Atur durasi fokus dan istirahat, lalu tekan Mulai. Timer tetap berjalan saat berpindah halaman.":
    "Set focus and break durations, then press Start. The timer keeps running while navigating between pages.",
  "Pomodoro adalah teknik fokus dengan membagi pekerjaan menjadi sesi kerja dan istirahat.":
    "The Pomodoro Technique improves focus by splitting work into work and break sessions.",
  "Apa itu Pomodoro?": "What is the Pomodoro Technique?",

  // ── Regex Tester ──
  Pattern: "Pattern",
  Flags: "Flags",
  "Teks uji": "Test text",
  "Regex tidak valid": "Invalid regex",
  "match ditemukan": "matches found",
  "Belajar Regex dari Dasar": "Learn Regex from Scratch",
  "Apa itu regex?": "What is regex?",
  "Regex (regular expression) adalah pola untuk mencari, mencocokkan, atau memvalidasi teks. Contohnya,":
    "Regex (regular expression) is a pattern for searching, matching, or validating text. For example,",
  "mencari satu atau lebih angka.": "finds one or more digits.",
  "Komponen utama": "Core components",
  atau: "or",
  ": rentang huruf.": ": a range of letters.",
  ": satu digit angka, sedangkan": ": a single digit, while",
  ": huruf, angka, atau underscore.": ": letter, digit, or underscore.",
  ": satu atau lebih kemunculan;": ": one or more occurrences;",
  ": nol atau lebih;": ": zero or more;",
  ": nol atau satu.": ": zero or one.",
  ": awal teks dan": ": start of the text and",
  ": akhir teks.": ": end of the text.",
  ": salah satu karakter;": ": one of the characters;",
  ": kelompok pola.": ": a group of patterns.",
  "Apa itu flag?": "What is a flag?",
  "Flag mengubah cara regex bekerja.": "A flag changes how a regex behaves.",
  "mencari semua match,": "finds all matches,",
  "mengabaikan huruf besar-kecil,": "ignores case,",
  membuat: "makes",
  "dan": "and",
  "bekerja per baris, sedangkan": "apply per line, while",
  "membuat titik juga mencocokkan baris baru.":
    "makes the dot match newlines too.",
  "Contoh untuk dicoba": "Examples to try",
  "dengan flag": "with flag",
  "menemukan kata dan tidak membedakan huruf besar-kecil.":
    "finds words and is case-insensitive.",
  "menemukan tahun seperti": "finds years like",
  "memvalidasi teks yang hanya berisi huruf kecil.":
    "validates text containing only lowercase letters.",

  // ── Common states ──
  Catatan: "Notes",
}

export const id: TranslationDictionary = {}

export const translations: Record<Language, TranslationDictionary> = { id, en }
