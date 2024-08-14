import { ValidatorFn } from '@angular/forms';
import { DictionaryService } from '../services/dictionary.service';

export function wordValidator(dictionary: DictionaryService): ValidatorFn {
  return (control) => {
    if (dictionary.isValidWord(control.value)) {
      return null;
    } else {
      return { word: true };
    }
  };
}
