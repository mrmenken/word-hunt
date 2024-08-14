import { computed, Injectable } from '@angular/core';
import { DictionaryService } from './dictionary.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly initialized;
  readonly wordLength = 5;
  targetWord = '';

  constructor(dictionary: DictionaryService) {
    this.initialized = computed(() => {
      if (!dictionary.initialized()) return false;

      this.targetWord = dictionary.getRandomWord(this.wordLength);
      return true;
    });
  }
}
