import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class DataAdresseService {
  public url  = "http://nominatim.openstreetmap.org/search?format=json&limit=5&q=";

  constructor(private http : Http) { }

  getApiAdresse(adresse : string ){
    
    return this.http.get(this.url + adresse);

  }

}
