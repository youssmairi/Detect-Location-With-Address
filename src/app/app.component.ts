import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import  { DataAdresseService } from './data-adresse.service';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'detectGeoLocation';
  adresseData : any;
  adresse : string;
  isclicked: boolean;
  myIcon;
  map;
  constructor( private dataAdresse : DataAdresseService ){}

  ngOnInit() {
    this.isclicked = false;
    this.adresse = "tunis";
    // Déclaration de la carte avec les coordonnées du centre ville Gafsa, Tunisie
    // et le niveau de zoom: setView([ x        , y       ], zoom )
    this.map = L.map('map').setView([34.417825, 8.787736], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map'
    }).addTo(this.map);

    this.myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [25, 41],
      popupAnchor: [-10, -40]
    });
    L.marker([34.417825, 8.787736], { icon: this.myIcon }).bindPopup('GAFSA').addTo(this.map).openPopup();


  }

  getAdress(){
    
    console.log(this.adresse);
    this.dataAdresse.getApiAdresse(this.adresse).subscribe(
      data =>{
        this.isclicked = true;
        this.adresseData = data.json();
        console.log(this.adresseData);
        console.log(this.adresseData.length);


      })

  }

  chooseAdress(i){
    console.log(this.adresseData[i].type);
    let location = L.latLng(this.adresseData[i].lat, this.adresseData[i].lon);
    this.map.panTo(location);
    if (this.adresseData[i].type == 'administrative') {
      this.map.setZoom(9);
    }
    else if (this.adresseData[i].type == 'city' ) {
      this.map.setZoom(11);
    } else {
      this.map.setZoom(13);
    }
    L.marker([this.adresseData[i].lat, this.adresseData[i].lon], {icon: this.myIcon}).bindPopup(this.adresseData[i].type).addTo(this.map);
  }

  


}
