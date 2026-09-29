/*
 * ============================================================
 *  DATA PORTOFOLIO
 * ============================================================
 *  Semua isi website ada di file ini. Ubah teks & tautan di
 *  bawah, simpan, lalu refresh browser.
 *
 *  meta.status:
 *    "final"  isi sudah asli, tampil normal
 *    "draf"   tampil tanda DRAF, tautan kosong ditandai putus-putus
 *
 *  Tingkat temuan (level) yang bisa dipakai:
 *    "kritis"  juara, medali, atau finalis kompetisi nasional/internasional
 *    "tinggi"  peringkat 10% teratas kompetisi terbuka, sertifikasi profesional
 *    "sedang"  penghargaan resmi di kompetisi nasional, prestasi tingkat kampus
 *    "rendah"  partisipasi kompetisi atau proyek belajar
 *    "info"    sedang dipelajari atau target berikutnya
 *
 *  Bagian yang daftarnya kosong ([]) otomatis disembunyikan,
 *  dan nomor bagian (§) menyesuaikan sendiri.
 * ============================================================
 */

window.PORTFOLIO = {
  meta: {
    status: "final",
    docId: "RPT-2026-001",
    version: "1.0",
    date: "2026-09-29",           // format TAHUN-BULAN-TANGGAL
    history: [
      { version: "1.0", date: "2026-09-29", note: "Versi pertama" }
    ]
  },

  profile: {
    name: "Aurellio Martha Yoga Ranendra",
    shortName: "Aurellio",        // dipakai di kalimat ringkasan
    handle: "",                   // nama/handle CTF, kalau ada
    role: "Mahasiswa Cyber Security · Minat Malware Analysis · Pemrograman Kompetitif",
    institution: "BINUS University",
    program: "S1 Cyber Security",
    highSchool: "SMA N Agam Cendekia (lulus 2024)",
    semester: "",                 // contoh: "Semester 3"
    location: "",                 // contoh: "Jakarta, Indonesia"
    focus: "Malware analysis dan algoritma",
    cvUrl: "",                    // contoh: "dokumen/cv.pdf"
    summary: [
      "Aurellio adalah mahasiswa S1 Cyber Security di BINUS University. Minat utamanya adalah malware analysis: membedah cara kerja program berbahaya supaya bisa dideteksi dan dicegah. Ia sudah pernah memakai Ghidra dan x64dbg, dan membangun dasar keamanan siber lewat Hack The Box, materi kuliah, dan belajar mandiri.",
      "Dasar C/C++ dari pemrograman kompetitif membantunya membaca kode tingkat rendah, bekal utama untuk reverse engineering. Kemampuan pemrogramannya sudah diuji di ICPC 2025 Asia Jakarta – Indonesia National Contest, kompetisi pemrograman antar-universitas tingkat nasional, dengan penghargaan Honorable Mention (F-01).",
      "Di luar bidang teknis, Aurellio berpengalaman memimpin kepanitiaan, antara lain sebagai Ketua Kesekretariatan sekaligus Ketua Dokumentasi CJSC 2023 (acara tingkat SMP se-Sumatera Barat) dan Ketua Pagelaran Seni 2021, serta menjadi volunteer BINUS International Week 2026.",
      "Kesimpulan: kandidat berada di tahap awal di bidang keamanan siber, dengan arah yang jelas ke malware analysis, dasar pemrograman yang sudah diuji di kompetisi tingkat nasional, dan pengalaman memimpin di kepanitiaan."
    ]
  },

  // Ruang lingkup: bidang yang dikuasai atau sedang dipelajari.
  // "status" ditulis apa adanya. "findings" = ID temuan yang jadi buktinya.
  scope: [
    { domain: "Algoritma dan struktur data", status: "Teruji di kompetisi", tools: "C++", reference: "Format soal ICPC", findings: ["F-01"] },
    { domain: "Malware analysis dan reverse engineering", status: "Sedang dipelajari", tools: "Ghidra, x64dbg", reference: "-", findings: ["F-02"] },
    { domain: "Keamanan siber dan CTF", status: "Sedang dipelajari", tools: "Hack The Box, video, artikel, materi kuliah", reference: "-", findings: ["F-03"] },
    { domain: "Pemrograman", status: "Digunakan", tools: "C++, Python, Java, C", reference: "-", findings: [] }
  ],

  // Pengalaman organisasi & kepanitiaan. Urutkan dari yang terbaru.
  organizations: [
    { role: "Volunteer, divisi Transportasi", activity: "BINUS International Week 2026", scope: "Kampus", year: "2026" },
    { role: "Ketua Kesekretariatan (Kestari) dan Ketua Dokumentasi", activity: "CJSC 2023, SMA N Agam Cendekia", scope: "Tingkat SMP se-Sumatera Barat", year: "2023" },
    { role: "Anggota bidang Informasi dan Komunikasi (dokumentasi)", activity: "OSIS SMA N Agam Cendekia", scope: "Sekolah", year: "2022" },
    { role: "Ketua", activity: "Pagelaran Seni", scope: "Sekolah", year: "2021" },
    { role: "Anggota bidang Olahraga", activity: "OSIS SMP", scope: "Sekolah", year: "2020" },
    { role: "Anggota", activity: "Komunitas Ruang Bangkit, kolektif seni dan budaya di Batusangkar", scope: "Komunitas", year: "Sejak 2020" },
    { role: "Anggota", activity: "Remaja masjid", scope: "Masyarakat", year: "Sejak 2013" }
  ],
  organizationsNote: "Sertifikat kepanitiaan tidak lagi tersedia. Dokumentasi foto bisa ditunjukkan atas permintaan.",

  // Penilaian mandiri: nilai 1-10 diisi sendiri (sama seperti formulir kampus).
  // Ditampilkan sebagai 5 bintang: 1 bintang = 2 poin, setengah bintang = 1 poin.
  // Tanpa angka? Pakai levelText, contoh: levelText: "Bahasa utama".
  skills: [
    { type: "Kepemimpinan", skill: "Disciplined Team Leadership", level: 8, basis: "Dibentuk di SMA N Agam Cendekia yang berkonsep semi-militer: disiplin, tanggung jawab, dan struktur komando yang jelas. Diterapkan saat memimpin dua divisi sekaligus di CJSC 2023 (Kesekretariatan dan Dokumentasi) dan sebagai Ketua Pagelaran Seni 2021." },
    { type: "Organisasi", skill: "Event & Committee Management", level: 8, basis: "Aktif berorganisasi sejak SD: remaja masjid, Komunitas Ruang Bangkit, OSIS SMP dan SMA, Kestari dan Ketua Dokumentasi CJSC 2023, Ketua Pagelaran Seni 2021, dan volunteer BINUS International Week 2026." },
    { type: "Komunikasi", skill: "Public Speaking & Negotiation", level: 7, basis: "Terbiasa presentasi dan berbicara di depan umum, serta berkomunikasi dan bernegosiasi dengan berbagai pihak sebagai Ketua Kesekretariatan CJSC 2023. Sedang melatih presentasi dalam Bahasa Inggris." },
    { type: "Teknis", skill: "Network & System Security", level: 7, basis: "Fokus jurusan Cyber Security: arsitektur jaringan, keamanan sistem operasi Linux dan Windows, analisis lalu lintas data." },
    { type: "Komputer", skill: "Data Structures & Algorithms", level: 6, basis: "Pemecahan masalah dengan struktur data dan algoritma, teruji di ICPC 2025 (F-01)." },
    { type: "Proyek", skill: "Academic Project Management", level: 6, basis: "Ketua kelompok tugas kuliah: membagi pekerjaan, menentukan tenggat, dan memastikan target tim tercapai." },
    { type: "Bahasa", skill: "English (Passive)", level: 5, basis: "Lancar membaca dokumentasi teknis dan menyimak, sedang melatih speaking." },
    { type: "Bahasa", skill: "Bahasa Indonesia", levelText: "Bahasa utama", basis: "Bahasa sehari-hari dan perkuliahan." }
  ],

  rulesOfEngagement: "Latihan keamanan dilakukan di lingkungan yang sah: platform latihan seperti Hack The Box, lab perkuliahan, dan perangkat milik sendiri. Tidak ada pengujian terhadap sistem orang lain tanpa izin.",

  // Temuan = prestasi & pengalaman utama. Urutkan dari yang paling kuat.
  findings: [
    {
      id: "F-01",
      level: "sedang",
      title: "Honorable Mention, ICPC 2025 Asia Jakarta – Indonesia National Contest",
      category: "Kompetisi pemrograman",
      date: "2025-10",
      vector: "ICPC · kompetisi tim antar-universitas · tingkat nasional · 25–26 Oktober 2025",
      description: "Mewakili BINUS University di Indonesia National Contest, kontes tingkat nasional dalam rangkaian ICPC Asia Jakarta untuk tim antar-universitas. Mengerjakan soal algoritma dan struktur data dalam batas waktu bersama tim.",
      result: "Menerima penghargaan Honorable Mention, tercantum di Certificate of Achievement dari ICPC Foundation.",
      evidence: [
        { label: "Sertifikat (PDF)", url: "dokumen/sertifikat-icpc-2025.pdf" }
      ]
    },
    {
      id: "F-02",
      level: "info",
      title: "Belajar malware analysis dengan Ghidra dan x64dbg",
      category: "Latihan mandiri",
      date: "Sedang berjalan",
      vector: "Ghidra (disassembler) · x64dbg (debugger) · C/C++",
      description: "Mempelajari cara membongkar dan menelusuri program tingkat rendah: membaca hasil disassembly di Ghidra dan mengikuti jalannya program di x64dbg, sebagai langkah awal menuju malware analysis.",
      result: "Belum ada laporan analisis. Laporan pertama masuk rencana tindak lanjut di bawah.",
      evidence: []
    },
    {
      id: "F-03",
      level: "info",
      title: "Belajar CTF dan penetration testing di Hack The Box",
      category: "Latihan mandiri",
      date: "Sedang berjalan",
      vector: "Hack The Box · video · artikel · materi kuliah Cyber Security",
      description: "Mempelajari dasar CTF dan penetration testing secara mandiri, sejalan dengan mata kuliah di jurusan Cyber Security.",
      result: "Belum ada peringkat atau sertifikat. Tautan profil Hack The Box bisa ditambahkan di sini setelah tersedia.",
      evidence: []
    }
  ],

  // Writeup CTF. Contoh isi:
  // { category: "web", title: "Judul writeup", event: "Nama CTF", points: 100, url: "https://...", featured: true, note: "Ringkasan singkat" }
  writeups: [],

  // Alat & proyek buatan sendiri. Contoh isi:
  // { name: "nama-repo", tagline: "Fungsinya", stack: "Python", url: "https://github.com/marthayoga/nama-repo", stars: 0 }
  tools: [],

  // Sertifikat & pelatihan. "linkLabel" (opsional) = tulisan di tombol tautan.
  certifications: [
    { name: "Certificate of Achievement, ICPC 2025 Asia Jakarta – Indonesia National Contest", issuer: "ICPC Foundation", date: "2025-10", credentialUrl: "dokumen/sertifikat-icpc-2025.pdf", linkLabel: "Buka PDF" },
    { name: "Seminar Navigating Cybersecurity Landscapes: Understanding the Basics of Threat Intelligence", issuer: "", date: "2024-11-22", credentialUrl: "" }
  ],

  // Kronologi. Contoh isi: { date: "2024-09", text: "Mulai kuliah S1 Cyber Security", ref: "F-01" }
  timeline: [],

  // Rencana tindak lanjut: target belajar berikutnya. Ubah sesuai rencana kamu.
  // done: true kalau sudah tercapai (tanda berubah jadi kotak penuh).
  plan: [
    { target: "Q4 2026", text: "Laporan analisis malware pertama: satu sampel latihan dianalisis secara statis dan dinamis di VM terisolasi, lengkap dengan hash, indikator (IOC), dan rule YARA.", done: false },
    { target: "Q4 2026", text: "Mengunggah solusi latihan pemrograman kompetitif dan catatan belajar ke GitHub.", done: false },
    { target: "Q1 2027", text: "Menyelesaikan 10 machine Hack The Box dan menautkan profilnya di laporan ini.", done: false }
  ],

  // Rekomendasi: penutup laporan, ditujukan ke pembaca. Tulis "F-01" atau "§3" supaya otomatis jadi tautan.
  recommendations: [
    "Undang kandidat untuk wawancara. Kandidat siap menjelaskan pengalamannya di ICPC 2025 (F-01) dan minatnya di malware analysis (F-02).",
    "Hubungi lewat email atau LinkedIn di bawah."
  ],

  // Kontak. Ditampilkan sebagai teks yang bisa disalin, plus tombol buka.
  contact: {
    email: "ranendrayoga@gmail.com",
    emailKampus: "aurellio.ranendra@binus.ac.id",
    linkedin: "id.linkedin.com/in/aurellio-martha-yoga-ranendra",
    github: "github.com/marthayoga"
  }
};
