import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {_throw } from 'rxjs/observable/throw';
import {catchError,mergeMap} from 'rxjs/operators';

/*
  Generated class for the InterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InterceptorProvider implements HttpInterceptor {

    constructor(private storage: Storage, private alertCtrl:AlertController) {
  }

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>{
    let promise = this.storage.get('userCookie');

    return Observable.fromPromise(promise)
    .mergeMap(token => {
      let cloneReq =this.addToken(request, token);

      return next.handle(cloneReq).pipe(
        catchError(error => {
          //perhaps display an error for specific status codes here 
          let msg = "An Error Ocurred with this request";
          // let msg = error.message;
          let alert = this.alertCtrl.create({
            title: error.name,
            message:msg,
            buttons:['OK']
          });
          alert.present();

          //pass the error to the caller of the function
          return _throw(error);
        })
      );

    });
  }

  //adds the token to tyour headers ifit exists
  private addToken(request: HttpRequest <any>,token:any){

    if(token){
      let clone: HttpRequest <any>;
      let cookieString:string;
      cookieString='loggedUser='+token;

      clone = request.clone({
        withCredentials : true, 
        setHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cookie:cookieString
          // Authorization: 'Bearer ${cookieString}',
          
        }
      });
      return clone;
    }

    return request;
  }

}
