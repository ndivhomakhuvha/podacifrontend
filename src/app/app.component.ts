import { Component, isDevMode } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PodaciFrontend';


  ngOnInit() {
    if (isDevMode()) { // 👈🏻👈🏻👈🏻
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }
}
