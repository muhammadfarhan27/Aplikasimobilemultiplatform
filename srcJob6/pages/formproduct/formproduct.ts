import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events,
ActionSheetController, LoadingController } from 
'ionic-angular';
import { Product } from '../../models/product/product-model';
import { ProductProvider } from '../../providers/product/product';
import { AlertProvider } from '../../providers/alert/alert';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { File, FileEntry } from '@ionic-native/file';

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

  imageUri:any;
  imageFileName:any;

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
    private event: Events,
    private camera: Camera,
    private filePath: FilePath,
    private file : File,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController) {
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

   //fungsi untuk menangani aksi simpan dan update
   save(aksi: any) {
     this.product.image = null;
  //jika nilai aksi='Save' maka aksi simpan yang dijalankan
  if (aksi == "Save") {
    this.productProvider.saveProduct(this.product).subscribe(
      result => {
        this.response = result;
  //jika tidak ada gambar yang dipilih
  if (this.imageUri == null) {
  //untuk mengirim/publish event bahwa simpan berhasil
  this.event.publish('save:success');
} else {
  //jika ada gambar yang dipilih
  //upload image
  this.productProvider.uploadImage(this.imageFileName,
    this.imageUri, this.response.data.id).then(
      res => {
        console.log('upload result' + res);
  //untuk mengirim/publish event bahwa simpan berhasil
  this.event.publish('save:success');
  },
  error => {
    console.log('upload error :' + error);
  //untuk mengirim/publish event bahwa simpan berhasil
  this.event.publish('save:success');
}
);
}
  this.alertProvider.showToast("Simpan data berhasil");
  //untuk menutup form product
  this.viewCtrl.dismiss();
  },
  error => {
  this.alertProvider.showToast("Simpan data gagal");
  }
  );
 
  //jika nilai aksi='Update' maka aksi update data yang dijalankan
  } else if (aksi == "Update") {
    this.productProvider.updateProduct(this.product).subscribe(
      result => {
        this.response = result;
  //jika tidak ada image yang dipilih
  if (this.imageUri == null) {
    //untuk mengirim/publish event bahwa update berhasil
    this.event.publish('save:success');
    } else {
    //jika ada image yang dipilih
    //upload image
    this.productProvider.uploadImage(this.imageFileName,
      this.imageUri, this.response.data.id).then(
        res => {
          console.log('upload result ' + res);
    //untuk mengirim/publish event bahwa update berhasil
    this.event.publish('save:success');
    },
    error => {
      console.log('upload error: ' + error);
    //untuk mengirim/publish event bahwa update berhasil
    this.event.publish('save:success');
    }
    );
    }
    //tampilkan toast update product berhasil
    this.alertProvider.showToast("Update data berhasil");
    //untuk menutup form product
    this.viewCtrl.dismiss();
    },
    error => {
    this.alertProvider.showToast("Update data gagal");
    }
    );
    }
    }

  getImage(sourceType) {
    let loader = this.loadingCtrl.create({
    content: "Please wait..."
    });
    loader.present();
    const options: CameraOptions = {
    quality: 80,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    //type sumber apakah camera atau galery foto
    sourceType: sourceType
    }

    //perintah untuk mendapatkan image
 this.camera.getPicture(options).then((imagePath) => {
  //hasil image yang diminta dalam bentuk path
  this.imageUri = imagePath;
  //perintah untuk mendapatkan name file
  this.filePath.resolveNativePath(imagePath)
  .then(filePath => {
  this.file.resolveLocalFilesystemUrl(filePath).then(fileInfo=>{
  let files = fileInfo as FileEntry;
  files.file(success => {
  //disini nama filenya didapatkan
  this.imageFileName = success.name;
  });
  }, err => {
  console.log(err);
  throw err;
  });
  });
  loader.dismiss();
  }, (err) => {
  console.log(err);
  this.alertProvider.showToast(err);
  loader.dismiss();
  });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
    title: 'Pilih sumber gambar',
    buttons: [
    {
    text: 'Ambil foto',
    handler: () => {
    this.getImage(this.camera.PictureSourceType.CAMERA);
    }
    },
    {
    text: 'Ambil dari galeri',
    handler: () => {
    this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
    }
    },
    {
    text: 'Batal',
    role: 'cancel'
    }
    ]
    });
    actionSheet.present();
    }

  
}
