import { Component, inject } from '@angular/core';
import { HousingService } from '../housing.service';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, CommonModule],
  template: `
<section>
    <form>
    <input type="text" placeholder="Filter by city" #filter>
    <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
</section>
<section class = "results">
<!--добавили новую привязку свойства и передали ссылку на свойство класса
приложение отправляет данные из HomeComponent в HousingLocationComponent

использовали директиву ngFor для динамического повторения данных в шаблонах
-->
<app-housing-location
    *ngFor="let housingLocation of filteredLocationList"
    [housingLocation]="housingLocation"
></app-housing-location>
</section>
`,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  
  //добавили сервис HousingService  
  //и внедрили его в класс HomeComponent 
  housingService: HousingService = inject(HousingService);
  
  //новое св-во, содержит значения, которые соответствуют критериям поиска, введенным пользователем
  filteredLocationList: HousingLocation[] = [];
  constructor() {
    //присвоит housingLocationList значение, 
    //возвращаемое вызовом getAllHousingLocations
    this.housingLocationList = this.housingService.getAllHousingLocations();
          
    //По умолчанию при загрузке страницы filteredLocationList 
    //должен содержать полный набор значений местоположений жилья
    this.filteredLocationList = this.housingLocationList;
  };
  

  //реализация функции для поиска. 
  //использует функцию фильтра String для сравнения значения параметра text со свойством housingLocation.city.
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}

