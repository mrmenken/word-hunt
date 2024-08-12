import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private allWords: ReadonlySet<string> = new Set();
  private simpleWords = new ReplaySubject<ReadonlyArray<string>>(1);

  constructor(private http: HttpClient) {
    this.loadWords('words.all.nl.txt').subscribe(
      (words) => (this.allWords = new Set(words))
    );

    this.loadWords('words.simple.nl.txt').subscribe((words) =>
      this.simpleWords.next(words)
    );
  }

  randomWord(length: number) {
    return this.simpleWords.pipe(
      map((words) => {
        const wordsOfLength = words.filter((word) => word.length === length);

        if (wordsOfLength.length === 0)
          throw new Error(`No words of length ${length} found`);

        const index = Math.floor(Math.random() * wordsOfLength.length);
        return wordsOfLength[index];
      })
    );
  }

  isValid(word: string) {
    word = word.toLowerCase();
    return this.allWords.has(word);
  }

  private loadWords(file: string) {
    return this.http.get(file, { responseType: 'text' }).pipe(
      map((data) => data.split('\n').map((word) => word.toLowerCase())),
      catchError((error) => {
        console.error('Error loading words:', error);
        return [];
      })
    );
  }
}
