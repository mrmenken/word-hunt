import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordNormalizerService {
  normalize(word: string) {
    if (/[0-9₂+/]/.test(word)) return '';

    word = word
      .replaceAll(/[ \-'.]/g, '')
      .replaceAll(/[áàäâÅ]/g, 'a')
      .replaceAll(/ç/g, 'c')
      .replaceAll(/[éèëê]/g, 'e')
      .replaceAll(/[ïî]/g, 'i')
      .replaceAll(/ñ/g, 'n')
      .replaceAll(/[óöô]/g, 'o')
      .replaceAll(/[úüû]/g, 'u')
      .toLowerCase();

    return word;
  }
}
