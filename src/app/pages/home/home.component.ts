import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../../../projects/ff-alerts/src/lib/service/alert.service';
import {UntypedFormControl} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  control = new UntypedFormControl();
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
