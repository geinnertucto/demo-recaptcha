import { Component, OnDestroy, OnInit } from '@angular/core';
import { OnExecuteData, OnExecuteErrorData, ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public recentToken: string = '';
  public recentError?: { error: any };
  public readonly executionLog: Array<OnExecuteData | OnExecuteErrorData> = [];

  private allExecutionsSubscription: Subscription;
  private allExecutionErrorsSubscription: Subscription;
  private singleExecutionSubscription: Subscription;
  //title = 'demo-recaptcha';
  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {
  }

  public executeAction(action: string): void {
    if (this.singleExecutionSubscription) {
      this.singleExecutionSubscription.unsubscribe();
    }
    this.singleExecutionSubscription = this.recaptchaV3Service.execute(action)
      .subscribe(
        (token) => {
          this.recentToken = token;
          this.recentError = undefined;
        },
        (error) => {
          this.recentToken = '';
          this.recentError = { error };
        },
      );
  }

  public ngOnInit() {
    this.allExecutionsSubscription = this.recaptchaV3Service.onExecute
      .subscribe((data) => this.executionLog.push(data));
    this.allExecutionErrorsSubscription = this.recaptchaV3Service.onExecuteError
      .subscribe((data) => this.executionLog.push(data));
  }

  public ngOnDestroy() {
    if (this.allExecutionsSubscription) {
      this.allExecutionsSubscription.unsubscribe();
    }
    if (this.allExecutionErrorsSubscription) {
      this.allExecutionErrorsSubscription.unsubscribe();
    }
    if (this.singleExecutionSubscription) {
      this.singleExecutionSubscription.unsubscribe();
    }
  }

  public formatToken(token: string): string {
    if (!token) {
      return '(empty)';
    }
    console.log(token)
    return `${token.substr(0, 20)}...${token.substr(-20)}`;
  }
}