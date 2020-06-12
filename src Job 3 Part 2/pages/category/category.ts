import { Component } from '@angular/core'; 
import { NavController, NavParams, ToastController } from 'ionic-angular'; 
import { Category } from '../../models/category/category-model'; 
import { CategoryProvider } from '../../providers/category/category'; 
import { EditCategoryPage } from '../edit-category/edit-category'; 
import { UserAccount } from '../../models/user/user-model'; 
 
@Component({   
  selector: 'page-category',   
  templateUrl: 'category.html', 
}) 
export class CategoryPage { 
 
  userAccount: UserAccount = <UserAccount>{};   
  categories: Category[]; 
 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private categoryProvider: CategoryProvider, private toast: ToastController) {     
      this.userAccount = this.navParams.get("menuAccount");     
      if(this.userAccount){       
        console.log("userAccount Params available in CategoryPage!");       
        console.log(this.userAccount);     
      }else{       
        console.log("userAccount Params not Available in CategoryPage!");     
      }   
    } 
 
  ionViewDidLoad() {     
    console.log('ionViewDidLoad CategoryPage');   
  } 
 
  ionViewDidEnter(){     
    console.log('ionViewDidEnter CategoryPage');
    this.getAllCategory();   
  } 
 
    getAllCategory(){     
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
   
    addCategory(){     
      this.navCtrl.push(EditCategoryPage);   
    } 
   
    editCategory(category_id: number){     
      this.navCtrl.push(EditCategoryPage, {id: category_id});   
    } 
   
    removeCategory(category: Category){     
      this.categoryProvider.remove(category.id).then(() => {       
        var index = this.categories.indexOf(category);       
        this.categories.splice(index, 1);       
        this.toast.create({         
          message: 'Category telah dihapus.',         
          duration: 3000,         
          position: 'bottom'       
        }).present();     
      });   
    } 
  }