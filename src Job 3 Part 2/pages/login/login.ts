import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { UserAccount } from '../../models/user/user-model';
import { UserProvider } from '../../providers/user/user';
import { RegisterPage } from '../register/register';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userAccounts: UserAccount[] = [];
  newUser: UserAccount = <UserAccount>{};

  constructor(private navCtrl: NavController, private userProvider: UserProvider, 
    private platform: Platform, private toastController: ToastController) {
    this.platform.ready().then(() =>{

    });
}

ionViewDidLoad() {
  console.log('ionViewDidLoad LoginPage');
}

checkLoginAccount(){
  if(!this.newUser.username || !this.newUser.password){
    this.showToast("Please fill completely username and password!");
    return null;
  }
 
this.userProvider.validateUserAccount(this.newUser.username,
this.newUser.password).then(userAccount => {
    if(userAccount != null){
      this.showToast("Login success!"); 
      this.navCtrl.setRoot(MenuPage, {account:
userAccount}); 
    }else{
      this.showToast("Username and password not available, please sign up!");
    }
  });
}

openRegisterForm(){
  this.navCtrl.push(RegisterPage);
}

//Helper
async showToast(msg){
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000
  });
  toast.present();
} 

} 
