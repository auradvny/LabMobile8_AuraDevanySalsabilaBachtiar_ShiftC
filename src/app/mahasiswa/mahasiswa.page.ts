import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.page.html',
  styleUrls: ['./mahasiswa.page.scss'],
})
export class MahasiswaPage implements OnInit {
  dataMahasiswa: any;
  modalTambah: boolean = false;
  modalEdit: boolean = false;
  id: any;
  nama: any;
  jurusan: any;

  constructor(
    private api: ApiService,
    private modal: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getMahasiswa();
  }

  getMahasiswa() {
    this.api.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataMahasiswa = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  resetModal() {
    this.id = null;
    this.nama = '';
    this.jurusan = '';
  }

  openModalTambah(isOpen: boolean) {
    this.modalTambah = isOpen;
    this.resetModal();
  }

  openModalEdit(isOpen: boolean, idget: any) {
    this.modalEdit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilMahasiswa(this.id);
  }

  cancel() {
    this.modal.dismiss();
    this.modalTambah = false;
    this.modalEdit = false;
    this.resetModal();
  }

  async tambahMahasiswa() {
    if (this.nama && this.jurusan) {
      let data = {
        nama: this.nama,
        jurusan: this.jurusan,
      };
      this.api.tambah(data, 'tambah.php').subscribe({
        next: async (hasil: any) => {
          this.resetModal();
          console.log('berhasil tambah mahasiswa');

          // Tampilkan notifikasi konfirmasi
          const alert = await this.alertController.create({
            header: 'Sukses',
            message: 'Data mahasiswa berhasil ditambahkan!',
            buttons: ['OK']
          });
          await alert.present();

          this.getMahasiswa();
          this.modalTambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah mahasiswa');
        },
      });
    } else {
      console.log('gagal tambah mahasiswa karena masih ada data yg kosong');
    }
  }


  async hapusMahasiswa(id: any) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Hapus',
      message: 'Apakah Anda yakin ingin menghapus data ini?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {
            console.log('Hapus dibatalkan');
          }
        },
        {
          text: 'Ya',
          handler: () => {
            this.api.hapus(id, 'hapus.php?id=').subscribe({
              next: (res: any) => {
                console.log('sukses', res);
                this.getMahasiswa();
                console.log('berhasil hapus data');
              },
              error: (error: any) => {
                console.log('gagal');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  ambilMahasiswa(id: any) {
    this.api.lihat(id, 'lihat.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let mahasiswa = hasil;
        this.id = mahasiswa.id;
        this.nama = mahasiswa.nama;
        this.jurusan = mahasiswa.jurusan;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      }
    });
  }

  async editMahasiswa() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Update',
      message: 'Apakah Anda yakin ingin mengupdate data ini?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {
            console.log('Update dibatalkan');
          }
        },
        {
          text: 'Ya',
          handler: () => {
            let data = {
              id: this.id,
              nama: this.nama,
              jurusan: this.jurusan
            };
            this.api.edit(data, 'edit.php').subscribe({
              next: (hasil: any) => {
                console.log(hasil);
                this.resetModal();
                this.getMahasiswa();
                console.log('berhasil edit Mahasiswa');
                this.modalEdit = false;
                this.modal.dismiss();
              },
              error: (err: any) => {
                console.log('gagal edit Mahasiswa');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }
}