import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  profile: any;
  comment: string;
  pleaseWait = false;
  items: Observable<any>;
  feedbackForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertController: AlertController,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder) {
      this.feedbackForm = this.formBuilder.group({
        comment: ['']
      });
      this.profile = JSON.parse(window.localStorage.getItem('profile'));
  }

  ionViewDidLoad() {
  }

  backHome(): void {
    this.navCtrl.push(MainPage);
  }

  sendComment() {
    try {
      if (!this.comment) {
        this.showMessage('Your comment is required.');
      } else {
        var url = 'https://ieianchorpensions.com?api_send_comment&PIN=' + this.profile.PIN + '&email=' + this.profile.Email + '&name=' + this.profile.FirstName + ' ' + this.profile.Surname + '&comment=' + this.comment;

        this.pleaseWait = true;

        this.items = this.httpClient.get(url);
        this.items
          .subscribe(feedbackData => {
            var result = feedbackData;
            this.showMessage(result.message, result.title);
            this.comment = '';
            this.pleaseWait = false;
          },
            err => {
              this.showMessage('An internal server error occured!');
            });
      }
    } catch (e) {
      this.showMessage('An internal server error occured!');
    }
    finally {
      this.pleaseWait = false;
    }
  }

  showMessage(msg: any, title: string = 'Error!') {
    if (msg) {
      let alert = this.alertController.create({
        title: title,
        subTitle: msg,
        buttons: ['OK']
      });

      alert.present();
    }
  }

}
