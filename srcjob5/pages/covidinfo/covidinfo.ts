import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CovidinfoProvider } from 
'../../providers/covidinfo/covidinfo';

/**
 * Generated class for the CovidinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-covidinfo',
  templateUrl: 'covidinfo.html',
})
export class CovidinfoPage {

  covidId={
    'confirmed':0,
    'activeCare':0,
    'deaths':0,
    'recovered':0,
    'metadata':''
  };

  covidWorld={
    'confirmed':0,
    'recovered':0,
    'deaths':0,
    'activeCare':0
  };

  result: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private covidInfo: CovidinfoProvider) {
      this.getKasusDunia();
      this.getKasusIndonesia();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CovidinfoPage');
  }

  getKasusIndonesia(){
    this.covidInfo.getIdCovid().subscribe(
    result => {
    this.result = result;
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

 getKasusDunia(){
  this.covidInfo.getWorldCovid().subscribe(
  result => {
  this.result = result;
  this.covidWorld.confirmed = parseInt(this.result.TotalConfirmed);
  this.covidWorld.recovered = parseInt(this.result.TotalRecovered);
  this.covidWorld.deaths = parseInt(this.result.TotalDeaths);

  this.covidWorld.activeCare = parseInt(this.result.TotalConfirmed)
  -parseInt(this.result.TotalRecovered)-parseInt(this.result.TotalDeaths);
  },
  error => {
    console.log(error);
  }
  );
 }

}
