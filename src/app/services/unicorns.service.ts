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
    return this.http.get<IUnicorn[]>('https://crudcrud.com/api/65476344558c4a0d9cb52af050e497e0/unicorns')
      .pipe(
        retry(2),
        tap(unicorns => this.unicorns = unicorns),
        catchError(this.errorHandler.bind(this))
      )
  }

  create (unicorn: IUnicorn): Observable<IUnicorn> {
    return this.http.post<IUnicorn>('https://crudcrud.com/api/65476344558c4a0d9cb52af050e497e0/unicorns', unicorn)
      .pipe(
        tap(unic => this.unicorns.push(unic)),
        catchError(this.errorHandler.bind(this))
      )
  }

  delete (unicorn: IUnicorn) {
    return this.http.delete<IUnicorn>(`https://crudcrud.com/api/65476344558c4a0d9cb52af050e497e0/unicorns/${unicorn._id}`)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message)
  }
}
