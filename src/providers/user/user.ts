import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class User {
  _user: any;
  isLoggedIn: boolean = false;
  authenticated = false;
 
  private userPin:string;
  private cookieString: string;
  
  constructor(public api: Api,private storage:Storage) { 
    this.setAuthState(false);//do this for users who did not logout previously
    this.isLoggedIn=false;
    window.localStorage.clear();
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    
    this.userPin=accountInfo.username;

    let seq = this.api.post('userlogin', accountInfo).share();
    seq.subscribe((res: any) => {

      if(res.status=="success"){
        this.isLoggedIn=true;
        this.cookieString=res.userid;//get the userid to b used as cookie
        this.setAuthState(true);//store cookie

      }else{
        this.setAuthState(false);
      }
    }, err => {
      console.error('ERROR OCCURRED IN LOGIN', err);
    });

    return seq;
  }

  getBioData(){
      let seqBiodata=this.api.post('view-biodata', {'pin':this.userPin}).share();
      seqBiodata.subscribe((res: any) => {        
        this._loggedIn(res);
      }, err => {
        console.error('ERROR', err);
      });
  }

  getSummary(){
      return this.api.post('getsummary', {'pin':this.userPin}).map((res:any) =>{
        return res;
      });
  }

  getContributionsByDateRange(contributionReq:any){
    return this.api.post('get-contribution-details-by-date-range', {'pin':this.userPin}).map((res:any) =>{
      return res;
    });
}

  setAuthState(authenticated){
    if(authenticated){
      this.storage.set('userCookie',this.cookieString).then(()=>{
      this.authenticated=true;
      this.getBioData();
      });
    }else{
      this.storage.remove('userCookie').then(() => {
        this.authenticated = false;
      });
    }
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      
      if (res.status == 'success') {
        // console.log('STATUS succ')
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    this.isLoggedIn=false;
    this.setAuthState(false);
    window.localStorage.clear();
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp;
    window.localStorage.setItem('profile', JSON.stringify(resp));
  }
}
