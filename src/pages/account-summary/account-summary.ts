import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { User } from '../../providers';
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
  fundID:number;
  fundType:string;
  schemeName:string;
  totalContribution:string;
  netContribution:string;
  growth:string;
  totalUnits:string;
  unitPrice:string;

  vRSABalance: string = '0.00';
  vfundType:string;
  vschemeName:string;
  vtotalContribution:string;
  vnetContribution:string;
  vGrowth:string;
  vTotalUnits:string;
  vUnitPrice:string;

  toDay:string;

  startDate: Date;
  endDate: Date;
  loading: any;
  pleaseWait: boolean = false;
  userPIN: any;
  accountBalances:any;

  balances: Observable<any>;
  contributions: Observable<any>;

  contributionReq: { fundId: number, pin: string,type :string,startDate:string,endDate:string } ;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public user: User,
    private alertController: AlertController,
    private httpClient: HttpClient,
    private loadingCtrl: LoadingController,
    public account: AccountProvider, ) {
      
     }

  ionViewDidLoad() {
  }
  

  ngOnInit() {
    this.profile = JSON.parse(window.localStorage.getItem('profile'));
    this.userPIN=this.profile.pin;

      try {
        this.presentLoading();

        this.user.getSummary().subscribe((resp) => {
          
          this.accountBalances = resp;
          if(this.accountBalances !=null){

            this.RSABalance = parseFloat(this.accountBalances.balanceMandatory).toFixed(2).toLocaleString();
            this.fundID=this.accountBalances.fundId;
            this.fundType=this.getFundType(this.fundID);
            this.schemeName=this.accountBalances.schemeName;
            this.totalContribution=parseFloat(this.accountBalances.totalContributionMandatory).toFixed(2).toLocaleString();
            this.netContribution=parseFloat(this.accountBalances.netContributionMandatory).toFixed(2).toLocaleString();
            this.growth=parseFloat(this.accountBalances.growthMandatory).toFixed(2).toLocaleString();
            this.totalUnits=parseFloat(this.accountBalances.totalUnitMandatory).toFixed(2).toLocaleString();
            this.unitPrice=this.accountBalances.unitPrice;

            //voluntary
            this.vRSABalance = parseFloat(this.accountBalances.balanceVoluntary).toFixed(2).toLocaleString();
            this.vschemeName=this.accountBalances.schemeName;
            this.vtotalContribution=parseFloat(this.accountBalances.totalContributionVoluntary).toFixed(2).toLocaleString();
            this.vnetContribution=parseFloat(this.accountBalances.netContributionVoluntary).toFixed(2).toLocaleString();
            this.vGrowth=parseFloat(this.accountBalances.growthVoluntary).toFixed(2).toLocaleString();
            this.vTotalUnits=parseFloat(this.accountBalances.totalUnitVoluntary).toFixed(2).toLocaleString();
            this.vUnitPrice=this.accountBalances.price;

            //get today's date
            var today = new Date();
            this.toDay = today.toDateString();
          }

        }, (err) => {
          this.RSABalance = '0.00';
          this.showError('Error fetching RSA Balance.');
        });

      } catch (e) {
        this.showError('A server internal error occured. Please try again.');
      } finally {
        this.pleaseWait = false;
      }
  }

  getFundType(fundID){

    var selectedFundID="RSA FUND ";

    switch(fundID){
      case '1':
          selectedFundID+="II";
          break;
      case '73':
      selectedFundID+="I";
      break;
      case '74':
      selectedFundID+="III";
      break;
      case '12':
      selectedFundID+="IV";
      break;
    }

    return selectedFundID;
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


  // getAccountStatusColor() {
  //   if (this.profile.AccountStatus === 'Funded') {
  //     return "green";
  //   } else {
  //     return "red";
  //   }
  // }

  searchTransactions() {
    if (this.startDate === null || this.startDate === undefined || this.endDate === null || this.endDate === undefined) {
      this.showError('Both start date and end date are required');
    } else {
      if (this.startDate > this.endDate) {
        this.showError('End date cannot be earlier than start date');
      } else {


  try {
  this.presentLoading();

  this.contributionReq.startDate=this.startDate.toString();
  this.contributionReq.endDate=this.endDate.toString();
  this.contributionReq.fundId=this.fundID;
  this.contributionReq.pin=this.userPIN;
  this.contributionReq.type=this.profile.gender;

        this.user.getContributionsByDateRange(this.contributionReq).subscribe((resp) => {
          this.accountBalances = resp;
          if(this.accountBalances !=null){

            this.RSABalance = parseFloat(this.accountBalances.balanceMandatory).toFixed(2).toLocaleString();
            this.fundType=this.getFundType(this.accountBalances.fundId);
            this.schemeName=this.accountBalances.schemeName;
            this.totalContribution=parseFloat(this.accountBalances.totalContributionMandatory).toFixed(2).toLocaleString();
            this.netContribution=parseFloat(this.accountBalances.netContributionMandatory).toFixed(2).toLocaleString();
            this.growth=parseFloat(this.accountBalances.growthMandatory).toFixed(2).toLocaleString();
            this.totalUnits=parseFloat(this.accountBalances.totalUnitMandatory).toFixed(2).toLocaleString();
            this.unitPrice=this.accountBalances.unitPrice;
          }

        }, (err) => {
          this.RSABalance = '0.00';
          this.showError('Error fetching RSA Balance.');
        });

      } catch (e) {
        this.showError('A server internal error occured. Please try again.');
      } finally {
        this.pleaseWait = false;
      }

        // this.pleaseWait = true;
        // try {

        //   var loginUrl = 'http://41.223.131.235/ieia_api/api/RSA/GetContributionHistory?PIN=' + encodeURI(this.profile.PIN) + '&startDate=' + encodeURI(this.startDate.toString()) + '&endDate=' + encodeURI(this.endDate.toString());
        //   this.contributions = this.httpClient.get(loginUrl);
        //   this.contributions
        //     .subscribe(contributionData => {
        //       this.navCtrl.push(AccountHistoryPage, { contributions: JSON.parse(contributionData) });

        //     },
        //       err => {
        //         this.showError(err);
        //       });

        // } catch (e) {
        //   this.showError('A server internal error occured. Please try again.');
        // } finally {
        //   this.pleaseWait = false;
        // }
      }
    }

  }

}
