
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,Loading,MenuController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MainPage } from '../';
import { NewsDetailPage } from './../news-detail/news-detail';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  selectedNews: any;
  news: any;
  items: Observable<any>;
  loading: Loading;
  //social sharing
  message:string = null;
  file:string = null;
  link:string = null;
  subject:string = null;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService,
    private httpClient: HttpClient,
    public menu: MenuController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private inAppBrowser: InAppBrowser,
    private socialSharing: SocialSharing) {
    // this.loadNews();
  }


  ionViewDidLoad() { }

  private loadNews(): void {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
      });
      this.loading.present();


      var url = 'https://ieianchorpensions.com/api/api_news';
      this.items = this.httpClient.get(url);
      this.items
        .subscribe(newsData => {
          this.news = newsData;
          window.localStorage.setItem('newsData', JSON.stringify(newsData));
          this.loading.dismissAll();
        }, err => {
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


  /**
     * Navigate to the detail page for this news item.
     */
  showDetails(news_item) {
    this.navCtrl.push(NewsDetailPage, { news_post: news_item });
  }

  backHome(): void {
    this.navCtrl.push(MainPage);
  }

  loadFacebook(){
    this.inAppBrowser.create("https://web.facebook.com/anchorpensions");
  }

  loadTwitter(){
    this.inAppBrowser.create("https://twitter.com/ieiapensionmgrs");
  }

  loadInstagram(){
    this.inAppBrowser.create("https://www.instagram.com/ieianchorpensions/");
  }

  loadLinkedin(){
    this.inAppBrowser.create("https://www.linkedin.com/company/iei-anchor-pension-managers-limited/");
  }

  share(message,subject,file,link){
    this.message=message;
    this.subject=subject;
    this.file=file;
    this.link=link;

    // Check if sharing via email is supported
this.socialSharing.canShareViaEmail().then(() => {
  console.log('sharing is possible')
  // Sharing via email is possible
}).catch(() => {
  // Sharing via email is not possible
  console.log('sharing is NOT possible')
});

// Share via email
this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
  // Success!
  console.log('sharing WILL BE is possible')
}).catch(() => {
  console.log('sharing WILL NOT BE is possible')
  // Error!
});
    // console.log(message);
    
    // this.socialSharing.
    // this.socialSharing.share(this.message,this.subject,this.file,this.link)
    // .then(()=>{

    // })
    // .catch(()=>{

    // })
  }

  ionViewDidEnter() {
    // the root left menu should be enabled on the news page
    this.menu.enable(true);
  }


}
