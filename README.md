# Tugas 8 - Pertemuan 9

Nama : Aura Devany Salsabila Bachtiar

NIM : H1D022015

Shift Baru: Shift C

## Cara Kerja Login

1. Pengisian Formulir Login
   
   Di halaman login `login.page.html`, pengguna memasukkan username dan password pada dua elemen input bertipe text dan password yang terhubung ke variabel Angular username dan password dengan menggunakan `ngModel`.
 
   Form ini memiliki tombol Login yang akan memicu fungsi `login()` ketika diklik.

2. Pemanggilan Fungsi `login()`

   Ketika tombol Login ditekan, fungsi `login()` yang terdapat dalam komponen `login.page.ts` akan dieksekusi.

   Fungsi `login()` bertugas mengambil data username dan password dari input pengguna dan mengirimkannya ke backend melalui `AuthenticationService` untuk diverifikasi.

3. Pengiriman Data ke Server (Backend)

   Pada komponen login, `AuthenticationService` akan mengirim data username dan password ke server menggunakan metode `postMethod(data, link)` yang berisi endpoint login pada API.

   `AuthenticationService` menggunakan `HttpClient` untuk melakukan permintaan HTTP POST ke URL API, mengirimkan data login yang diisi oleh pengguna.

4. Verifikasi di Backend

   Di sisi server (backend), data username dan password akan diverifikasi:

      a. Server akan memeriksa apakah username yang dikirim ada dalam database.

      b. Jika username ditemukan, server akan memverifikasi password yang dikirim dengan password yang tersimpan di database. Password disimpan dalam bentuk hash (MD5), sehingga server perlu melakukan proses hashing pada input password untuk mencocokkannya.

   Jika username dan password cocok, server akan mengirimkan token otentikasi sebagai bukti bahwa pengguna berhasil masuk.

6. Penyimpanan Token dan Status Otentikasi

   Ketika server mengembalikan token otentikasi, `AuthenticationService` menyimpan token ini di penyimpanan lokal menggunakan `Capacitor Preferences` melalui fungsi `saveData(token, user)`.

   Fungsi `saveData()` akan menyimpan token dan username dalam `Preferences` untuk digunakan dalam sesi login berikutnya, serta mengatur `isAuthenticated` menjadi true, sehingga aplikasi tahu bahwa pengguna telah berhasil login.

7. Mengatur Navigasi Berdasarkan Status Login

   Setelah `isAuthenticated` diatur menjadi true, `authGuard` dan `autoLoginGuard` akan mengatur akses pengguna ke halaman-halaman tertentu.

   Auth Guard memeriksa status otentikasi pada `AuthenticationService.authenticationState`. Jika pengguna sudah login `isAuthenticated = true`, guard `autoLoginGuard` akan mengarahkan pengguna ke halaman `home`. Jika pengguna mencoba mengakses halaman yang memerlukan otentikasi tanpa login, guard `authGuard` akan mengalihkan mereka ke halaman `login`.

8. Logout

   Jika pengguna ingin logout, mereka dapat memicu fungsi `logout()` dari `AuthenticationService`, yang akan menghapus token dan data pengguna dari `Preferences`, mengatur `isAuthenticated` menjadi false, mengarahkan pengguna kembali ke halaman `login`.

## Screenshot

![Lampiran Tampil Data](tampildata.png)
![Lampiran Tambah Data Form](form_tambahdata.png)
![Lampiran Tambah Data](tambahdata.png)
![Lampiran Tambah Data Sukses](sukses_tambahdata.png)
![Lampiran Detail Data](detaildata.png)
![Lampiran Edit Data](editdata.png)
![Lampiran Edit Data Konfirmasi](konfirmasi_editdata.png)
![Lampiran Hasil Edit Data](hasil_editdata.png)
![Lampiran Hapus Data Konfirmasi](konfirmasi_hapusdata.png)
![Lampiran Hasil](hasil_hapusdata.png)
