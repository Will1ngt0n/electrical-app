// import { TabsPage } from './page/tabs/tabs.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from "firebase";
import * as moment from 'moment';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StarRatingModule} from 'ionic4-star-rating';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Downloader } from '@ionic-native/downloader/ngx';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';

var firebaseConfig = {
  apiKey: "AIzaSyB83CuKn-QSuzzxN6X8l2L5UKqfeb2NjvA",
  authDomain: "eletrical-engineer-cms.firebaseapp.com",
  databaseURL: "https://eletrical-engineer-cms.firebaseio.com",
  projectId: "eletrical-engineer-cms",
  storageBucket: "eletrical-engineer-cms.appspot.com",
  messagingSenderId: "931661674739",
  appId: "1:931661674739:web:65e43541f406b1822c1f86",
  measurementId: "G-99GQV7XQHK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

@NgModule({
  // declarations: [AppComponent, TabsPage,],
  declarations: [AppComponent,],
  entryComponents: [],
  imports: [BrowserModule,IonicModule.forRoot(),HttpClientModule, AppRoutingModule, BrowserAnimationsModule, MatExpansionModule,
    BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule,
     BrowserAnimationsModule,
     MatExpansionModule,
     ReactiveFormsModule,
     FormsModule,
     StarRatingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Downloader,
    // PreviewAnyFile
    // DocumentViewer,
    // PreviewAnyFile
    DocumentViewer,
    PreviewAnyFile,
    File
  ],
  bootstrap: [AppComponent,]
})
export class AppModule {}
