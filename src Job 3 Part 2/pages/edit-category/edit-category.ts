import { Component } from '@angular/core'; 
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular'; 
import { Category } from '../../models/category/category-model'; 
import { CategoryProvider } from '../../providers/category/category'; 
 
@Component({   
  selector: 'page-edit-category',   
  templateUrl: 'edit-category.html', }) export class EditCategoryPage { 
 
  category: Category;   
  judul: string; 
 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private viewCtrl: ViewController, private toast: ToastController, 
    private categoryProvider: CategoryProvider) {     
      this.category = new Category();     
      this.judul = "Add Category";     
      if(this.navParams.data.id){       
        this.judul = "Edit Category"; 
              
        this.categoryProvider.get(this.navParams.data.id).then((result: Category) => {         
          this.category = result;       
        });     
      }   
    } 
 
  ionViewDidLoad() {     
    console.log('ionViewDidLoad EditCategoryPage');   
  } 
 
  save(){     
    this.saveCategory().then(() => {       
      this.toast.create({         
        message: "Category berhasil disimpan",         
        duration: 3000,         
        position: "bottom"       
      }).present();       
      this.viewCtrl.dismiss();     
    }).catch(()=>{       
      this.toast.create({         
        message: "Category gagal disimpan",         
        duration: 3000,         
        position: "bottom"       
      }).present();     
    });   
  }
  private saveCategory(){     
    if(this.category.id){       
      return this.categoryProvider.update(this.category);     
    }else{       
      return this.categoryProvider.insert(this.category);     
    }   
  } 
 
}