import { Component, ElementRef, ViewChild } from '@angular/core';
import { Toast } from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GPT } from 'src/app/Types/GPT';
import { Server } from 'src/app/Types/Servers';
import { OTP, updateDto } from 'src/app/Types/User';
import { ChatService } from 'src/app/services/chat.service';
import { ServerService } from 'src/app/services/server.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { Observable } from 'rxjs';
import 'table2excel';
import { getLocaleDateTimeFormat } from '@angular/common';

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
  update: boolean = false;
  formUpdate: FormGroup;
  filter: any;
  serversCopy: Server[];
  isLoading: boolean = false;
  server?: Server;
  userString: any;
  selectedFilter: any;
  currentTime: string = `${new Date().getHours()}:${new Date().getMinutes()} `;
  updatedUser?: updateDto;
  user: OTP;
  messages: any[] = [];
  mymessage: any[] = [];
  usernameUser: string = '';
  servers: Server[] = [];
  username: string = 'GPT-Engineer';
  email: string = '@gptengineer';
  upPercent: number = 0;
  updatedUserDetails: boolean = false;
  imageUrl: any;
  downPercent: number = 0;
  currentDate: Date = new Date();
  day: number = this.currentDate.getDate();
  alreadyExists: boolean = false;
  sendingMessage:boolean = false;

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
  files: any[] = [];
  passwordHidden: boolean = false;

  ngOnInit() {
    this.userString = localStorage.getItem('user');
    this.user = JSON.parse(this.userString) as OTP;
    this.usernameUser = this.user.username;

    this.serverService.getServerById(this.user.userId).subscribe((data) => {
      data.forEach((item) => {
        if (item.status == 'SERVER UP') {
          this.serverUpLength++;
        } else {
          this.serverDownLength++;
        }
        this.allServers = this.serverUpLength + this.serverDownLength;
        this.upPercent = (this.serverUpLength / this.allServers) * 100;
        this.downPercent = (this.serverDownLength / this.allServers) * 100;
        this.allPercent = this.upPercent + this.downPercent;
      });
    });
  }

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private gpt: ChatService,
    private serverService: ServerService,
    private router: Router,
    private upload: UploadService
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
      user_id: [''],
      isToggleChecked: [false],
    });
    this.formUpdate = this.fb.group({
      username: [this.user.username],
      email: [this.user.email],
      password: ['12345678'],
    });
  }
  showHomeMethod() {
    if (this.showHome == false) {
      this.showHome = true;
      this.showServers = false;
      this.showAnalytics = false;
      this.showSettings = false;
      this.showHelp = false;
      this.getServers();
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
    this.sendingMessage = true;
    this.mymessage.push(this.form.value);
    await this.gpt.textGPT(this.form.value).subscribe((data: GPT) => {
      this.sendingMessage = false;
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
        this.getServers();
        this.serverUpLength = 0;
        this.serverDownLength = 0;
        this.allServers = 0;
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.servers.splice(index, 1);
    return this.servers;
  }

  async addServer() {
    this.formAddServer.get('user_id')?.setValue(this.user.userId);
    let httpsOn = this.formAddServer.get('isToggleChecked')?.value;

    let url;
    this.isLoading = true;
    if (!this.files[0]) {
      console.log('There is no image');
      this.isLoading = false;
    }

    //upload my image on cloudinary
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'angular_cloudinary');
    data.append('cloud_name', 'dx7c7wkhu');

    await this.upload.uploadImage(data).subscribe((data) => {
      url = data;
      this.formAddServer.patchValue({
        imageurl: url.url,
      });
      if (httpsOn) {
        this.formAddServer.removeControl('isToggleChecked');

        this.serverService
          .createHttpsServer(this.formAddServer.value)
          .subscribe({
            next: (data) => {
              if (this.closeButtonRef) {
                this.closeButtonRef.nativeElement.click();
              }
              this.getServers();
              this.serverUpLength = 0;
              this.serverDownLength = 0;
              this.allServers = 0;
              this.isLoading = false;
              this.alreadyExists = false;
              this.formAddServer.reset();
              this.ngOnInit();
            },
            error: (err) => {
              this.alreadyExists = true;
              this.isLoading = false;
              console.log(err);
            },
          });
      } else {
        this.serverService.createServer(this.formAddServer.value).subscribe({
          next: (data) => {
            if (this.closeButtonRef) {
              this.closeButtonRef.nativeElement.click();
            }
            this.getServers();
            this.serverUpLength = 0;
            this.serverDownLength = 0;
            this.allServers = 0;
            this.isLoading = false;
            this.alreadyExists = false;
            this.formAddServer.reset();
            this.ngOnInit();
          },
          error: (err) => {
            this.alreadyExists = true;
            this.isLoading = false;
            console.log(err);
          },
        });
      }
    });
  }

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

  onSelect(event: { addedFiles: any }) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  download() {
    const Table2Excel = (window as any).Table2Excel;

    const table2excel = new Table2Excel({
      exclude: '.noExl',
      name: 'Excel Document Name',
      defaultFileName: 'Network Perfomance',
      exclude_img: true,
      exclude_links: true,
      exclude_inputs: true,
    });

    table2excel.export(document.querySelector('#testTable'));
  }

  updateDetails() {
    if (this.update == false) {
      this.update = true;
    } else {
      this.update = false;
    }
  }
  updateActualDetails() {
    this.userString = localStorage.getItem('user');
    this.user = JSON.parse(this.userString) as OTP;
    this.userService
      .updateUser(this.formUpdate.value, this.user?.userId)
      .subscribe({
        next: (data) => {
          this.updatedUser = data as updateDto;
          this.user.email = this.updatedUser.email;
          this.user.username = this.updatedUser.username;
          this.updatedUserDetails = true;
          localStorage.setItem('user', JSON.stringify(this.user));
        },
        error: (err) => {
          this.user = this.user;
          this.updatedUserDetails = false;
        },
      });
    console.log(this.formUpdate.value);
    this.update = false;
  }

  showOrHide() {
    const password = document.getElementById('password');
    const ion = document.getElementById('ion');
    if (this.passwordHidden == false) {
      this.passwordHidden = true;
      password?.setAttribute('type', 'text');
      ion?.setAttribute('name', 'eye-outline');
    } else {
      this.passwordHidden = false;
      password?.setAttribute('type', 'password');
      ion?.setAttribute('name', 'eye-off-outline');
    }
  }
}
