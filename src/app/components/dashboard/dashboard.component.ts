import { Component, ElementRef, ViewChild } from '@angular/core';
import { Toast } from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GPT } from 'src/app/Types/GPT';
import { Server } from 'src/app/Types/Servers';
import { OTP } from 'src/app/Types/User';
import { ChatService } from 'src/app/services/chat.service';
import { ServerService } from 'src/app/services/server.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  showHome: boolean = true;
  showServers: boolean = false;
  @ViewChild('closeButtonRef', { static: false }) closeButtonRef!: ElementRef;
  showAnalytics: boolean = false;
  showSettings: boolean = false;
  form: FormGroup;
  formAddServer: FormGroup;
  showHelp: boolean = false;
  server?: Server;
  userString: any;
  selectedFilter: any;
  user?: OTP;
  messages: any[] = [];
  mymessage: any[] = [];
  usernameUser: string = '';
  servers: Server[] = [];
  username: string = 'GPT-Engineer';
  email: string = '@gptengineer';
  upPercent: number = 0;
  downPercent: number = 0;
  currentDate: Date = new Date();
  day: number = this.currentDate.getDate();
  alreadyExists: boolean = false;
  month: string = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    this.currentDate
  );
  year: number = this.currentDate.getFullYear();

  formattedDate: string = `${this.day}, ${this.month} ${this.year}`;

  serverUpLength: number = 0;
  serverDownLength: number = 0;
  allServers: number = 0;
  allPercent: number = 0;
  loading: boolean = false;


  ngOnInit() {
    this.userString = localStorage.getItem('user');
    this.user = JSON.parse(this.userString) as OTP;
    this.usernameUser = this.user.username;

    this.serverService.getServerById(this.user.userId).subscribe((data) => {
      data.forEach(item => {
        if (item.status == 'SERVER UP') {
          this.serverUpLength++;
        }
        else {
          this.serverDownLength++;
        }
        this.allServers = this.serverUpLength + this.serverDownLength;
        this.upPercent = (this.serverUpLength / this.allServers) * 100;
        this.downPercent = (this.serverDownLength / this.allServers) * 100;
        this.allPercent = this.upPercent + this.downPercent;

      })
    });

  }

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private gpt: ChatService,
    private serverService: ServerService,
    private router: Router
  ) {
    this.form = this.fb.group({
      message: [''],
    });
    this.userString = localStorage.getItem('user');
    this.user = JSON.parse(this.userString) as OTP;


    this.formAddServer = this.fb.group({
      imageurl: [''],
      ipadress: [''],
      name: [''],
      memory: [''],
      type: [''],
      user_id: [this.user?.userId]
    })
  }
  showHomeMethod() {
    if (this.showHome == false) {
      this.showHome = true;
      this.showServers = false;
      this.showAnalytics = false;
      this.showSettings = false;
      this.showHelp = false;
      this.getServers()


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
      this.serverService.getServerById(this.user.userId).subscribe((data) => {
        this.servers = data;

      });
    }
  }
  getServers() {
    this.userString = localStorage.getItem('user');
    this.user = JSON.parse(this.userString) as OTP;
    this.usernameUser = this.user.username;

    this.serverService.getServerById(this.user.userId).subscribe((data) => {
      this.servers = data;


    });

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
            this.getServers();
            server.isLoading = false;

          },
          error: (err) => {
            console.log(err);
            server.isLoading = false;
          },
        });
    }, 1500);
  }
  deleteOneServer(server: Server, index: number) {
    this.server = server;
    this.serverService.deleteOneServer(server.server_id).subscribe({
      next: (data) => {
        console.log(data);
        this.getServers()
        this.serverUpLength = 0;
        this.serverDownLength = 0
        this.allServers = 0;
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.servers.splice(index, 1);
    return this.servers;
  }

  addServer() {

    this.serverService.createServer(this.formAddServer.value).subscribe({
      next: data => {
        if (this.closeButtonRef) {
          this.closeButtonRef.nativeElement.click();
        }
        this.getServers();
        this.serverUpLength = 0;
        this.serverDownLength = 0
        this.allServers = 0;
        this.alreadyExists = false;
        this.formAddServer.reset();
        this.ngOnInit()
      }, error: err => {
        this.alreadyExists = true;
        console.log('Exists')
        console.log(err)
      }
    })
  }

  filter: any;
  serversCopy: Server[];
  filterSearch(status: any) {
    if (!this.serversCopy) {
      this.serversCopy = [...this.servers]; // Create a copy of the original servers array
    }

    if (status) {
      this.filter = this.serversCopy.filter((item: Server) => {
        return item.status === status;
      });
    } else {
      this.filter = this.serversCopy.slice(); // Create a copy of the serversCopy array to display all items
    }

    this.servers = this.filter;
    console.log(this.servers);

    return this.filter;
  }


}

