import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, MenuController, AlertController, ToastController, LoadingController,Loading,Events } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

import { User } from '../../providers';
import { MainPage } from '../';
// import { map } from 'rxjs/operator/map';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  profile: any;

  account: { username: string, password: string } = {
    username: '',
    password: ''
  };
  credentialsForm: FormGroup;
  pleaseWait: boolean = false;
  // Our translated text strings
  private loginErrorString: string;

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public user: User,
    public menu: MenuController,
    public toastCtrl: ToastController,
    private alertController: AlertController,
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    public events:Events) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

    this.credentialsForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });

    
  }

  ionViewDidLoad() {
  }


  // Attempt to login in through our User service
  doLogin() {
    this.account.username = this.credentialsForm.value.username;
    this.account.password = this.credentialsForm.value.password;

    if ((this.account.username === undefined || this.account.username === 'undefined' || this.account.username === '') || (this.account.password === undefined || this.account.password === 'undefined' || this.account.password === '')) {
      this.showError('Username or password is required');
    } else {

      try {
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...',
          duration: 40000,
          dismissOnPageChange: true
        });
        this.loading.present();

        this.user.login(this.account).subscribe((resp) => {
        this.navCtrl.setRoot(MainPage);

        }, (err) => {
          // Unable to log in
          let toast = this.toastCtrl.create({
            message: this.loginErrorString,
            duration: 30000,
            position: 'top'
          });
          toast.present();
        });

      } catch (e) {
        this.showError('A server internal error occured. Please try again.');
      } finally {
        this.pleaseWait = false;
        //publish user_type event
        this.events.publish('user_type','registered_client');
      }


    }


  }



  ionViewDidEnter() {
    // the root left menu should be disabled on the login page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  showError(err: any) {
    if (err) {
      let alert = this.alertController.create({
        title: 'Login Failed!',
        subTitle: err,
        buttons: ['OK']
      });

      alert.present();
    }
  }

}
