import { Component } from '@angular/core';
import { NavController, NavParams , ViewController, MenuController
, ToastController} from 'ionic-angular';
import { UserAccount } from '../../models/user/user-model';
import { UserAccount } from '../../models/user/user-model';
import { UserAccount } from '../../models/user/user-model';
import { ProductProvider } from
'../../providers/product/product';
import { Product } from '../../models/product/product-model;
import { EditProductPage } from '../edit-product/editproduct';
import { FavoriteProvider } from
'../../providers/favorite/favorite';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userAccount: UserAccount = <UserAccount>{};
  products: any[] = [];
 onlyInactives: boolean = false;
 searchText: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    menu: MenuController) {
     menu.enable(true);
     this.userAccount = this.navParams.get("menuAccount");
     if(this.userAccount){
     console.log(this.userAccount);
     }else{
     console.log("userAccount Params not Available in
    HomePage!");
     }
     }
     ionViewWillEnter() {
     this.viewCtrl.showBackButton(false);
    }
    }) 
    
    ionViewDidEnter(){
      this.getAllProducts();
     }
     getAllProducts(){
      this.productProvider.getAll(!this.onlyInactives,
     this.searchText)
      .then((result: any[]) => {
      this.products = result;
      });
     }
     addProduct(){
     
     }
     editProduct(id: number){
     }
     removeProduct(product: Product){
      this.productProvider.remove(product.id).then(() => {
      var index = this.products.indexOf(product);{

        this.products.splice(index, 1);
 this.toast.create({
 message: 'Product telah dihapus.',
 duration: 3000,
 position: 'bottom'
 }).present();
 });
}
filterProducts(ev: any){
 this.getAllProducts();
}
    this.userAccount = this.navParams.get("account");
 console.log(this.userAccount);
  }

  addToFavorite(product: Product){
    this.favoriteProvider.get(product.id).then((result:
   boolean)=>{
    if(result){
    console.log("Product sudah menjadi favorite :",
   result);
    this.toast.create({
    message: "Product sudah menjadi favorite!",
    duration: 3000,
    position: "bottom"
    }).present();
    }else{
    console.log("Product belum favorite!");
    this.favoriteProvider.addFavorite(product).then(()
   => {
    this.toast.create({
    message: "Product berhasil ditambahkan ke
   favorite!",
    duration: 3000,
    position: "bottom"
    }).present();
    });
    }
    this.getAllProducts();
    });
    }
   

}
