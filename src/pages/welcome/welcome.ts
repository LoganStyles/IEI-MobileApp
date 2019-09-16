import { Component } from '@angular/core';
import { IonicPage, NavController,Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController,
  public events:Events) { }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  loginASGuest(){
    this.events.publish('user_type','guest');
    this.navCtrl.setRoot('NewsPage');
  }
}
