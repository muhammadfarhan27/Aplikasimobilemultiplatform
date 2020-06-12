import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { UserAccount } from '../../models/user/user-model';
import { UserProvider } from '../../providers/user/user'; 

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  userAccount: UserAccount = <UserAccount>{};

  constructor(public navCtrl: NavController, private userProvider: UserProvider, private toastController: ToastController) { 
  }

  registerUser(){
    this.userAccount.modified = Date.now();
    this.userAccount.id = Date.now();

   
this.userProvider.addUserAccount(this.userAccount).then(item => {
      console.log(this.userAccount);
      this.showToast("User Account added!");
      this.navCtrl.popToRoot();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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