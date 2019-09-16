import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountHistoryPage } from './account-history';


@NgModule({
  declarations: [
    AccountHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountHistoryPage),
  ],
  exports: [
    AccountHistoryPage
  ]
})
export class AccountHistoryPageModule {}
