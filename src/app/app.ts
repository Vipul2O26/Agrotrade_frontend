import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Weather } from './services/weather';



@Component({
  selector: 'app-root',
  imports: [CommonModule],
  template: `
    <h1 class="text-xl font-bold mb-4">Weather Forecast</h1>
    <table border="1" cellpadding="8">
      <tr>
        <th>Date</th>
        <th>Temp (°C)</th>
        <th>Temp (°F)</th>
        <th>Summary</th>
      </tr>
      <tr *ngFor="let item of weatherData">
        <td>{{ item.date }}</td>
        <td>{{ item.temperatureC }}</td>
        <td>{{ item.temperatureC }}</td>
        <td>{{ item.summary }}</td>
      </tr>
    </table>
  `,
  styleUrl: './app.css'
})
export class App {
  weatherData: Weather[] = [];

  constructor(private weatherServices: Weather){}

  ngOnInit() {
    this.weatherServices.getWeather().subscribe(data => {
      this.weatherData = data;
    })
  }
  
}
