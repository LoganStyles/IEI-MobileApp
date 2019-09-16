import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController,AlertController, LoadingController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-downloads',
  templateUrl: 'downloads.html',
})
export class DownloadsPage implements OnInit {

  items: Observable<any>;
  downloads: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private httpClient: HttpClient,
     private alertController: AlertController, 
     private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.loadDownloads();
  }

  backHome(): void {
    this.navCtrl.push(MainPage);
  }

  private loadDownloads(): void {
    try {
      this.presentLoading();

      var url = 'https://ieianchorpensions.com/api/api_downloads';
      this.items = this.httpClient.get(url);
      this.items
        .subscribe(downloadData => {
          this.downloads = downloadData;
        },err => {
          this.showError(err);
        })

    } catch (e) {
      this.showError('A server internal error occured. Please try again.');
    }

  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000,
      dismissOnPageChange: true
    });
    loader.present();
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

  filterDownloads(ev: any) {
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.downloads = this.downloads.filter((download) => {
        return (download.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.loadDownloads();
    }
  }

}
