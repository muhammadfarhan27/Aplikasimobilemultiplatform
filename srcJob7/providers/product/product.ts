import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EnvProvider } from '../env/env';
import { Product } from '../../models/product/product-model';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable()
export class ProductProvider {

  constructor(public http: HttpClient, 
    private env: EnvProvider,
    private fileTransfer: FileTransfer) {
    console.log('Hello ProductProvider Provider');
  }

  //untuk melakukkan request semua product
  //yang diinput oleh semua user
  getAllPublicProduct(page:number){
    return this.http.get(this.env.API_URL + 'public/product?page='+page).pipe(
      tap(message => {
        return message;
      }),
    );
  }

  //untuk melakukan request semua product
  //khusus yang diinput oleh user login saat ini 
  getAllUserProduct(){
    const headers = new HttpHeaders({
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
      'Accept': 'application/json'
    });

    return this.http.get(this.env.API_URL + 'product', {headers:headers}).pipe(
      tap(response => {
        return response;
      }),
    );
  }

  getCategoryProduct(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
      'Accept': 'application/json' 
    });

    return this.http.get(this.env.API_URL+'category',{headers:headers}).pipe(
      tap(response => {
        return response;
      }),
    );
  }

  //untuk melakukkan request hapus product
  deleteProduct(id:number){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +JSON.parse(localStorage.getItem('user')).token,
      'Accept': 'application/json'
    });
    return this.http.delete(this.env.API_URL + 'product/' + id, {headers:headers}).pipe(
      tap(response => {
        return response;
      }),
    );
  }

  //untuk melakukan request ambil 1 product
  //berdasarkan id tertentu
  getSelectedProdcut(id:number){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +JSON.parse(localStorage.getItem('user')).token,
      'Accept': 'application/json'
    });
    return this.http.get(this.env.API_URL + 'product/' + id, {headers:headers}).pipe(
      tap(response => {
        return response;
      })
    )
  }

  //fungsi untuk melakukan request penyimpanan data
  saveProduct(product: Product){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +JSON.parse(localStorage.getItem('user')).token,
      'Accept': 'application/json'
    });
    
    return this.http.post(this.env.API_URL + 'product', product,{headers:headers}).pipe(
      tap(response => {
        return response;
      })
    );
  }

  //fungsi untuk melakukan request update data
  updateProduct(product: Product){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' +JSON.parse(localStorage.getItem('user')).token,
      'Accept': 'application/json'
    });

    return this.http.post(this.env.API_URL + 'product/' + product.id, product,{headers:headers}).pipe(
      tap(response => {
        return response;
      })
    );
  }

  //fungsi untuk melakukan pencarian
  searchProduct(key:string){
    return this.http.get(this.env.API_URL + 'public/product/search?name=' + key).pipe(
      tap(response => {
        return response;
      })
    )
  }

  uploadImage(fileName, fileUri,id) {   
    const fileTransfer: FileTransferObject = this.fileTransfer.create(); 
    //file options   
    let options: FileUploadOptions = {     
      //menentukan nama filed dg nama image     
      fileKey: 'image',     
      //nama file yang dikirim dari formproduct.ts     
      fileName: fileName,     
      chunkedMode: false,     
      mimeType: "image/jpeg",
       //token OAuth2     
       headers: {       
         'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,       
         'Accept': 'application/json'     
        }     
      }        
      //perintah untuk request upload file ke end point API   
      return fileTransfer.upload(fileUri, this.env.API_URL+'product/upload/'+id, options)     
      .then((data) => {       
        console.log(data + " Uploaded Successfully");     
      }, (err) => {       
        console.log(err);     
      }); 
    }

}
