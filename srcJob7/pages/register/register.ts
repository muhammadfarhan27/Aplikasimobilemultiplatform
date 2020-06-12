import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user/user-model';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = new User();
  response : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertProvider: AlertProvider, private authProvider: AuthProvider) {
  }

  //fungsi yang menangani pengiriman data ke provider auth
  //pada saat tombol register di click
  register(){
    //if ini untuk memastikan agar ke 2 password sama
    if(this.user.password == this.user.c_password) {
      //mengirim data ke auth provider
      //sekaligus mendapatkan response dari end point
      this.authProvider.register(this.user).subscribe(
        result => {
          this.alertProvider.showToast("Register berhasil")
          this.navCtrl.pop();
          console.log(result);
        },
        error => {
          this.response = error.error;
          console.log(error.error);
          this.alertProvider.showToast("Register gagal, coba dengan email lain!")
        }
      )
    } else {
      this.alertProvider.showToast("Password harus sama!")
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
