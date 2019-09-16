import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { MainPage } from '../';


@IonicPage()
@Component({
  selector: 'page-branches',
  templateUrl: 'branches.html',
})
export class BranchesPage implements OnInit {

  selectedBranch: any;
  branches: any;
  items: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpClient: HttpClient,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.loadBranches();
  }

  backHome(): void {
    this.navCtrl.push(MainPage);
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000,
      dismissOnPageChange: true
    });
    loader.present();
  }

  private loadBranches(): void {
    try {
      this.presentLoading();
      var url = 'https://ieianchorpensions.com/api/api_branches';
      this.items = this.httpClient.get(url);
      this.items
        .subscribe(branchesData => {
          this.branches = branchesData;
        },err => {
          this.showError(err);
        })

    } catch (e) {
      this.showError('A server internal error occured. Please try again.');
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

  filterBranches(ev: any) {
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.branches = this.branches.filter((branch) => {
        return (branch.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.loadBranches();
    }
  }

  showDetails(branch) {
    this.selectedBranch = branch;
  }

}
