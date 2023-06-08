import { Component } from '@angular/core';
import { Toast } from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GPT } from 'src/app/Types/GPT';
import { Server } from 'src/app/Types/Servers';
import { OTP } from 'src/app/Types/User';
import { ChatService } from 'src/app/services/chat.service';
import { ServerService } from 'src/app/services/server.service';
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
  server?: Server;
  userString: any;
  user?: OTP;
  messages: any[] = [];
  mymessage: any[] = [];
  usernameUser: string = '';
  servers: Server[] = [];
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
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private gpt: ChatService,
    private serverService: ServerService
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
      this.userString = localStorage.getItem('user');
      this.user = JSON.parse(this.userString) as OTP;
      this.usernameUser = this.user.username;
      this.serverService.getServerById(3).subscribe((data) => {
        this.servers = data;
        console.log(this.servers);
      });
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
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].setValue('');
    });
  }

  pingServer(server: Server) {
    server.isLoading = true;
    this.server = server;
    let ipaddress = {
      ipadress: this.server.ipadress,
    };
    setTimeout(() => {
      this.serverService
        .pingServer(this.server?.server_id, ipaddress)
        .subscribe({
          next: (data) => {
            server.isLoading = false;
            console.log(data);
          },
          error: (err) => {
            console.log(err);
            server.isLoading = false;
          },
        });
    }, 1500);
  }
  deleteOneServer(server: Server) {
    this.server = server;
  
    this.serverService.deleteOneServer(server.server_id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
