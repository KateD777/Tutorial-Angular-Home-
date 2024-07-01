import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
//в app.component подключен home.component
/*в home.component подключен housing-location.component
Сам интерфейс housinglocation подключен к housing-location.component
и home.component
*/                        
@Component({
  selector: 'app-root', //Angular обращается к компоненту в шаблонах
  standalone: true, //чтобы описать, требует ли компонент ngModule
  imports: [RouterOutlet, RouterLink, HomeComponent], //для описания зависимостей компонента
  template: `
<main>
    <a [routerLink]="['/']">
    <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
    </header>
    </a>
    <section class="content">
    <router-outlet></router-outlet>
    </section>
</main>
`, //для описания HTML-разметки и макета компонента
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'homes';
}

