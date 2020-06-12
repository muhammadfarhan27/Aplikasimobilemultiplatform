import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { RegisterPage } from '../register/register';
import { AlertProvider } from '../../providers/alert/alert';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    'email': '',
    'password': '',
  };

  constructor(
    public navCtrl: NavController,
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider) 
    { }

  Login() {
    this.authProvider.login(this.user).subscribe(
      result => {
        this.alertProvider.showToast("Berhasil Login");
        this.navCtrl.setRoot(TabsPage);
      },
      error => {
        this.alertProvider.showToast("Username dan password salah");
      });
    }
    
    showRegisterForm() {
      this.navCtrl.push(RegisterPage);
      }
  
  ionViewDidLoad() {
   let token = localStorage.getItem('user');
   if (token != null) {
     this.navCtrl.setRoot(TabsPage);
   }
  }

}
