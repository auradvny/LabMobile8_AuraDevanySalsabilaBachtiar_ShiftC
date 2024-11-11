# Tugas 8 - Pertemuan 9

Nama : Aura Devany Salsabila Bachtiar

NIM : H1D022015

Shift Baru: Shift C

## Cara Kerja Create (Tambah Data Mahasiswa)

![Lampiran Tampil Data Awal](tampildata1.png)
![Lampiran Tambah Data Form](form_tambahdata.png)
![Lampiran Tambah Data](tambahdata.png)
![Lampiran Tambah Data Sukses](sukses_tambahdata.png)

1. Tombol Tambah Mahasiswa
   
  Pada halaman utama, terdapat tombol `Tambah Mahasiswa`. Ketika tombol ini diklik, akan membuka modal `Tambah Mahasiswa` dengan memanggil fungsi `openModal('add')`.

2. Modal Tambah

   Modal ini berisi form untuk memasukkan nama dan jurusan mahasiswa.

   Form Input: Form input dilengkapi dengan atribut `[(ngModel)]="nama"` dan `[(ngModel)]="jurusan"` untuk mengikat nilai input dengan variabel dalam komponen (two-way data binding).

3. Validasi Input

   Ketika pengguna menekan tombol `Tambah Mahasiswa`, fungsi `tambahMahasiswa()` akan dipanggil. Di dalam fungsi ini, terdapat pengecekan apakah nilai nama dan jurusan telah diisi. Jika salah satu kosong, maka sistem akan memunculkan pesan kesalahan melalui fungsi `showAlert`.

4. Pengiriman Data ke Server

   Jika semua input terisi, data mahasiswa (nama dan jurusan) akan dikirimkan ke server melalui fungsi `tambah()`. Fungsi ini menggunakan `apiService` untuk melakukan HTTP POST ke server (di endpoint `tambah.php`).

5. Feedback ke Pengguna

  Jika penambahan data berhasil, sistem akan menampilkan pesan konfirmasi sukses dan memperbarui daftar mahasiswa dengan memanggil `getMahasiswa()`. Modal akan ditutup menggunakan `closeModal()`.

## Cara Kerja Read (Tampilkan Data Mahasiswa)

![Lampiran Tampil Data](tampildata2.png)

1. Fungsi Get Mahasiswa
   
  Ketika halaman `MahasiswaPage` pertama kali dimuat (fungsi `ngOnInit`), fungsi `getMahasiswa()` akan dipanggil untuk mengambil data dari server.

2. Proses Pengambilan Data

   `getMahasiswa()` memanggil `apiService.tampil()` yang mengirimkan permintaan GET ke server (di endpoint `tampil.php`). Server kemudian mengembalikan daftar mahasiswa dalam format JSON, yang disimpan ke variabel `dataMahasiswa`.

3. Menampilkan Data di Halaman

   Dengan menggunakan directive Angular `*ngFor`, setiap data mahasiswa dalam `dataMahasiswa` akan ditampilkan sebagai `ion-card` yang menampilkan nama dan jurusan. Tiap data juga memiliki tombol Hapus dan Edit untuk aksi lanjutan.

## Cara Kerja Update (Edit Data Mahasiswa)

![Lampiran Tambah Data Hasil](tampildata2.png)
![Lampiran Detail Data](detaildata.png)
![Lampiran Edit Data](editdata.png)
![Lampiran Edit Data Konfirmasi](konfirmasi_editdata.png)
![Lampiran Hasil Edit Data](hasil_editdata.png)

1. Tombol Edit
   
  Setiap data mahasiswa yang ditampilkan memiliki tombol `Edit`. Ketika tombol ini diklik, fungsi `openModal('edit', item.id)` akan dipanggil dengan parameter `item.id` (ID dari data mahasiswa yang akan diedit).

2. Mengambil Data Mahasiswa untuk Diedit

   Fungsi `openModal('edit', id)` akan memanggil fungsi `ambilMahasiswa(id)` untuk mendapatkan data mahasiswa berdasarkan id yang dipilih. Fungsi ini memanggil `apiService.lihat()` yang mengirimkan permintaan GET ke server (endpoint `lihat.php?id=`) untuk mengambil data spesifik berdasarkan ID. Data yang didapatkan kemudian disimpan dalam variabel nama dan jurusan.

3. Modal Edit

   Modal ini mirip dengan modal tambah, namun data yang ditampilkan telah diisi dengan data mahasiswa yang diambil berdasarkan ID. Pengguna dapat mengedit data tersebut.
   
4. Mengirim Perubahan ke Server

  Setelah perubahan dilakukan, pengguna menekan tombol `Edit Mahasiswa`, yang memanggil fungsi `editMahasiswa()`. Di dalam fungsi ini, data mahasiswa baru (id, nama, jurusan) dikirim ke server menggunakan `apiService.edit()` (endpoint `edit.php`).

5. Feedback ke Pengguna
   
  Jika proses edit berhasil, pesan konfirmasi akan ditampilkan dan daftar mahasiswa diperbarui. Modal kemudian ditutup.

## Cara Kerja Delete (Hapus Data Mahasiswa)

![Lampiran Hasil Edit Data](hasil_editdata.png)
![Lampiran Hapus Data Konfirmasi](konfirmasi_hapusdata.png)
![Lampiran Hasil](hasil_hapusdata.png)

1. Tombol Hapus
   
  Setiap data mahasiswa yang ditampilkan memiliki tombol `Hapus`. Ketika tombol ini diklik, fungsi `hapusMahasiswa(item.id)` dipanggil.

2. Konfirmasi Penghapusan

   Sebelum data dihapus, sistem akan meminta konfirmasi dari pengguna dengan menampilkan dialog konfirmasi menggunakan `AlertController`. Dialog ini memiliki pesan Apakah Anda yakin ingin menghapus data ini? dan dua pilihan: Tidak (membatalkan) dan Ya (melanjutkan penghapusan).

3. Menghapus Data dari Server

  Jika pengguna memilih Ya, maka data mahasiswa akan dihapus dari server menggunakan `apiService.hapus()` dengan mengirimkan ID mahasiswa ke endpoint `hapus.php?id=`.

4. Feedback ke Pengguna

  Jika penghapusan berhasil, daftar mahasiswa diperbarui untuk menghilangkan data yang baru saja dihapus.

### Fungsi Tambahan

Alert Feedback: Fungsi showAlert memberikan notifikasi atau konfirmasi kepada pengguna. Ini dipanggil setelah setiap operasi berhasil atau gagal. Alert ini memiliki judul (header) dan pesan (message) yang berbeda sesuai konteks.

### Alur CRUD di Aplikasi

1. Read: Data diambil dari server ketika halaman pertama kali dimuat.

2. Create: Data baru ditambahkan melalui form, dan jika berhasil, halaman diperbarui.

3. Update: Data yang sudah ada bisa diedit, disimpan kembali ke server, dan halaman diperbarui.

4. Delete: Data yang tidak diperlukan bisa dihapus setelah konfirmasi, dan halaman diperbarui.
