import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OTP } from 'src/app/Types/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-otppage',
  templateUrl: './otppage.component.html',
  styleUrls: ['./otppage.component.scss'],
})
export class OTPPageComponent {
  oldOTP: boolean = true;
  newOTP: boolean = false;
  wrongOTP: boolean = false;
  email: String = '';
  userString: any;
  user?: OTP;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userString = localStorage.getItem('user');
    this.user = JSON.parse(this.userString) as OTP;
    this.email = this.user.email;
    console.log(this.user);
  }

  submit() {
    const inputs = document.querySelectorAll('input');
    const inputArr = Array.from(inputs);
    let string = '';
    for (let i = 0; i < inputArr.length; i++) {
      string += inputArr[i].value;
    }
    if (string === String(this.user?.number)) {
      this.router.navigate(['/dashboard']);
      localStorage.clear();
    } else {
      this.wrongOTP = true;
      this.oldOTP = false;
      inputArr.forEach((item) => {
        item.setAttribute('class', 'errorOTP');
      });
    }
  }

  moveNext() {
    const inputs = document.querySelectorAll('input');
    const inputArr = Array.from(inputs);

    if (inputArr[0].value.length === 1) {
      inputArr[1].focus();
    }
    if (inputArr[1].value.length === 1) {
      inputArr[2].focus();
    }

    if (inputArr[2].value.length === 1) {
      inputArr[3].focus();
    }
  }

  resendOTP() {
    let object = {
      email: this.user?.email,
    };

    this.userService.resendOTP(object).subscribe({
      next: (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.oldOTP = false;
        this.newOTP = true;
        this.ngOnInit();
      },
      error: (err) => {
        this.oldOTP = false;
        this.newOTP = false;
        console.log(err);
      },
    });
  }
}
