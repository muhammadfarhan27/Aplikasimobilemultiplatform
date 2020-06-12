import { Injectable } from '@angular/core'; 
import { DatabaseProvider } from '../database/database'; 
import { SQLiteObject } from '@ionic-native/sqlite'; 
import { Product } from '../../models/product/product-model'; 
 
@Injectable() 
export class ProductProvider { 
 
  constructor(private databaseProvider: DatabaseProvider) {     
    console.log('Hello ProductProvider Provider');   
  } 
 
  public insert(product: Product){     
    return this.databaseProvider.getDB()
    .then((db: SQLiteObject) => {       
      let sql = 'INSERT INTO products(name, price, duedate, active, category_id) VALUES (?,?,?,?,?)';       
      let params = [product.name, product.price, product.duedate, product.active ? 1 : 0, product.category_id];       
      return db.executeSql(sql, params)       
      .then(() => console.log('Product berhasil ditambahkan!'))       
      .catch(e => console.error('Product gagal ditambahkan: ', e));     
    })     
    .catch((e) => console.error(e));   
  } 
 
  public update(product: Product){     
    return this.databaseProvider.getDB()     
    .then((db: SQLiteObject) => {       
      let sql = 'UPDATE products SET name=?, price=?, duedate=?, active=?, category_id=? WHERE id=?';       
      let params = [product.name, product.price, product.duedate, product.active ? 1 : 0, product.category_id, product.id];       
      return db.executeSql(sql, params)       
      .then(() => console.log('Product berhasil diubah!'))       
      .catch(e => console.error('Product gagal diubah: ', e));     
    })     
    .catch((e) => console.error(e));   
  } 
 
  public remove(id: number){     
    return this.databaseProvider.getDB()     
    .then((db: SQLiteObject) => {       
      let sql = 'DELETE FROM products WHERE id=?';       
      let params = [id];       
      return db.executeSql(sql, params)       
      .then(() => console.log('Product berhasil dihapus!'))       
      .catch(e => console.error('Product gagal dihapus: ', e));     
    })     
    .catch((e) => console.error(e));   
  } 
 
  public get(id: number){     
    return this.databaseProvider.getDB()     
    .then((db: SQLiteObject) => {       
      let sql = 'SELECT * FROM products WHERE id=?';       
      let params = [id];       
      return db.executeSql(sql, params)       
      .then((data: any) => {         
        if(data.rows.length > 0){           
          let item = data.rows.item(0);           
          let product = new Product();           
          product.id = item.id;           
          product.name = item.name;
          product.price = item.price;           
          product.duedate = item.duedate;           
          product.active = item.active;           
          product.category_id = item.category_id; 
 
          return product;         
        }         
        return null;       
      })       
      .catch(e => console.error('Product gagal diambil: ', e));     
    })     
    .catch((e) => console.error(e));   
  } 
 
  public getAll(active: boolean, name: string = null){     
    return this.databaseProvider.getDB()     
    .then((db: SQLiteObject) => {       
      let sql = 'SELECT p.*, c.name as category_name FROM products p inner join categories c on p.category_id = c.id WHERE p.active=?';       
      let params: any[] = [active ? 1 : 0];       
      if(name){         
        sql += ' and p.name like ?';         
        params.push('%' + name + '%');       
      }       
      return db.executeSql(sql, params)       
      .then((data: any) => {         
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
      })       
      .catch(e => console.error('Product gagal diload: ', e));     
    })     
    .catch((e) => console.error(e));   
  } 
 
}