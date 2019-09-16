import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { AccountProvider } from '../../providers';
import { MainPage } from '../';
import { AccountHistoryPage } from '../account-history/account-history';

@IonicPage()
@Component({
  selector: 'page-account-summary',
  templateUrl: 'account-summary.html',
})
export class AccountSummaryPage implements OnInit {

  profile: any;
  RSABalance: string = '0.00';
  startDate: Date;
  endDate: Date;
  loading: any;
  pleaseWait: boolean = false;
  userPIN: any;

  balances: Observable<any>;
  contributions: Observable<any>;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertController: AlertController,
    private httpClient: HttpClient,
    private loadingCtrl: LoadingController,
    public account: AccountProvider, ) { }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.profile = JSON.parse(window.localStorage.getItem('profile'));

    if (window.localStorage.getItem('RSABalance') === null || window.localStorage.getItem('RSABalance') === 'undefined') {

      try {
        this.presentLoading();
        var loginUrl = 'http://41.223.131.235/ieia_api/api/RSA/GetRSABalance?PIN=' + encodeURI(this.profile.PIN);
        this.balances = this.httpClient.get(loginUrl);
        this.balances
          .subscribe(balanceData => {
            var result = JSON.parse(balanceData);
            this.RSABalance = result.Balance;

          },
            err => {
              this.RSABalance = '0.00';
              this.showError('Error fetching RSA Balance.');
            },
            () => {
              window.localStorage.setItem('RSABalance', this.RSABalance);
            });

      } catch (e) {
        this.showError('A server internal error occured. Please try again.');
      } finally {
        this.pleaseWait = false;
      }
    } else {

      this.RSABalance = window.localStorage.getItem('RSABalance');

    }
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000,
      dismissOnPageChange: true
    });
    loader.present();
  }

  backHome(): void {
    this.navCtrl.push(MainPage);
  }

  showError(err: any) {
    if (err) {
      let alert = this.alertController.create({
        title: 'Error!',
        subTitle: err,
        buttons: ['OK']
      });

      alert.present();
    }
  }


  getAccountStatusColor() {
    if (this.profile.AccountStatus === 'Funded') {
      return "green";
    } else {
      return "red";
    }
  }

  searchTransactions() {
    if (this.startDate === null || this.startDate === undefined || this.endDate === null || this.endDate === undefined) {
      this.showError('Both start date and end date are required');
    } else {
      if (this.startDate > this.endDate) {
        this.showError('End date cannot be earlier than start date');
      } else {
        this.pleaseWait = true;
        try {

          var loginUrl = 'http://41.223.131.235/ieia_api/api/RSA/GetContributionHistory?PIN=' + encodeURI(this.profile.PIN) + '&startDate=' + encodeURI(this.startDate.toString()) + '&endDate=' + encodeURI(this.endDate.toString());
          this.contributions = this.httpClient.get(loginUrl);
          this.contributions
            .subscribe(contributionData => {
              this.navCtrl.push(AccountHistoryPage, { contributions: JSON.parse(contributionData) });

            },
              err => {
                this.showError(err);
              });

        } catch (e) {
          this.showError('A server internal error occured. Please try again.');
        } finally {
          this.pleaseWait = false;
        }
      }
    }

  }

}
