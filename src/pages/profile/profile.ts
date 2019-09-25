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
  dateOfBirth: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) { }
  

  ngOnInit() {
    this.profile = JSON.parse(window.localStorage.getItem('profile'));
    var dob = this.profile.employees.dateOfBirth;

    //format date
    this.dateOfBirth=this.formatAPIDates(dob);
  }

  formatAPIDates(receivedDate){
    var strippedDob=receivedDate.replace("[UTC]","");

    var parsedDate = new Date(Date.parse(strippedDob));
    // console.log('parsedDate '+parsedDate);

    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = parsedDate.getFullYear();
    var month = months[parsedDate.getMonth()];
    var date = parsedDate.getDate();

    return date + ' ' + month + ' ' + year ;
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
