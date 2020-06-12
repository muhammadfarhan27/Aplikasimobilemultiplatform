import { Injectable } from '@angular/core'; 
import { DatabaseProvider } from '../database/database'; 
import { SQLiteObject } from '@ionic-native/sqlite'; 
import { Category } from '../../models/category/category-model'; 
 
@Injectable() 
export class CategoryProvider { 
 
  constructor(private databaseProvider: DatabaseProvider) {     
    console.log('Hello CategoryProvider Provider');   
  } 
 
  public get(id: number){     
    return this.databaseProvider.getDB().then((db: SQLiteObject) => {       
      let sql = 'SELECT * FROM categories WHERE id=?';       
      let params = [id];       
      return db.executeSql(sql, params).then((data: any) => {         
        if(data.rows.length > 0){           
          let item = data.rows.item(0);           
          let category = new Category();           
          category.id = item.id;           
          category.name = item.name;           
          return category;         
        }         
        return null;       
      })       
      .catch(e => console.error('Category gagal diambil: ', e));     
    })     
    .catch((e) => console.error(e));   
  } 
 
  public getAll(){     
    return this.databaseProvider.getDB().then((db: SQLiteObject) => {       
      let sql = "SELECT * FROM categories";
      return db.executeSql(sql, []).then((data: any) => {         
        //console.log("Jumlah kategori = ", data.rows.length);         
        if(data.rows.length > 0){           
          let categories: Category[] = [];           
          for (var i = 0; i < data.rows.length; i++) {             
            let category = new Category();             
            category.id = data.rows.item(i).id;             
            category.name = data.rows.item(i).name;             
            //var category = data.rows.item(i);             
            categories.push(category);             
            //console.log(category);           
          }           
          return categories;         
        }else{           
          return [];         
        }       
      }).catch(e => console.error('Kategori gagal diload: ', e));     
    }).catch((e) => console.error(e));   
  } 
 
      public insert(category: Category){     
        return this.databaseProvider.getDB().then((db: SQLiteObject) => {       
          let sql = 'INSERT INTO categories(name) VALUES (?)';       
          let params = [category.name];       
          return db.executeSql(sql, params)       
          .then(() => console.log('Category berhasil ditambahkan!'))       
          .catch(e => console.error('Category gagal ditambahkan: ', e));     
        })     .catch((e) => console.error(e));   
      } 
     
      public update(category: Category){     
        return this.databaseProvider.getDB().then((db: SQLiteObject) => {       
          let sql = 'UPDATE categories SET name=? WHERE id=?';       
          let params = [category.name, category.id];       
          return db.executeSql(sql, params)       
          .then(() => console.log('Category berhasil diubah!'))       
          .catch(e => console.error('Category gagal diubah: ', e));     
        })     
        .catch((e) => console.error(e));   
      } 
     
      public remove(id: number){     
        return this.databaseProvider.getDB().then((db: SQLiteObject) => {       
          let sql = 'DELETE FROM categories WHERE id=?';       
          let params = [id];       
          return db.executeSql(sql, params)       
          .then(() => console.log('Category berhasil dihapus!'))
          .catch(e => console.error('Category gagal dihapus: ', e));     
        })     
        .catch((e) => console.error(e));   
      } 
    }