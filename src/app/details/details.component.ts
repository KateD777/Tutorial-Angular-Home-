import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


//страницу подробностей, которая предоставляет
//более подробную информацию о данном жилье
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <!--для отображения конкретных данных,
  представленных местоположением жилья для параметра маршрута-->
<article>
    <img class="listing-photo" [src]="housingLocation?.photo"
    alt="Exterior photo of {{housingLocation?.name}}"/>
    <section class="listing-description">
    <h2 class="listing-heading">{{housingLocation?.name}}</h2>
    <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-features">
    <h2 class="section-heading">About this housing location</h2>
    <ul>
        <li>Units available: {{housingLocation?.availableUnits}}</li>
        <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
        <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
    </ul>
    </section>
    <section class="listing-apply">
    <h2 class="section-heading">Apply now to live here</h2>

<!--обработчик события (submit)="submitApplication()". Код справа от знака равенства
— это код, который должен быть выполнен при срабатывании этого события-->

    <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName">

        <label for="last-name">Last Name</label>
        <input id="last-name" type="text" formControlName="lastName">

        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email">
        <button type="submit" class="primary">Apply now</button>
    </form>
    </section>
</article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  //доступ к функции маршрутизатора ActivatedRoute, 
  //которая позволяет получить доступ к данным о 
  //текущем маршруте
route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

//FormControl может предоставлять значение по умолчанию и формировать 
//данные формы
applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
});
  
//чтобы использовать новую асинхронную версию метода getHousingLocationById
  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

//обработка клика Apply now
  submitApplication() {
    this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? ''
    );
}

}
