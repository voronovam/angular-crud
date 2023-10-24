import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, retry, tap, throwError} from "rxjs";
import {IUnicorn} from "../models/unicorn";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})

export class UnicornsService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  unicorns: IUnicorn[] = []

  getAll (): Observable<IUnicorn[]> {
    return this.http.get<IUnicorn[]>('http://localhost:3000/users')
      .pipe(
        retry(2),
        tap(unicorns => this.unicorns = unicorns),
        catchError(this.errorHandler.bind(this))
      )
  }

  create (unicorn: IUnicorn): Observable<IUnicorn> {
    return this.http.post<IUnicorn>('http://localhost:3000/users', unicorn)
      .pipe(
        tap(unic => this.unicorns.push(unic)),
        catchError(this.errorHandler.bind(this))
      )
  }

  delete (unicorn: IUnicorn): Observable<IUnicorn> {
    return this.http.delete<IUnicorn>('http://localhost:3000/users/' + unicorn.id)
      .pipe(
        //tap(unicorns => this.unicorns = unicorns),
        catchError(this.errorHandler.bind(this))
      )
  }

  edit(unicorn: IUnicorn): Observable<IUnicorn> {
    return this.http.put<IUnicorn>('http://localhost:3000/users/' + unicorn.id, unicorn)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message)
  }
}
