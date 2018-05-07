import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDuQb5TMo5TXM4Zd5Y4XbZnvHbQuW6Pyvk",
  authDomain: "assistantapp-b0165.firebaseapp.com",
  databaseURL: "https://assistantapp-b0165.firebaseio.com",
  projectId: "assistantapp-b0165",
  storageBucket: "assistantapp-b0165.appspot.com",
  messagingSenderId: "163202004626"
};
firebase.initializeApp(config);





  }




}
