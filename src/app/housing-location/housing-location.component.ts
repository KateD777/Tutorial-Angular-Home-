import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
<!-- использовали связывание свойств для привязки
housingLocation.photo к атрибуту src.
Атрибут alt использует интерполяцию для придания
большего контекста alt-тексту изображения.

Вы используете интерполяцию для включения значений
имени, города и штата в свойство housingLocation
-->

<section class="listing">
    <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
    <h2 class="listing-heading">{{ housingLocation.name }}</h2>
    <p class="listing-location">{{ housingLocation.city}}, {{housingLocation.state }}</p>

    <!--routerLink позволяет маршрутизатору создавать динамические
    ссылки в приложении. Значение, присваиваемое директиве routerLink,
    представляет собой массив с двумя элементами:
    статической частью пути и динамическими данными-->
    <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
</section>
`,
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {
  //для получения входных данных добавляем 
  //новое свойство оформренное с помощью декоратора Input
  @Input() housingLocation!: HousingLocation;

}
