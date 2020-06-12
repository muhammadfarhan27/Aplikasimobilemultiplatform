import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Product } from '../../models/product/product-model';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  constructor(private databaseProvider: DatabaseProvider) {
    console.log('Hello FavoriteProvider Provider');
  }

  public get(id: number){
    return this.databaseProvider.getDB().then((db:
   SQLiteObject) => {
    let sql = 'SELECT * FROM favorite WHERE product_id=?';
    let params = [id];
    return db.executeSql(sql, params).then((data: any) =>
   {
    if(data.rows.length > 0){
    return true;
    }
    return false;
    })
    .catch(e => console.error('Product favorite gagal
   diambil: ', e));
    })
    .catch((e) => console.error(e));
    }
    public getAllFavorite(name: string){
    return this.databaseProvider.getDB().then((db:
   SQLiteObject) => {
    let sql = 'SELECT p.*, c.name as category_name FROM products p INNER JOIN favorite f on p.id = f.product_id INNER JOIN categories c on p.category_id = c.id';
    let params: any[] = [];
    if(name){
    sql += ' WHERE p.name like ?';
    params.push('%' + name + '%');
    }
    return db.executeSql(sql, params).then((data: any) =>
   {
    if(data.rows.length > 0){
    let products: any[] = [];
    for (var i = 0; i < data.rows.length; i++) {
    var product = data.rows.item(i);
    products.push(product);
    }
    return products;
    }else{
    return [];
    }
    }).catch(e => console.error('Product favorite gagaldiload: ', e));
    }).catch((e) => console.error(e));
    }
    public addFavorite(product: Product){
    return this.databaseProvider.getDB().then((db:
   SQLiteObject) => {
    let sql = 'INSERT INTO favorite(product_id) VALUES(?)';
    let params = [product.id];
    return db.executeSql(sql, params)
    .then(() => console.log('Product berhasil ditambahkan ke favorite!'))
    .catch(e => console.error('Product gagal ditambahkan ke favorite: ', e));
 })
 .catch((e) => console.error(e));
 }

 public removeFavorite(id: number){
 return this.databaseProvider.getDB().then((db:
SQLiteObject) => {
 let sql = 'DELETE FROM favorite WHERE product_id=?';
 let params = [id];
 return db.executeSql(sql, params)
 .then(() => console.log('Product favorite berhasil dihapus!'))
 .catch(e => console.error('Product favorite gagal dihapus: ', e));
 })
 .catch((e) => console.error(e));
 }
}
