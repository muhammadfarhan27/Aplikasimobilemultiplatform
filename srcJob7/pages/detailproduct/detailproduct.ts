import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { Product } from '../../models/product/product-model';

@Component({
  selector: 'page-detailproduct',
  templateUrl: 'detailproduct.html',
})
export class DetailproductPage {

  //variable bertipe any untuk menampung
  //hasil dari end point
  response:any;
  //membuat object dari model product
  product = new Product();
  //deklarasi variabel array untuk menampung hasil category
  //dari end point
  category=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private productProvider: ProductProvider) {
    this.showCategory();
  }

  ionViewDidLoad() {
    this.category=[];
    this.showCategory();
 
    //mengecek apakah ada data yang dikirm
    //dari MyproductPage, jika ada maka
    //akan menampilkan form update beserta datanya
    if(this.navParams.data.id){
      this.showSelectedProduct(this.navParams.data.id)
    }
  }

  //fungsi untuk mengambil category dari end point
  showCategory(){
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

  //fungsi untuk mengambil 1 data yang dipilih
  //berdasarkan id yang dilewatkan
  showSelectedProduct(id:number){
    this.productProvider.getSelectedProdcut(id).subscribe(
      result => {
        this.response = result;
        let data = this.response.data;
        this.product.name = data.name;
        this.product.price = data.price;
        this.product.categori_id = data.kategori.nama;
        this.product.id = data.id;
        if(data.active==2)
          this.product.active = true;
        this.product.image = data.image;
      }
    );
  }

}
