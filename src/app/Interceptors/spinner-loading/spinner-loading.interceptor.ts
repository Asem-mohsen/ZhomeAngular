import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
export const spinnerLoadingInterceptor: HttpInterceptorFn = (req, next) => {

  let _NgxSpinnerService : NgxSpinnerService = inject(NgxSpinnerService)

  _NgxSpinnerService.show()

  return next(req).pipe( finalize(()=>{

    _NgxSpinnerService.hide();

  }));

};