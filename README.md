# Bookshelf App

<img width="1919" height="991" alt="image" src="https://github.com/user-attachments/assets/8aa49e68-16df-43a8-a262-2596bf170d39" />

Bookshelf App adalah proyek tugas akhir dari kelas **Belajar Membuat Front-End Web untuk Pemula** di Dicoding / Asah. Aplikasi ini memungkinkan pengguna untuk **menambah, mengubah, menghapus**, dan **menandai status buku** (selesai atau belum selesai dibaca).

---

## 📚 Fitur

- Menambahkan buku baru dengan detail: judul, penulis, tahun, status (selesai / belum selesai)  
- Mengubah data buku yang sudah ada  
- Menghapus buku  
- Mengganti status buku dari “belum selesai dibaca” ke “selesai dibaca” dan sebaliknya  
- Data buku ditampilkan dalam dua daftar:  
  1. Buku yang belum selesai dibaca  
  2. Buku yang sudah selesai dibaca  

---

## 🔍 Teknis & Struktur

- **Teknologi**: HTML, CSS, JavaScript (vanilla)  
- **File utama**:  
  - `index.html` — struktur halaman  
  - `style.css` — stylesheet  
  - `main.js` — logika aplikasi (CRUD & status buku)  
- **Penanda penting (`data-testid` dan `data-bookid`)**  
  Untuk keperluan penilaian dan testing, ada beberapa atribut yang *tidak boleh diubah atau dihapus*:

  | Atribut | Kegunaan |
  |---------|----------|
  | `data-bookid` | Menandai ID unik untuk tiap elemen buku |
  | `data-testid` | Penanda untuk test / identifikasi elemen UI; jenis elemen seperti: `bookItem`, `bookItemTitle`, `bookItemAuthor`, `bookItemYear`, `bookItemIsCompleteButton`, `bookItemDeleteButton`, `bookItemEditButton` |

---

## 🛠 Cara Penggunaan / Instalasi

1. Clone repository ini  
   ```bash
   git clone https://github.com/Nino-123/Bookself-App.git


