import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountSummaryPage } from './account-summary';
// import { Api } from '../providers';

@NgModule({
  declarations: [
    AccountSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountSummaryPage),
  ],
})
export class AccountSummaryPageModule {}
