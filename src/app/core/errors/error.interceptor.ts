import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorResponse } from './error.model';
import { errorMessages } from './error-messages';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        const message = this.extractMessage(err.error);
        this.snackBar.open(message);
        return throwError(() => err);
      })
    );
  }

  private extractMessage(err: ErrorResponse) {
    if (!!err.validationErrors) {
      return 'Validation errors occured.';
    }

    if (!!err.errors) {
      return err.errors.length > 1
        ? err.errors
            .map((x) => {
              const msg = this.getErrorMessage(x.code);
              return `- ${msg ?? 'Unknown error.'}`;
            })
            .join('\n')
        : err.errors
            .map((x) => {
              const msg = this.getErrorMessage(x.code);
              return msg ?? 'Unknown error.';
            })
            .join('\n');
    }

    return 'An error occured.';
  }

  private getErrorMessage(code?: string) {
    if (!code) {
      return undefined;
    }

    return code in errorMessages
      ? errorMessages[code as keyof typeof errorMessages]
      : undefined;
  }
}
