import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "./core/errors/error.interceptor";
import { AuthInterceptor } from "./features/auth/auth.interceptor";

export const httpInterceptorProviders = [
{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
]
