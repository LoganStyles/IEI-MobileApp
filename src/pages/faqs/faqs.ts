import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController,Loading } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { MainPage } from '../';


@IonicPage()
@Component({
  selector: 'page-faqs',
  templateUrl: 'faqs.html',
})
export class FaqsPage implements OnInit {

  items: Observable<any>;
  faqs: any;
  selectedFAQ: any;
  loading: Loading;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private httpClient: HttpClient,
     private alertController: AlertController,
     private loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.loadFaqs();
  }

  backHome(): void {
    this.navCtrl.push(MainPage);
  }

  private loadFaqs(): void {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
      });
      this.loading.present();

      var url = 'https://ieianchorpensions.com/api/api_faqs';
      this.items = this.httpClient.get(url);
      this.items
        .subscribe(faqData => {
          this.faqs = faqData;
          this.loading.dismissAll();
        },err => {
          this.showError(err);
        })

    } catch (e) {
      this.showError('A server internal error occured. Please try again.');
    }

  }

  showDetails(faq: any): void {
    this.selectedFAQ = faq;
  }


  filterFaqs(ev: any) {
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.faqs = this.faqs.filter((faq) => {
        return (faq.question.toLowerCase().indexOf(val.toLowerCase()) > -1 || faq.answer.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.loadFaqs();
    }
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

}
