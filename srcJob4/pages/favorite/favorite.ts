import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { UserAccount } from '../../models/user/user-model';
import { FavoriteProvider } from
'../../providers/favorite/favorite';
import { Product } from '../../models/product/product-model';
/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  userAccount: UserAccount = <UserAccount>{};
 products: any[] = [];
 searchText: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams
    FavoriteProvider, private toast: ToastController) {
      this.userAccount = this.navParams.get("menuAccount");
      if(this.userAccount){
      console.log("userAccount Params available in
      FavoritePage!");

      console.log(this.userAccount);
 }else{
 console.log("userAccount Params not Available in
FavoritePage!");
 }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritePage');
  }

  ionViewDidEnter(){
    this.getAllFavoriteProduct();
    }
    getAllFavoriteProduct(){
   
   this.favoriteProvider.getAllFavorite(this.searchText).then((
   result: any[]) => {
    this.products = result;
    });
    }
    removeFavoriteProduct(product: Product){
    this.favoriteProvider.removeFavorite(product.id).then(()
   => {
    var index = this.products.indexOf(product);
    this.products.splice(index, 1);
    this.toast.create({
    message: 'Product favorite telah dihapus.',
    duration: 3000,
    position: 'bottom'
    }).present();
    });
    }
    filterFavoriteProducts(ev: any){
    this.getAllFavoriteProduct();
    }

}
