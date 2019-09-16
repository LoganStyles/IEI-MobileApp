import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import { MainPage } from '../';
import { CalculatorOutputPage } from '../calculator-output/calculator-output';

@IonicPage()
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {

  rsaBalance: number;
  monthlyContribution: number;
  yearsToRetire: number;
  returnRate: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertController: AlertController) {
  }

  ionViewDidLoad() {
  }

  backHome(): void {
    this.navCtrl.push(MainPage);
  }

  calculatePension(): void {
    try {
      let qualifyForLumpSum = 'No';
      let qualifyForProgrammedWithdrawal = 'No';
      let lumpSum = 0;
      let monthlyPension = 0;

      let percentageReturn = this.returnRate / 100;
      let totalPackage = (this.monthlyContribution * this.yearsToRetire * 12) + (this.rsaBalance * Math.pow((1 + percentageReturn), this.yearsToRetire));

      if (totalPackage > 550000) {
        qualifyForLumpSum = 'Yes';
        qualifyForProgrammedWithdrawal = 'Yes';
        lumpSum = totalPackage * .25;
        monthlyPension = ((.75 * totalPackage) / 120);
      } else {
        lumpSum = totalPackage;
      }

      this.navCtrl.push(CalculatorOutputPage, {
        output: {
          totalPackage: totalPackage,
          qualifyForLumpSum: qualifyForLumpSum,
          lumpSum: lumpSum,
          qualifyForProgrammedWithdrawal: qualifyForProgrammedWithdrawal,
          monthlyPension: monthlyPension
        }
      });
    } catch (e) {
      let alert = this.alertController.create({
        title: 'Error!',
        subTitle: e,
        buttons: ['OK']
      });

      alert.present();
    }
  }

}
