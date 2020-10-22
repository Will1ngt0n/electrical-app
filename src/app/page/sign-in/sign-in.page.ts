import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingController,AlertController, Events } from '@ionic/angular';
import { filter, pairwise } from 'rxjs/operators';
import { PathService } from 'src/app/Service/path.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  email;
  password;

  url;
  public loginForm: FormGroup;
  public forgotpasswordForm: FormGroup;
  isForgotPassword: boolean = true;
  
  constructor(private fb: FormBuilder,  
    private router: Router,
    public Alert: AlertController,
    public SignInService:AuthServiceService,
    public loadingController: LoadingController,
    public pathService: PathService

   ) {

    this.loginForm = fb.group({
      email:  ['', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9-.]+$')]],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
    });

 }

  ngOnInit() {
  }

  home() {
    this.router.navigateByUrl('/tabs/services');
  }

  setUserName(email) {
    this.SignInService.getUserName(email);
  }

  signIn(){
    // this.url = this.SignInService.URL;
    this.url = this.pathService.returnURL();
    console.log(this.url);

    this.SignInService.logIn(this.email, this.password).then(data => {
      if (data.operationType === "signIn") {
        this.router.navigateByUrl(this.url);
        // this.presentToast();
      } else {
        this.presentAlert(data);
      }
    });
    this.LoadingRequest();

  }

  async LoadingRequest() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      // duration: 2000
    });
    await loading.present();
    loading.dismiss();
  }

  async presentAlert(data) {
    const alert = await this.Alert.create({
      header: 'Alert',
      message: data,
      buttons: ['OK'],
    });
  
    await alert.present();
  }
  reset() {
    
  }
  

}
