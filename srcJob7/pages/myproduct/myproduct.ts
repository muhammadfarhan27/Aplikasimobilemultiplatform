import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { AlertProvider } from '../../providers/alert/alert';
import { FormproductPage } from '../formproduct/formproduct';

@Component({
  selector: 'page-myproduct',
  templateUrl: 'myproduct.html',
})
export class MyproductPage {

  response: any;
  products = [];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productProvider: ProductProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private alertProvider: AlertProvider, private event: Events) {

    //memunculkan efek loading
    this.presentLoading();
    //memanggil fungsi showUserProduct untuk menampilkan data product
    this.showUserProduct();
    //untuk mendeteksi event bahwa penyimpanan/update sukses
    //jika sukses dipanggil fungsi showUserProduct agar
    //data pada halaman ini direfresh
    this.event.subscribe('save:success',() => {
      this.showUserProduct();
    });
  }

  //fungsi untuk menampilkan product yang diinput
  //oleh user yang sedang login
  public showUserProduct(){
    this.productProvider.getAllUserProduct().subscribe(
      response => {
        this.response = response;
        this.products = [];
        this.response.data.forEach(element => {
          this.products.push(element);
        });
        //loader dihilangkan ketika data berhasil diupload
        this.loader.dismiss();
      }
    );
  }

  //fungsi untuk menghapus data
  deleteUserProduct(id:number,name:string){
    this.productProvider.deleteProduct(id).subscribe(
      response => {
        this.alertProvider.showToast("Data masakan "+name+" berhasil dihapus");
        this.showUserProduct();
      },
      error => {
        this.alertProvider.showToast("Data masakan "+name+" gagal dihapus")
      }
    );
  }

  //fungsi untuk menampilkan loading
  //pada saat data dimuat
  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  //fungsi untutk mmemunculkan konfirasi
  //apakah data akan didelete
  showConfirm(id,nama){
    const confirm = this.alertCtrl.create({
      title: 'My Product',
      message: 'Yakin ingin menghapus '+nama+'?',
      buttons: [
        {
          text: 'tidak',
          handler: ()=>{
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ya',
          handler: ()=>{
            console.log('Agree clicked');
            //memanggil fungsi hapus data product
            this.deleteUserProduct(id,nama);
          }
        }
      ]
    });
    confirm.present();
  }

  //fungsi untuk menampilkan form input product
  showInputForm(){
    this.navCtrl.push(FormproductPage);
  }

  //fungsi untuk menampilkan form update product
  //beserta data product yang dipilih
  showUpdateForm(id:number){
    this.navCtrl.push(FormproductPage, {id:id})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyproductPage');
  }

}
