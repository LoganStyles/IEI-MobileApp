import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera,} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer,FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Network } from '@ionic-native/network';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Items } from '../mocks/providers/items';
import { Settings, User, Api } from '../providers';
import { MyApp } from './app.component';
import { AccountProvider } from '../providers/account/account';
import { SocialSharing } from '@ionic-native/social-sharing';

import { AccountHistoryPageModule } from '../pages/account-history/account-history.module';
import { CalculatorOutputPageModule } from '../pages/calculator-output/calculator-output.module';
import { WelcomePageModule } from '../pages/welcome/welcome.module';
import { RegistrationPageModule } from '../pages/registration/registration.module';
import { NewsDetailPageModule } from '../pages/news-detail/news-detail.module';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AccountHistoryPageModule,
    CalculatorOutputPageModule,
    WelcomePageModule,RegistrationPageModule,NewsDetailPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    User,AccountProvider,InAppBrowser,
    Camera,
    SplashScreen,
    StatusBar,
    Network,
    FileTransfer,FileTransferObject,FilePath,
    File,Camera,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AccountProvider,
    SocialSharing
  ]
})
export class AppModule { }
