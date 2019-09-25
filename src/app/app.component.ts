import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform,Events } from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { Settings } from '../providers';
import { User } from '../providers';

import { WelcomePage } from '../pages/welcome/welcome';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
        <ion-icon name="{{p.icon}}"></ion-icon>&nbsp; {{p.title}}
        </button>
      <div *ngIf="userType=='registered_client'">
      <button menuClose ion-item (click)="doLogout()"><ion-icon name="power"></ion-icon>&nbsp;Logout</button>
      </div>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav id="nav" #content [root]="rootPage"></ion-nav>`
})

export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[];
  clientName: string = '';
  userType:string='';

  constructor(private translate: TranslateService, 
    platform: Platform,
    settings: Settings,
    private config: Config, private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public user: User,
    public events:Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    events.subscribe('user_type',(usertype,username)=>{
      
      this.clientName =username;
      this.setSideBarMenus(usertype);

    });

    this.initTranslate();
  }

  setSideBarMenus(usertype) {
    this.userType=usertype;
    switch (usertype) {
      case 'registered_client':
        this.pages = [
          { title: 'News', component: 'NewsPage',icon:'book' },
          { title: 'Profile', component: 'ProfilePage',icon:'man' },
          { title: 'My Account', component: 'AccountSummaryPage',icon:'man' },
          { title: 'Branches', component: 'BranchesPage',icon:'pin' },
          { title: 'Downloads', component: 'DownloadsPage',icon:'cloud-download' },
          { title: 'FAQs', component: 'FaqsPage',icon:'paper' },
          { title: 'Feedback', component: 'FeedbackPage',icon:'text' }
        ];
        break;
      case 'guest':
        this.pages = [  
          { title: 'News', component: 'NewsPage',icon:'book'  },        
          { title: 'Branches', component: 'BranchesPage',icon:'pin' },
          { title: 'Downloads', component: 'DownloadsPage',icon:'cloud-download' },
          { title: 'FAQs', component: 'FaqsPage',icon:'paper' },
          //{ title: 'Feedback', component: 'FeedbackPage',icon:'text' },          
          { title: 'Register With Us', component: 'RegistrationPage',icon:'list-box' }          
        ];
        break;
    }

  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    this.nav.push(page.component);
  }

  // openRegistrationPage() {
  //   // open registration page
  //   this.nav.push(RegistrationPage);
  // }

  doLogout() {
    this.user.logout();
    this.nav.setRoot(WelcomePage);
  }
}
