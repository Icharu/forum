
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly API_URL = 'https://forumback-rfio.onrender.com/news'; 

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<News[]> {
    return this.http.get<News[]>(this.API_URL);
  }

  criar(news: News): Observable<News> {
    return this.http.post<News>(`${this.API_URL}/post`, news);
  }

  atualizar(id: number, news: News): Observable<News> {
    return this.http.put<News>(`${this.API_URL}/update/${id}`, news);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`);
  }
}
