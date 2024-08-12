import { inject } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { WordService } from '../services/word.service';

export function wordValidator(wordService: WordService): ValidatorFn {
  return (control) => {
    const value = control.value.toLowerCase();
    if (wordService.isValid(value)) {
      return null;
    } else {
      return { word: true };
    }
  };
}
