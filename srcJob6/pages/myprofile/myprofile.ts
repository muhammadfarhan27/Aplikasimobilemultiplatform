import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { LoginPage } from '../login/login';

/**
 * Generated class for the MyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider) {

      var user= JSON.parse(localStorage.getItem('user'));
      this.user.name = user.name;
      this.user.email = user.email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilePage');
  }

  logout() {
    this.authProvider.logout().subscribe(
      result => {
        this.response = result;
        this.alertProvider.showToast(this.response.message)
        this.navCtrl.setRoot(LoginPage);
      }
    );
  }

}
