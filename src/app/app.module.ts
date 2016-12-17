import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StotvApp } from './app.component';
import { MapPage } from '../pages/map/map';
import { AboutPage } from '../pages/about/about';

@NgModule({
  declarations: [
    StotvApp,
    MapPage,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(StotvApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    StotvApp,
    MapPage,
    AboutPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
