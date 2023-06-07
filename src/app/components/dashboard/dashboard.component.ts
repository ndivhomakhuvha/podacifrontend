import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GPT } from 'src/app/Types/GPT';
import { OTP } from 'src/app/Types/User';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  showHome: boolean = true;
  showServers: boolean = false;
  showAnalytics: boolean = false;
  showSettings: boolean = false;
  form: FormGroup;
  showHelp: boolean = false;
  userString: any;
  user?: OTP;
  messages: any[] = [];
  mymessage: any[] = [];
  usernameUser: string =''
  username: string = 'GPT-Engineer';
  email: string = '@gptengineer';
  currentDate: Date = new Date();
  day: number = this.currentDate.getDate();
  month: string = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    this.currentDate
  );
  year: number = this.currentDate.getFullYear();

  formattedDate: string = `${this.day}, ${this.month} ${this.year}`;

  serverUpLength: number = 10;
  serverDownLength: number = 5;
  allServers: number = this.serverUpLength + this.serverDownLength;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private gpt: ChatService
  ) {
    this.form = this.fb.group({
      message: [''],
    });
  }
  ngOnInit() {
    this.userString = localStorage.getItem('user');
    this.user = JSON.parse(this.userString) as OTP;
    this.usernameUser = this.user.username;
  }

  showHomeMethod() {
    if (this.showHome == false) {
      this.showHome = true;
      this.showServers = false;
      this.showAnalytics = false;
      this.showSettings = false;
      this.showHelp = false;
    }
  }
  showServersMethod() {
    if (this.showServers == false) {
      this.showHome = false;
      this.showServers = true;
      this.showAnalytics = false;
      this.showSettings = false;
      this.showHelp = false;
    }
  }
  showAnalyticsMethod() {
    if (this.showAnalytics == false) {
      this.showHome = false;
      this.showServers = false;
      this.showAnalytics = true;
      this.showSettings = false;
      this.showHelp = false;
    }
  }
  showSettingsMethod() {
    if (this.showSettings == false) {
      this.showHome = false;
      this.showServers = false;
      this.showAnalytics = false;
      this.showSettings = true;
      this.showHelp = false;
    }
  }

  async chatWithGpt() {
    this.mymessage.push(this.form.value);
    await this.gpt.textGPT(this.form.value).subscribe((data: GPT) => {
      this.messages.push(data);
    });
    console.log(this.messages)
  }
}

// When i click on a different thing
