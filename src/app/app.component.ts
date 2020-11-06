import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  onesignal : string = "e124b894-1cc7-4512-8c8f-456815b4f816"
  firebase: string = "931661674739"
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private localNotifications: LocalNotifications
  ) {
    this.initializeApp();
    this.oneSignal.startInit(this.onesignal, this.firebase);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe((res) => {
    // do something when notification is received
    this.localNotifications.schedule({
      id: 1,
      text: 'Single Local Notification',
      data: { secret: 'secret' }
    });
    alert(JSON.stringify(res))
    });
    this.oneSignal.handleNotificationOpened().subscribe((res) => {
      // do something when a notification is opened
      alert(JSON.stringify(res))
    });
    this.oneSignal.endInit();
    // alert('startinh onesignal')
    this.sendNoti()
  }
  sendNoti() {
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      title:'First alert! ',
      text: 'Invoice has been created and will be completed in a few minutes',
      data:{ message: 'Invoice is getting ready' },
      sound: this.setSound(),
    trigger: {in: 2, unit: ELocalNotificationTriggerUnit.SECOND},
    foreground: true
    });
    console.log("hh")
  }
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/shame.mp3';
    } else {
      return 'file://assets/sounds/bell.mp3';
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // if(this.platform.is('cordova') || this.platform.is('capacitor')) {
        // if(this.platform.is("android")) {
          // this.oneSignal.startInit(this.onesignal, this.firebase);
          // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
          // this.oneSignal.handleNotificationReceived().subscribe((res) => {
          // // do something when notification is received
          // this.localNotifications.schedule({
          //   id: 1,
          //   text: 'Single Local Notification',
          //   data: { secret: 'secret' }
          // });
          // alert(JSON.stringify(res))
          // });
          // this.oneSignal.handleNotificationOpened().subscribe((res) => {
          //   // do something when a notification is opened
          //   alert(JSON.stringify(res))
          // });
          // this.oneSignal.endInit();
          // alert('startinh onesignal')
          // this.oneSignal.getIds().then(identity => {
          //   alert(identity.pushToken + " It's Push Token")
          //   alert(identity.userId + " It's Devices ID");
          // });
        // }
      // }
    });
  }
}
