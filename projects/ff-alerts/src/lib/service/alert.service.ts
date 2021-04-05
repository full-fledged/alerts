import {Inject, Injectable} from '@angular/core';
import {Alert} from '../model/alert.model';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {ALERT_CONFIG} from '../alert.config';
import {AlertConfig} from '../model/alert-config.model';
import {scan, take} from 'rxjs/operators';
import {AlertReducer} from './alert.reducer';

@Injectable()
export class AlertService {

  private dispatcher = new Subject<{ fn: Function, alert: Alert, config: AlertConfig }>();
  private state = new BehaviorSubject<Alert[]>([]);

  constructor(@Inject(ALERT_CONFIG) private config: AlertConfig) {
    this.initConfig();
    this.dispatcher
      .pipe(
        scan(AlertReducer.reduce, [])
      )
      .subscribe(this.state);
  }

  private initConfig(): void {
    if (!this.config) {
      this.config = {};
    }
    this.config.timeout = !!this.config.timeout ? this.config.timeout : 5000;
    this.config.maxMessages = !!this.config.maxMessages ? this.config.maxMessages : 5;
  }

  public get messages(): Observable<Alert[]> {
    return this.state.asObservable();
  }

  public info(msg: string | { html: string }, close$ = this.config.timeout > 0 ? timer(this.config.timeout) : null): void {
    this.addAlert({content: msg, type: 'info'}, close$);
  }

  public danger(msg: string | { html: string }, close$ = this.config.timeout > 0 ? timer(this.config.timeout) : null): void {
    this.addAlert({content: msg, type: 'danger'}, close$);
  }

  public success(msg: string | { html: string }, close$ = this.config.timeout > 0 ? timer(this.config.timeout) : null): void {
    this.addAlert({content: msg, type: 'success'}, close$);
  }

  public warning(msg: string | { html: string }, close$ = this.config.timeout > 0 ? timer(this.config.timeout) : null): void {
    this.addAlert({content: msg, type: 'warning'}, close$);
  }

  public close(alert: Alert): void {
    this.dispatcher.next({fn: AlertReducer.remove, alert: alert, config: this.config});
  }

  private addAlert(alert: Alert, close$: Observable<any> | null): void {
    this.dispatcher.next({fn: AlertReducer.add, alert: alert, config: this.config});
    if (close$) {
      close$
        .pipe(take(1))
        .subscribe(() => {
          this.dispatcher.next({fn: AlertReducer.remove, alert: alert, config: this.config});
        });
    }
  }
}
