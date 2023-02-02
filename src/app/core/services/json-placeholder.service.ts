import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { IListResponse } from '../../shared/interfaces/listResponse';
import { IUser } from '../../shared/interfaces/user';
import { RequestParams } from '../../shared/types/requestParams';
import { JsonPlaceholderResponse } from '../../shared/types/jsonPlaceholderResponse';
import { ITodo } from '../../shared/interfaces/todo';
import { IComment } from '../../shared/interfaces/comment';
import { IPost } from '../../shared/interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceholderService {

  parseListResponse(res: JsonPlaceholderResponse<any>): IListResponse<any> {
    return {
      list: res.body,
      totalCount: +res.headers.get('x-total-count')
    }
  }

  handleError(err: HttpErrorResponse): Observable<any> {
    return of(alert(err.message))
  }

  constructor(private http: HttpClient) {}

  getUsers(params: RequestParams<IUser>): Observable<IListResponse<IUser>> {
    return this.http.get<JsonPlaceholderResponse<IUser>>('users', { params, observe: 'response' as 'body' }).pipe(
      map(this.parseListResponse),
      catchError(this.handleError)
    )
  };

  getTodos(params: RequestParams<ITodo>): Observable<IListResponse<ITodo>> {
    return this.http.get<JsonPlaceholderResponse<ITodo>>('todos', { params, observe: 'response' as 'body' }).pipe(
      map(this.parseListResponse),
      catchError(this.handleError)
    )
  };

  getComments(params: RequestParams<IComment>): Observable<IListResponse<IComment>> {
    return this.http.get<JsonPlaceholderResponse<ITodo>>('comments', { params, observe: 'response' as 'body' }).pipe(
      map(this.parseListResponse),
      catchError(this.handleError)
    )
  };

  getPosts(params: RequestParams<IPost>): Observable<IListResponse<IPost>> {
    return this.http.get<JsonPlaceholderResponse<ITodo>>('posts', { params, observe: 'response' as 'body' }).pipe(
      map(this.parseListResponse),
      catchError(this.handleError)
    )
  };
}


