import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-calculator-output',
  templateUrl: 'calculator-output.html',
})
export class CalculatorOutputPage implements OnInit {
  totalPackage: number = 0;
  qualifyForLumpSum: string = 'No';
  lumpSum: number = 0;
  qualifyForProgrammedWithdrawal: string = 'No';
  monthlyPension: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    if (this.navParams !== null) {
      let output = this.navParams.get('output');
      if (output !== null) {
        this.totalPackage = output.totalPackage;
        this.qualifyForLumpSum = output.qualifyForLumpSum;
        this.lumpSum = output.lumpSum;
        this.qualifyForProgrammedWithdrawal = output.qualifyForProgrammedWithdrawal;
        this.monthlyPension = output.monthlyPension;
      } else {
        this.navCtrl.pop();
      }
    } else {
      this.navCtrl.pop();
    }
  }

}
