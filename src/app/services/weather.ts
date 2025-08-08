import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Weather {
  
  private apiUrl = 'http://localhost:5142/WeatherForecast';
temperatureC: any;
date: any;
summary: any;

  constructor(private http: HttpClient){}

  getWeather(): Observable<Weather[]>{
    return this.http.get<Weather[]>(this.apiUrl);
  }
}
