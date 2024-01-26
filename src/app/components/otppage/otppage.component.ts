import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OTP, verifyTheOTP } from 'src/app/Types/User';
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

  ngOnInit() {}

  async submit() {
    const inputs = document.querySelectorAll('input');
    const inputArr = Array.from(inputs);
    let string = '';
  
    for (let i = 0; i < inputArr.length; i++) {
      string += inputArr[i].value;
    }
  
    let otpObject: verifyTheOTP = {
      otp: Number(string),
    };
  
    this.userService.verifyOtp(otpObject).subscribe({
      next: (data) => {
        localStorage.setItem('user_details', JSON.stringify(data));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.wrongOTP = true;
        this.oldOTP = false;
        inputArr.forEach((item) => {
          item.setAttribute('class', 'errorOTP');
        });
      },
    });
  }
  

  @ViewChild('inputOTP') inputOTP: ElementRef;

  moveNext(event: KeyboardEvent, index: number) {
    const inputArr = this.inputOTP.nativeElement.querySelectorAll('input');
    const input = inputArr[index] as HTMLInputElement;

    if (event.key === 'Backspace' && index > 0) {
      const prevInput = inputArr[index - 1] as HTMLInputElement;
      prevInput.focus();
    } else if (index < inputArr.length - 1 && input.value.length === 1) {
      const nextInput = inputArr[index + 1] as HTMLInputElement;
      nextInput.focus();
    }
  }

  moveBack(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && index > 0) {
      const inputArr = document.querySelectorAll('.inputOTP input');
      const prevInput = inputArr[index - 1] as HTMLInputElement;
      prevInput.focus();
    }
  }
}
