import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';
import { StotvService } from '../../providers/stotv-service';
declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [StotvService]
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  stotvService : StotvService;

  constructor(public navCtrl: NavController, stotvService: StotvService) {
      this.stotvService = stotvService;
  }

  ionViewDidEnter(){
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

    this.loadMarkers(this.map);
  }

  loadMarkers(mapInstance: any){
    this.stotvService.load()
    .then(data => {
      var json = data;
      var bounds = new google.maps.LatLngBounds();
      var infowindow = new google.maps.InfoWindow();
      var pathCoords = [];
      for (var i = 0; i < json.length; i++) {
          var marker = new google.maps.Marker({
              position: new google.maps.LatLng(json[i]['latitude'], json[i]['longitude']),
              map: mapInstance
          });
          bounds.extend(marker.position);
          google.maps.event.addListener(marker, 'click', (function (marker, i) {
              return function () {
                  infowindow.setContent("Name: <a href='?id=" + json[i]['deviceId'] + "'>" + json[i]['name'] + "</a><br>" + "Time: " + json[i]['time'] + "<br>" + "CEP: " + json[i]['cep']);
                  infowindow.open(mapInstance, marker);
              }
          })(marker, i));
          pathCoords.push({lat: Number(json[i]['latitude']), lng: Number(json[i]['longitude'])});
      }

      mapInstance.fitBounds(bounds);
      var listener = google.maps.event.addListener(mapInstance, "idle", function() {
          if (mapInstance.getZoom() > 6) mapInstance.setZoom(6);

          var path = new google.maps.Polyline({
              path: pathCoords,
              geodesic: true,
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2
          });
          path.setMap(mapInstance);

          google.maps.event.removeListener(listener);
      });
    });
  }

}
