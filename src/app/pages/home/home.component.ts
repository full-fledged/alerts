import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../../../projects/ngx-alerts/src/lib/service/alert.service';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  control = new FormControl();
  close$ = new Subject();

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
  }

  alert(fn: string) {
    const msg = !!this.control.value ? this.control.value : {html: '<b>some message</b>'};
    this.alertService[fn](msg, this.close$);
  }
}
