import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  darkOrLight: boolean = false;

  onOrOff() {
    let icon = document.querySelector('i');
    console.log(icon)
    if (this.darkOrLight == false) {
      this.darkOrLight = true;
      icon?.setAttribute('class', 'bi bi-toggle-on')

    } else {
      this.darkOrLight = false;
      icon?.setAttribute('class', 'bi bi-toggle-off')
    }

  }
}

