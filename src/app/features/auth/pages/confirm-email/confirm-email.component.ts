import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { UsersApiService } from 'src/app/features/users/users-api.service';
import { ConfirmEmailData } from '../../auth.models';
import { Buffer } from 'buffer';
import { routeConfig } from 'src/app/route-config';
import { ConfirmEmailResult } from './confirm-email.models';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public readonly routes = {
    login: routeConfig.joinFromRoot(routeConfig.auth.prefix, routeConfig.auth.login)
  }

  private readonly resultSubject = new BehaviorSubject<ConfirmEmailResult | undefined>(undefined);
  public readonly result$ = this.resultSubject
    .asObservable()
    .pipe(tap((x) => console.log(x)));

  constructor(route: ActivatedRoute, private readonly api: UsersApiService) {
    route.queryParamMap
      .pipe(
        map(this.extractData),
        switchMap((x) => this.api.confirmEmail(x.userId, x.token)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (_) => this.resultSubject.next({ success: true, message: 'Email confirmed.' }),
        error: (_) => this.resultSubject.next({ success: false, message: 'An error occured' }),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private extractData(params: ParamMap) {
    let userId = params.get('userId');
    let token = params.get('token');

    if (!userId || !token) {
      throw new Error();
    }

    userId = Buffer.from(userId, 'base64').toString('utf8');
    token = Buffer.from(token, 'base64').toString('utf8');

    return {
      userId,
      token,
    } as ConfirmEmailData;
  }
}
