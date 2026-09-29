# Portofolio: Laporan Asesmen Keamanan Siber

Portofolio keamanan siber yang disusun seperti laporan penetration test. HTML, CSS, dan JavaScript biasa, tanpa build.

## Lihat di komputer

Klik dua kali `index.html`, atau buka lewat browser.

## Ganti isinya

Semua isi ada di **`js/data.js`**. File lain tidak perlu disentuh.

1. Ganti nama, kampus, prestasi (`findings`), writeup, proyek, sertifikat, kronologi, dan kontak.
2. Isi tautan bukti (sertifikat, scoreboard, writeup, repo). Tautan yang masih `"#"` tampil putus-putus supaya kelihatan mana yang belum diisi.
3. Kalau punya CV, taruh `cv.pdf` di folder ini lalu isi `cvUrl: "cv.pdf"`.
4. Setelah semua data asli, ubah `status: "draf"` jadi `status: "final"`. Tanda DRAF akan hilang dan tautan kosong disembunyikan.

Tingkat temuan: `kritis`, `tinggi`, `sedang`, `rendah`, `info` (penjelasannya ada di bagian atas `data.js`).

Tulis `F-01` atau `§4` di dalam teks, nanti otomatis jadi tautan ke temuan atau bagian itu.

## Online-kan gratis

- **GitHub Pages:** buat repo, upload semua file, buka Settings → Pages → pilih branch `main`.
- **Netlify:** buka app.netlify.com/drop, seret folder ini ke sana.
- **Vercel:** import repo GitHub-nya, tanpa pengaturan tambahan.

Folder `.impeccable/`, `PRODUCT.md`, dan `DESIGN.md` adalah catatan desain. Tidak dipakai website, boleh ikut di-upload atau tidak.
