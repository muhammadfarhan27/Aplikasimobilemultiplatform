import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user ={
    'email':'',
    'password':'',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private alertProvider: AlertProvider) {
  }

  //fungsi yang digunakan untuk mengirim data username dan password
  //apabila tombol login di click
  login(){
    //perintah dibawah untuk mengirim data username dan password
    //ke provider auth sekaligus   mendapatkan hasilnya/responsce
    //dari end point.
    this.authProvider.login(this.user).subscribe(
      result => {
        this.alertProvider.showToast("Berhasil login!")
        this.navCtrl.setRoot(TabsPage);
      },
      error => {
        this.alertProvider.showToast("Username dan password salah!");
      }
    );
  }

  //untuk membuka halaman registrasi
  showRegisterForm(){
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    //untuk mengecek jika sudah ada token yang tersimpan
    //maka langsung menampilkan halaman home / dashboard
    let token = localStorage.getItem('user');
    if (token != null) {
      this.navCtrl.setRoot(TabsPage);
    }
  }

}
