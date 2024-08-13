import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WordNormalizerService } from './word-normalizer.service';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private allWords: ReadonlySet<string> = new Set();
  private simpleWords = new ReplaySubject<readonly string[]>(1);

  constructor(
    private readonly normalizer: WordNormalizerService,
    private readonly http: HttpClient
  ) {
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
    word = this.normalizer.normalize(word);
    return this.allWords.has(word);
  }

  private loadWords(file: string): Observable<string[]> {
    return this.http.get(file, { responseType: 'text' }).pipe(
      map((data) =>
        data
          .split('\n')
          .map(this.normalizer.normalize)
          .filter((word) => word)
      ),
      catchError((error) => {
        console.error('Error loading words:', error);
        return [];
      })
    );
  }
}
