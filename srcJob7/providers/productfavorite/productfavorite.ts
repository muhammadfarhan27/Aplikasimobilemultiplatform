import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class ProductfavoriteProvider {

  constructor(private databaseProvider: DatabaseProvider) {
    console.log('Hello ProductfavoriteProvider Provider');
  }

  public insert(product){
    return this.databaseProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'INSERT INTO myfavorite(id_product, name, price, category, image) VALUES (?,?,?,?,?)';
        let params = [product.id, product.name, product.price, product.category, product.image];
        return db.executeSql(sql, params)
          .then((s) => console.log(s+'Product berhasil di tambahkan!'))
          .catch(e => console.error('Product gagal ditambahkan:',e));
    })
    .catch((e) => console.error(e));
  }

  public remove(id: number){
    return this.databaseProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'DELETE FROM myfavorite WHERE id=?';
      let params = [id];
      return db.executeSql(sql, params)
        .then(() => {
          console.log('Product berhasil dihapus!');
          return "Favorite product berhasil dihapus";
        })
        .catch(e => {
          console.error('Product gagal dihapus: ', e);
          return e;
        });
    })
    .catch((e) => console.error(e));
  }

  public getById(id: number){
    return this.databaseProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'SELECT * FROM myfavorite WHERE id_product=?';
      let params =[id];
      return db.executeSql(sql, params)
      .then(data => {
        console.log("datanya" + data.rows.length)
        return data.rows.length;
      })
      .catch(e => {
        console.error(e);
        return e;
      });
    })
  }

  public getAll(){
    return this.databaseProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM myfavorite';
        let param = [];
        return db.executeSql(sql, param)
          .then((data: any) => {
            if (data.rows.length > 0){
              let products: any[] = [];
              for (var i = 0; i < data.rows.length; i++){
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
