import { afterNextRender, inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from '../Services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {

  const _AuthService: AuthService = inject(AuthService);
  const token     = _AuthService.getToken();
  const sessionId = _AuthService.getSessionId();

  request = request.clone({
    setHeaders: {
      'Authorization': `Bearer ${token}`,
      'X-Session-ID': sessionId
    },
  });
  
  return next(request);
}
