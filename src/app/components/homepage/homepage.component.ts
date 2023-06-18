import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  SignUp: boolean = false;
  constructor(private router: Router) { }
  moveToSign() {
    this.router.navigate(['/login']).then(data => {
      console.log(data)
    })
    this.SignUp = true;
  }
}
