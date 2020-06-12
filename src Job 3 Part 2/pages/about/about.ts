import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { UserAccount } from '../../models/user/user-model';
import { UserProvider } from '../../providers/user/user';
import { MenuPage } from '../menu/menu'; 

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  model: UserAccount = <UserAccount>{};

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider,
private toastController: ToastController) {
    this.model = this.navParams.get('menuAccount');
    if(this.model){
      console.log("userAccount Params available in AboutPage!");
      console.log(this.model);
    }else{
      console.log("userAccount Params not Available in AboutPage!");
    }
  }

  updateProfile(){
    if(!this.model.username || !this.model.password ||
!this.model.position || !this.model.phone ||
!this.model.email || !this.model.affiliation){
      this.showToast("Please fill user profile completely!");
      return null;
    }
    this.model.modified = Date.now();
   
this.userProvider.updateUserAccount(this.model).then(userAccounts => {
      if(userAccounts != null){
        this.showToast("Profile update success!");
        this.navCtrl.push(MenuPage, {account: this.model});
      }else{
        this.showToast("Profile update failed!");
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
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