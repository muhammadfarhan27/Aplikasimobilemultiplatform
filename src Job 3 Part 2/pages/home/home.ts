import { Component } from '@angular/core'; 
import { NavController, NavParams, ViewController, MenuController, ToastController } from 'ionic-angular'; 
import { UserAccount } from '../../models/user/user-model'; 
import { ProductProvider } from '../../providers/product/product'; 
import { Product } from '../../models/product/product-model';
import { EditProductPage } from '../edit-product/edit-product';

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
    private viewCtrl: ViewController, menu: MenuController, 
    private toast: ToastController, private productProvider: ProductProvider) {     
      menu.enable(true);     
    cd..  this.userAccount = this.navParams.get("menuAccount");     
      if(this.userAccount){       
        console.log("userAccount Params available in HomePage!");       
        console.log(this.userAccount);     
      }else{       
        console.log("userAccount Params not Available in HomePage!");     
      }   
    } 
 
 ionViewWillEnter() {     
   this.viewCtrl.showBackButton(false);  
  } 
 
 ionViewDidEnter(){    
   this.getAllProducts();  
  } 
 
 getAllProducts(){    
   this.productProvider.getAll(!this.onlyInactives, this.searchText)    
   .then((result: any[]) => {      
     this.products = result;    
    });  
  } 
 
 addProduct(){      
  this.navCtrl.push(EditProductPage);
 } 
 
 editProduct(id: number){ 
  this.navCtrl.push(EditProductPage, {id: id});
 } 
 
 removeProduct(product: Product){    
   this.productProvider.remove(product.id).then(() => {      
     var index = this.products.indexOf(product);
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
    }