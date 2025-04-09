import { HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  console.log('INTERCEPTOR EJECUTADO, TOKEN:', token);
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(clonedReq);
  }

  return next(req);
};