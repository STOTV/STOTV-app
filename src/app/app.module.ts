import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StotvApp } from './app.component';
import { MapPage } from '../pages/map/map';

@NgModule({
  declarations: [
    StotvApp,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(StotvApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    StotvApp,
    MapPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
