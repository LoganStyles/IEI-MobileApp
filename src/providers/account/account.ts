import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the AccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountProvider {


  constructor(public api: Api) { }

  /**
 * Send a GET request to our GetRSABalance endpoint 
 */
  getBalance(accountInfo: any) {
    let seq = this.api.get('GetRSABalance', accountInfo).share();
  

    seq.subscribe((res: any) => {
      
    }, err => {
    });

    return seq;
  }

}
