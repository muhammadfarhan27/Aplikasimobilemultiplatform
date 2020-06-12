import { Component } from '@angular/core'; 
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular'; 
import { Product } from '../../models/product/product-model'; 
import { ProductProvider } from '../../providers/product/product'; 
import { CategoryProvider } from '../../providers/category/category'; 
import { Category } from '../../models/category/category-model'; 
 
 
@Component({   
  selector: 'page-edit-product',   
  templateUrl: 'edit-product.html', 
}) 
  export class EditProductPage { 
 
  model: Product;   
  categories: Category[];   
  judul: string; 
 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, private toast: ToastController, 
    private productProvider: ProductProvider, private categoryProvider: CategoryProvider) {     
    this.model = new Product();     
    this.judul = "Add Product";     
    if(this.navParams.data.id){       
      this.judul = "Edit Product";       
      this.productProvider.get(this.navParams.data.id)       
      .then((result: any) => {         
        this.model = result;       
      });     
    }   
  } 
 
  ionViewDidLoad() {     
    console.log('ionViewDidLoad EditProductPage');     
    this.categoryProvider.getAll()     
    .then((result: Category[]) =>{      
      this.categories = result;       
      console.log(result);
      console.log('berhasil load kategori');     
    })     
    .catch(() => {       
      this.toast.create({         
        message: "error load kategori",         
        duration: 3000,         
        position: "bottom"       
      }).present();     
    });   
  } 
 
      save(){     
        this.saveProduct()     
        .then(() => {       
          this.toast.create({         
            message: "Product berhasil disimpan",         
            duration: 3000,         
            position: "bottom"       
          }).present();       
          this.viewCtrl.dismiss();     
        })     
        .catch(()=>{       
          this.toast.create({         
            message: "Product gagal disimpan",         
            duration: 3000,         
            position: "bottom"       
          }).present();     
        });   
      } 
     
      private saveProduct(){     
        if(this.model.id){       
          return this.productProvider.update(this.model);     
        }else{       
          return this.productProvider.insert(this.model);     
        }   
      } 
     
    }