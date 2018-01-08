import { Component } from '@angular/core';
import { Platform, AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { FCM } from '@ionic-native/fcm';
import { Push, PushObject, PushOptions} from '@ionic-native/push';
import { ServiceProvider } from '../providers/service-provider';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, public serviceprovider: ServiceProvider, statusBar: StatusBar, splashScreen: SplashScreen, public alertCtrl: AlertController, private fcm: FCM, public push: Push) {
    platform.ready().then(() => {
         // Okay, so the platform is ready and our plugins are available.
         // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();

        fcm.getToken().then(token => {
            alert(token);
            //this.getDeviceToken(20, token,'Y');
           //this.serviceprovider.deviceTokenSave("0B9275138EE7ECA1202E2AB24384F854",token,'','Y')
        })

       // this.pushsetup();
       

        fcm.onNotification().subscribe(data => {
            alert('notifications');
            if (data.wasTapped) {
                //Notification was received on device tray and tapped by the user.
                alert(JSON.stringify(data));
            } else {
                //Notification was received in foreground. Maybe the user needs to be notified.
                alert(JSON.stringify(data));
            };
        })

        fcm.onTokenRefresh().subscribe(token => {
            alert(token);
        })
    });
  }

  getDeviceToken(uid, tokenid, status) {
      alert('d');
      let deviceTokenData = JSON.stringify({
          "UserID": uid, "Token": tokenid, "Status": status
      });

      var result = this.serviceprovider.KDSaveMethod(deviceTokenData, 'DiviceToken');
      result.subscribe(data => {
          if (data == "Success") {
              alert(data);
          }

          else if (data == "Token already exist.") {
              alert(data);
          }
          
          
      },
          err => {
              // this.globlevariables.presentToast("Couldn't process your request. Please try agian!");
          }
      )
  }

  pushsetup() {
      alert('called');
      const options: PushOptions = {
          android: {
              senderID: '714965728593', forceShow: "false", topics: ["appAndroid"],
              clearNotifications: "true"
          },
          ios: {
              alert: 'true',
              badge: true,
              sound: 'false',
              topics: ["appIos"]
          },
          windows: {}
      };

      const pushObject: PushObject = this.push.init(options);

      pushObject.on('registration').subscribe((registration: any) => {
          //do whatever you want with the registration ID
          alert(JSON.stringify(registration));
      });

      pushObject.on('notification').subscribe((data: any) => {
          alert('message -> ' + data.message);
          //if user using app and push notification comes
          if (data.additionalData.foreground) {
              //If the app is running when the push received  
              alert('1');
          } else if (data.additionalData.coldstart) {
              //If the app is closed and started by clicking on the push notification  
              alert('2');
              //TODO: Your stuff  
          } else {
              //If the app is open but not active. i.e. running in background 
              alert('3');
              
          }
      });

      pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }
  
}
