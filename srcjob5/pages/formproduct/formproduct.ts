import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 
'ionic-angular';
import { Product } from '../../models/product/product-model';
import { ProductProvider } from '../../providers/product/product';
import { AlertProvider } from '../../providers/alert/alert';


/**
 * Generated class for the FormproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-formproduct',
  templateUrl: 'formproduct.html',
})
export class FormproductPage {

  judul='';

  btnLabel='';

  response: any;
  product = new Product();

  category=[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl : ViewController,
    private productProvider: ProductProvider,
    private alertProvider: AlertProvider,
    private event: Events) {
  }

  ionViewDidLoad() {
    this.category=[];
    this.showCategory();
    this.judul  = "Add Product";
    this.btnLabel = "Save";
    if(this.navParams.data.id){
      this.judul = "Update Product";
      this.btnLabel = "Update";
      this.showSelectedProduct(this.navParams.data.id)
    }
  }

  showCategory() {
    this.productProvider.getCategoryProduct().subscribe(
    result => {
    this.response = result;
    var data = this.response.data;
    data.forEach(element => {
    this.category.push(element);
    });
    }
    )
  }

  showSelectedProduct(id:number){
    this.productProvider.getSelectedProduct(id).subscribe(
    result => {
    this.response = result;
    let data = this.response.data;
    this.product.name = data.name;
    this.product.price = data.price;
    this.product.categori_id = data.kategori.id;
    this.product.id = data.id;
    if(data.active==2)
    this.product.active = true;
    this.product.image = data.image;
    }
    );
  }

  save(aksi:any){
    if(aksi=="Save"){
      this.productProvider.saveProduct(this.product).subscribe(
        result => {
          this.alertProvider.showToast("simpan data berhasil");
          this.event.publish('save:success');
          this.viewCtrl.dismiss();
        },
        error => {
          this.alertProvider.showToast("Simpan data gagal");
        }
      );
    } else if (aksi=="Update"){
      this.productProvider.updateProduct(this.product).subscribe(
        result => {
          this.alertProvider.showToast("Update data berhasil");
          this.event.publish('save: success');
          this.viewCtrl.dismiss();
        },
        error => {
          this.alertProvider.showToast("Update data gagal");
        }
      );
    }
  }
}
