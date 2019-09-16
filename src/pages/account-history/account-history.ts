import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-account-history',
  templateUrl: 'account-history.html',
})
export class AccountHistoryPage implements OnInit {
  selectedContribution: any;
  contributions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountHistoryPage');
  }

  ngOnInit() {
    this.contributions = this.navParams.get('contributions');
    console.clear();
    console.log(this.contributions);
  }

  showDetails(transactionID): void {
    this.selectedContribution = this.contributions.filter(c => c.TRANS_ID === transactionID)[0];
  }

  backHome(): void {
    this.navCtrl.push(MainPage);
  }

}
