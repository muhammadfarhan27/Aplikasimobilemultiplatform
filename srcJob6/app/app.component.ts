import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  initialieApp(){
    this.statusBar.overlayseWebView(true);
    if(this.platform.is('android')) {
      this.statusBar.backgroundColorByHexString("#33000000");
    }
  }

  rootPage:any = LoginPage;

  constructor(private platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen) {
      this.initialieApp();
    }
    
}
