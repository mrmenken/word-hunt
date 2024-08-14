import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { combineLatest } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WordNormalizerService } from './word-normalizer.service';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private allWords: ReadonlySet<string> = new Set();
  private simpleWords: readonly string[] = [];

  readonly initialized = signal<boolean>(false);

  constructor(
    private readonly normalizer: WordNormalizerService,
    private readonly http: HttpClient
  ) {
    combineLatest([
      this.loadWords('words.all.nl.txt'),
      this.loadWords('words.simple.nl.txt'),
    ]).subscribe(([allWords, simpleWords]) => {
      this.allWords = new Set(allWords);
      this.simpleWords = simpleWords;
      this.initialized.set(true);
    });
  }

  isValidWord(word: string) {
    word = this.normalizer.normalize(word);
    return this.allWords.has(word);
  }

  getRandomWord(length: number) {
    const wordsOfLength = this.simpleWords.filter(
      (word) => word.length === length
    );

    if (wordsOfLength.length === 0)
      throw new Error(`No words of length ${length} found`);

    const index = Math.floor(Math.random() * wordsOfLength.length);
    return wordsOfLength[index];
  }

  private loadWords(file: string) {
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
