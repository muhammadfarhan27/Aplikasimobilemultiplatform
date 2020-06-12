import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
@Injectable()
export class DatabaseProvider {
 constructor(private sqlite: SQLite) {
 console.log('Hello DatabaseProvider Provider');
 }
 public getDB(){
 return this.sqlite.create({
 name: 'product.db',
 location: 'default'
 });
 }
 public createDatabase(){
 return this.getDB().then((db: SQLiteObject) => {
 this.createTables(db);
 this.insertDefaultItems(db);
 }).catch(e => console.error(e));
 }
 private createTables(db: SQLiteObject){
 db.sqlBatch([
 ['CREATE TABLE IF NOT EXISTS categories (id INTEGER 
  PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT)'],
 ['CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY
KEY AUTOINCREMENT NOT NULL, name TEXT, price REAL, duedate
DATE, active INTEGER, category_id INTEGER, FOREIGN KEY
(category_id) REFERENCES categories(id))'],
 ['CREATE TABLE IF NOT EXISTS favorite (id INTEGER PRIMARY
KEY AUTOINCREMENT NOT NULL, product_id INTEGER, FOREIGN KEY
(product_id) REFERENCES products(id))']
 ])
 .then(() => console.log("Table created!"))
 .catch(e => console.error('Error create table', e));
 }
 private insertDefaultItems(db: SQLiteObject){
 db.executeSql('SELECT COUNT(id) as qtd FROM categories',
[])
.then((data: any) => {
  if(data.rows.item(0).qtd == 0){
  db.sqlBatch([
  ["INSERT INTO categories (name) VALUES (?)",
 ['Rendang']],
  ['INSERT INTO categories (name) VALUES (?)', ['Kari
 Kambing']],
  ['INSERT INTO categories (name) VALUES (?)', ['Asam
 Pedas']]
  ])
  .then(()=> console.log('Data default berhasil
 ditambahkan'))
  .catch(e => console.error('Data gagal ditambahkan : ',
 e));
  }
  }).catch(e => console.error('Gagal membaca data!', e));
  }
 }