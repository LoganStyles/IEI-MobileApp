import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalculatorOutputPage } from './calculator-output';

@NgModule({
  declarations: [
    CalculatorOutputPage,
  ],
  imports: [
    IonicPageModule.forChild(CalculatorOutputPage),
  ],
})
export class CalculatorOutputPageModule {}
