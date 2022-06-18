import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Response } from '../interface/response.interface';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
 

  private readonly randomUserUrl: string = 'https://randomuser.me/api';
  constructor(private http: HttpClient)  { }

  //pobieranie z api określonej liczby userów 
  getUsers(size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.randomUserUrl}?results=${size}`).pipe(
      map(response => this.processResponse(response)));
  // zwróć to api  this... np.'?=5' w tym przypadku pobierze 5
  }
  
  private processResponse(response: Response): Response {
    return {
      // ...response info -> KOPIUJEMY TO CO JEST w klasie info w api
      info: { ...response.info },
      results: response.results.map((user: any) => (<User>{
        uuid: user.login.uuid,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        username: user.login.username,
        gender: user.gender,
        address: `${user.location.city}, ${user.location.country}`,
        dateOfBirth: user.dob.date,
        phone: user.phone,
        imageUrl: user.picture.medium,
      }))
    };
  }
}


