import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController, NavParams, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
 
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { UserAccount } from '../../models/user/user-model';
import { LoginPage } from '../login/login';
import { DatabaseProvider } from '../../providers/database/database';
import { CategoryPage } from '../category/category';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  
  userAccount: UserAccount = <UserAccount>{};

  constructor(public platform: Platform, public statusBar: StatusBar, public navCtrl: NavController, public navParams:
NavParams, public alerCtrl: AlertController, public databaseProvider: DatabaseProvider) {
    this.initializeApp();
    this.userAccount = this.navParams.get("account");
    if(this.userAccount){
      console.log("userAccount Params available in MenuPage!");
      console.log(this.userAccount);
    }else{
      console.log("userAccount Params not Available in MenuPage!");
    }
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Manage Category', component: CategoryPage },
      { title: 'About Developer', component: AboutPage },
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.nav.push(HomePage, {menuAccount:
this.userAccount});
  }
 
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.databaseProvider.createDatabase()       
      .then(() => {         
        console.log("Success load database.");       
      })       
      .catch(() => {         
        console.log("Failed load database.");       
      });        
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, {menuAccount:
this.userAccount});
  }

  logout(){
    let confirm = this.alerCtrl.create({
      title: 'Confirm Logout',
      message: 'Do you really to logout?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          console.log('Yes clicked');
          this.navCtrl.setRoot(LoginPage);
        }
      }
    ]
  });
  confirm.present()
} 

}