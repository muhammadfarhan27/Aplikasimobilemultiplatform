import { Component } from '@angular/core'; 
import { NavController, NavParams } from 'ionic-angular'; 
import { UserAccount } from '../../models/user/user-model'; 
 
@Component({   
  selector: 'page-home',   
  templateUrl: 'home.html' 
}) 
export class HomePage { 
 
  userAccount: UserAccount = <UserAccount>{}; 
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {     
    this.userAccount = this.navParams.get("account");     
    console.log(this.userAccount);   
  } 
 
}