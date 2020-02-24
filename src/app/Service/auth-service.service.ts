import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {AngularFirestore} from '@angular/fire/firestore';
import { Router, RoutesRecognized } from '@angular/router';
import { map, filter, pairwise } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { error } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  array;
  writePost;
  writePost1;
  Services = [];
  Results:Boolean;
  UserName;
  UserID;
  UserArray = [];
  erroMessage;

  USerIDArray = [];
  Person = [];

  firtName;
  lastName;
  
  URL;
  Ref = [];
  HistoryArray = [];
  constructor(private router: Router,
    private afs : AngularFirestore,
    public afAuth: AngularFireAuth) {
  }

  set setURL(url_address) {
    this.URL = url_address;
  }

  get getURL() {
    return this.URL;
  }

  logIn(email,password) {

    return firebase.auth().signInWithEmailAndPassword(email, password).then((results) => {
      if (results) {
        // this.UserID = results['user'].uid;
        // this.userDocumentNo = results['user'].uid;
      }
      return results;
    }).catch((error) => {
      var errorCode = error.code;
      var errorCode = error.message;
      return errorCode;
    });
  }
  
  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigateByUrl('/tabs/services');
    // this.router.navigate(['/']);
  }

  getUserProfile() {
    // this.UserID = firebase.auth().currentUser.uid;
    return this.afs.collection("user").doc(this.afAuth.auth.currentUser.uid).valueChanges();
    // var docRef = firebase.firestore().collection("user").doc("iJBFolJoORSamW141RcN26MlaKs2");
    // return docRef.get().then((doc) => {
    //   if(doc.exists){
    //     this.UserArray.push(doc.data());
    //   }else{}

    //   return this.UserArray;
    // }).catch((error) => {
    //   console.log("Error getting document:", error);
    // });

    // return new Observable((observer) => {
    //   docRef.get().then((doc) => {
    //     if(doc.exists){
    //       this.UserArray.push(doc.data());
    //     }else{}

    //     return this.UserArray;
    //   }).catch((error) => {
    //     console.log("Error getting document:", error);
    //   })
    // })
   
  }

  resetPassword(mail){
    this.afAuth.auth.sendPasswordResetEmail(mail).then((success) => {
      console.log(success);
      alert(success);
      this.router.navigateByUrl('sign-in');
    }).catch((err) => {
      console.log(err);
      alert(err);
    });
  
    }

  getUserName(email) {
    this.UserName = email;
  }

  addRequest(item : any){
    item.uid = this.afAuth.auth.currentUser.uid;
    this.writePost1 = this.afs.collection('request/').add(item);
    // this.writePost1.add(item);
    console.log(item)
    
    this.writePost = this.afs.collection('user/').doc(this.afAuth.auth.currentUser.uid).collection('request');
    this.writePost.add(item).then(() =>{
            console.log(item);
            console.log("request added successful ..");
            console.log(item.stamp);
            alert("Transaction "+ item.refNo +" is currently being processed and Request was recieved succesfully ..");
            // console.log(item.description);
            this.router.navigateByUrl('tabs/notifications');
            // this.router.navigate("tabs/notifications",{params : {}})
        });


    // this.afs.collection("newHistory").doc(this.afAuth.auth.currentUser.uid).set({
    //   item
    // })
    // .then(() => {
    //   console.log("Document successfully written!");
    // })
    // .catch((error) => {
    //   console.error("Error writing document: ", error);
    // });

    // this.router.navigateByUrl('/tabs/notifications');
       
}

ViewHistory() {
  return this.afs.collection('user').doc(this.afAuth.auth.currentUser.uid).collection('request').valueChanges();
}

viewRequest(){
      
  return  this.afs.collection('user').doc(this.afAuth.auth.currentUser.uid).collection('request',ref => ref.where('uid', '==' ,this.afAuth.auth.currentUser.uid) && ref.orderBy('stamp',"desc")).valueChanges();

}

set setRef(ref) {
  this.Ref = ref;
}

get getRef() {
  return this.Ref;
}

ViewAllRequests() {
  return this.afs.collection("request").valueChanges();
}

ViewHistoryDetails() {
  return this.afs.collection("user").doc(this.afAuth.auth.currentUser.uid).collection("request").valueChanges();

  // var db = firebase.firestore();
  //   return db.collection("user").doc(this.afAuth.auth.currentUser.uid).collection("request").get().then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       if(this.Ref == doc.data().refNo){
  //         // this.HistoryArray.push(doc.data());
  //         console.log(doc.data().refNo);
  //       }else{
  //         console.log("false");
  //       }
  //     });

  //     return this.HistoryArray;
  // });
}

//  gotUser(){
//   return  this.afs.collection('user').doc(this.afAuth.auth.currentUser.uid).valueChanges();
//  }

  addUser(user,url){
    // console.log(user);

    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.pass).then((results )=> {
      // Handle Errors here.
      console.log(results)
      // console.log(error.user.uid)
      user.uid = results.user.uid;
      user.pass = "";
    this.writePost = this.afs.collection<any>('user').doc(results.user.uid);
    this.writePost.set(user);
    
        alert(user.email + " succesful registered" );
        this.router.navigateByUrl(url);
    });

  }

  getDoc(key: string){
    return this.afs.doc("services/"+key).valueChanges();
  }
  getICTDoc(key: string){
    return this.afs.doc("serviceICT/"+key).valueChanges();
  }

  getServiceICT(){

    return this.afs.collection('serviceICT/').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }

  getService(){

    return this.afs.collection('services/').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }

  // The getServices method is for retrieving data from database
  getServices() {
    var db = firebase.firestore();
    return db.collection("services").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // console.log(doc.data())
          this.Services.push(doc.data())
      });

      return this.Services;
  });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  UpdateNames(Name,Surname) {
    // this.UserID = firebase.auth().currentUser.uid;
    return firebase.firestore().collection("user").doc(this.afAuth.auth.currentUser.uid).update({
      name: Name,
      surname: Surname
    })
  }

  UpdateEmail(Email) {
    firebase.firestore().collection("user/").doc(this.afAuth.auth.currentUser.uid).update({
      email: Email,
    })

    // return new Observable((observer) => {
    //   firebase.firestore().collection("user/").doc("iJBFolJoORSamW141RcN26MlaKs2").update({
    //     email: Email,
    //   })
    // })
  }

  UpdateNumber(Contacts) {
    return firebase.firestore().collection("user/").doc(this.afAuth.auth.currentUser.uid).update({
      email: Contacts,
    })
  }


  Clear() {
    this.UserArray.splice(0,1);
  }

  ////////////////////////////////////////////////////////////////////////
  getInfo(name, surname) {
    this.Person.push({
      Name: name,
      Surname: surname
    })
  }

  returnArray() {
    return this.Person;
  }
}
