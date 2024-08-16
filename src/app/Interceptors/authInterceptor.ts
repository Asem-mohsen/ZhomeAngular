import { afterNextRender } from '@angular/core';
import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (request, next) => {

  afterNextRender(() => {
    const token = localStorage.getItem('userToken') ?? '';
    request = request.clone({
      setHeaders: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    })

    return next(request)
  })
  return next(request)
}
