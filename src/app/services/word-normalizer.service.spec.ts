import { HttpClient, provideHttpClient } from '@angular/common/http';
import { WordNormalizerService } from './word-normalizer.service';
import { TestBed } from '@angular/core/testing';

describe('WordNormalizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
  });

  [
    ['gewoon', 'gewoon'],
    ["'s avonds", 'savonds'],
    ['A-merk', 'amerk'],
    ['R.I.P.', 'rip'],
    ['déjà vu', 'dejavu'],
    ['06-nummer', ''],
    ['1 aprilgrap', ''],
    ['2e', ''],
    ['CO₂-heffing', ''],
    ['C++', ''],
  ].forEach(([actual, expected]) => {
    it(`should normalize ${actual} to ${expected}`, () => {
      const service = new WordNormalizerService();
      expect(service.normalize(actual)).toBe(expected);
    });
  });

  ['words.all.nl.txt', 'words.simple.nl.txt'].forEach((file) => {
    it(`should be able to normalize all words in ${file}`, (done) => {
      const http = TestBed.inject(HttpClient);
      http.get(file, { responseType: 'text' }).subscribe((data) => {
        const words = data.split('\n');
        const service = new WordNormalizerService();
        for (const word of words) {
          const normalizedWord = service.normalize(word);
          expect(normalizedWord).toMatch(/^[a-z]*$/);
        }
        done();
      });
    });
  });
});
