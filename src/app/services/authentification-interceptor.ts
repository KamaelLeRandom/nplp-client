import { HttpInterceptorFn } from "@angular/common/http";

export const authentificationInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token') ?? '';
  console.log("token", token);
  request = request.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    }
  });

  return next(request);
}
