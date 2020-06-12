import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductfavoriteProvider } from 
'../../providers/productfavorite/productfavorite';
import { AlertProvider } from '../../providers/alert/alert';

/**
 * Generated class for the MyfavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-myfavorite',
  templateUrl: 'myfavorite.html',
})
export class MyfavoritePage {

  product: any[] = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private productfavoriteProvider: ProductfavoriteProvider,
    private alertProvider: AlertProvider) {
      this.getAllFavorite();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyfavoritePage');
    this.getAllFavorite();
  }

  getAllFavorite(){
    this.productfavoriteProvider.getAll().then(
      (result:any[]) => {
        this.product = result;
      },
      error => {
        console.log("errornya: "+error);
      }
    )
  }

  remove(id:number){
    this.productfavoriteProvider.remove(id).then(
      result => { 
        this.alertProvider.showToast(result);
        this.getAllFavorite();
    },
    error => {
      this.alertProvider.showToast(error);
    }
  )
}



}
