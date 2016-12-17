import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';
declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter(){
    this.loadMap();
  }

  loadMap(){

    let latLng = new google.maps.LatLng(38.2137257,-45.099381);

    let mapOptions = {
      center: latLng,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

}
