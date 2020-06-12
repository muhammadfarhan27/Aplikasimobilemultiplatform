import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {

  user = {
    'name': '',
    'email': ''
  }
    
  response: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private alertProvider: AlertProvider) {
    //mengambil data user dari local storage
    var user = JSON.parse(localStorage.getItem('user'));
    this.user.name = user.name;
    this.user.email = user.email;
  }

  //fungsi yang menangani permintaan logout
  //ke auth provider sekaligus mendapatkan response
  //dari server
  logout() {
    this.authProvider.logout().subscribe(
      result => {
        this.response = result;
        this.alertProvider.showToast(this.response.message)
        this.navCtrl.setRoot(LoginPage);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilePage');
  }

}
