import { ValidatorFn } from '@angular/forms';

export function wordValidator(): ValidatorFn {
  return (control) => {
    const value = control.value.toLowerCase();
    const validWords = ['aap', 'noot', 'mies'];
    if (validWords.includes(value)) {
      return null;
    } else {
      return { word: true };
    }
  };
}
