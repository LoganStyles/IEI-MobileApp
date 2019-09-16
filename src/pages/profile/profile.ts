import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MainPage } from '../';
import { ProfileUpdatePage } from '../profile-update/profile-update';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage implements OnInit {
  profile: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ngOnInit() {
    this.profile = JSON.parse(window.localStorage.getItem('profile'));
  }

  ionViewDidEnter() {
  }

  backHome(): void {
    this.navCtrl.push(MainPage);
  }

  profileUpdatePage() {
    this.navCtrl.push(ProfileUpdatePage);
  }

  getAccountStatusColor() {
    if (this.profile.AccountStatus === 'Funded') {
      return "green";
    } else {
      return "red";
    }
  }

}
