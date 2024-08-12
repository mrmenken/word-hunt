import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private words: ReadonlySet<string> = new Set();

  constructor(private http: HttpClient) {
    this.loadWords();
  }

  isValid(word: string) {
    word = word.toLowerCase();
    return this.words.has(word);
  }

  private loadWords() {
    this.http
      .get('words.nl.txt', { responseType: 'text' })
      .pipe(
        map(
          (data) => new Set(data.split('\n').map((word) => word.toLowerCase()))
        ),
        catchError((error) => {
          console.error('Error loading words:', error);
          return [];
        })
      )
      .subscribe((words) => (this.words = words));
  }
}
