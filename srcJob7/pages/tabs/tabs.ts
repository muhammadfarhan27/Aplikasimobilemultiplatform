import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { MyproductPage } from '../myproduct/myproduct';
import { CovidinfoPage } from '../covidinfo/covidinfo';
import { MyprofilePage } from '../myprofile/myprofile';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MyproductPage;
  tab3Root = CovidinfoPage;
  tab4Root = MyprofilePage;


  constructor() {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad TabsPage');
  // }

}
