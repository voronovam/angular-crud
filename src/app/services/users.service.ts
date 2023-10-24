import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, retry, tap, throwError} from "rxjs";
import {IUser} from "../models/user";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  users: IUser[] = []

  getAll (): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:3000/users')
      .pipe(
        retry(2),
        tap(users => this.users = users),
        catchError(this.errorHandler.bind(this))
      )
  }

  create (user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/users', user)
      .pipe(
        tap(us => this.users.push(us)),
        catchError(this.errorHandler.bind(this))
      )
  }

  delete (user: IUser): Observable<IUser> {
    return this.http.delete<IUser>('http://localhost:3000/users/' + user.id)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  edit(user: IUser): Observable<IUser> {
    return this.http.put<IUser>('http://localhost:3000/users/' + user.id, user)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message)
  }
}
