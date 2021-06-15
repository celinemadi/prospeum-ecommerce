import { ParsedToken } from '../../../authentication/models/parsed-token';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable()
export class UserService {

  http: HttpClient;
  baseURL = environment.baseURL;
  usersEndpoint = this.baseURL + '/api/user/'
  constructor(http: HttpClient) {
    this.http = http;
  }

 

  update(userId: string | number, changes: Partial<ParsedToken>): Observable<any> {
    return this.http.put(this.usersEndpoint + userId, changes);
  }

  getUser(userId){
    return this.http.get(this.usersEndpoint+userId)
  }

}