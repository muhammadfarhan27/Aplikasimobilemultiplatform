import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CovidinfoProvider } from '../../providers/covidinfo/covidinfo';

@Component({
  selector: 'page-covidinfo',
  templateUrl: 'covidinfo.html',
})
export class CovidinfoPage {

  //deklrasi object untuk covidId
  //tidak dibuat model karena pemakaian hanya sekali
  covidId={
    'confirmed':0,
    'activeCare':0,
    'deaths':0,
    'recovered':0,
    'metadata':''
  };

  //deklarasi object utuk covidWorld
  //tidak dibuat model karena pemakaian hanya sekali
  covidWorld={
    'confirmed':0,
    'recovered':0,
    'deaths':0,
    'activeCare':0
  };
  
  //variabel bertipe any untuk menampung hasil
  //dari end point
  result:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private covidInfo: CovidinfoProvider) {
    //memanggil fungsi getKasusDunia()
    this.getKasusDunia();
    //memanggil fungsi getKasusIndonesia()
    this.getKasusIndonesia();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CovidinfoPage');
  }

  //fungsi untuk mengambil data info covid indonesia
  //dari end point API
  getKasusIndonesia(){
    this.covidInfo.getIdCovid().subscribe(
      result => {
        this.result = result;
        //memasukan data dari end point ke object covidId
        this.covidId.confirmed = parseInt(this.result.confirmed.value);
        this.covidId.activeCare = parseInt(this.result.activeCare.value);
        this.covidId.deaths = parseInt(this.result.deaths.value);
        this.covidId.recovered = parseInt(this.result.recovered.value);
        this.covidId.metadata = this.result.metadata.lastUpdatedAt;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  //fungsi untuk mengambil data info covid Dunia
  //dari end point API
  getKasusDunia(){
    this.covidInfo.getWorldCovid().subscribe(
      result => {
        this.result = result;
        //memasukan data dari end point ke object covidWorld
        this.covidWorld.confirmed = parseInt(this.result.TotalConfirmed);
        this.covidWorld.recovered = parseInt(this.result.TotalRecovered);
        this.covidWorld.deaths = parseInt(this.result.TotalDeaths);
        //rumus untuk mendapatkan activeCare = confirmed - recovered - deaths
        this.covidWorld.activeCare = parseInt(this.result.TotalConfirmed)-parseInt(this.result.TotalRecovered)-parseInt(this.result.TotalDeaths);
      },
      error => {
        console.log(error);
      }
    );
  }

}
