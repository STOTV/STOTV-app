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
    // console.log(document.getElementsByTagName("ion-content")[0]); //Force Ionic to remove the padding around the map
    this.loadMap();
  }

  loadMap(){
    let latLng = new google.maps.LatLng(38.2137257,-45.099381);

    let mapOptions = {
      center: latLng,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_TOP
      }
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

}
