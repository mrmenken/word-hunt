import { computed, Injectable, signal } from '@angular/core';
import { DictionaryService } from './dictionary.service';
import { Guess } from '../models/guess';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly initialized;
  readonly wordLength = 5;
  targetWord = '';
  readonly guesses = signal<Guess[]>([]);

  constructor(private readonly dictionary: DictionaryService) {
    this.initialized = computed(() => {
      if (!dictionary.initialized()) return false;

      this.targetWord = dictionary.getRandomWord(this.wordLength);

      return true;
    });
  }

  addGuess(word: string) {
    word = this.dictionary.normalize(word);
    this.guesses.set(this.guesses().concat(new Guess(word, this.targetWord)));
  }
}
