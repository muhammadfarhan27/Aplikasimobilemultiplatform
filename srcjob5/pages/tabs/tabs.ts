import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { MyproductPage } from '../myproduct/myproduct';
import { CovidinfoPage } from '../covidinfo/covidinfo';
import { MyprofilePage } from '../myprofile/myprofile';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MyproductPage;
  tab3Root = CovidinfoPage;
  tab4Root = MyprofilePage;

  constructor() {
  }

}
