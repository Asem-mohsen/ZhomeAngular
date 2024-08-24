import { afterNextRender, inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from '../Services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const _AuthService: AuthService = inject(AuthService);
  const token = _AuthService.getToken();
  if (token) {
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        ...request.headers
      },
    });
  }
  return next(request);
}
