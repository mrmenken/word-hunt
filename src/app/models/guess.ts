export enum LetterStatus {
  Correct,
  Misplaced,
  Incorrect,
}

export class Guess {
  readonly letters: readonly string[];
  readonly status: LetterStatus[];

  constructor(word: string, target: string) {
    if (word.length !== target.length)
      throw new Error('Word and target must be of the same length');

    this.letters = word.split('');
    this.status = Array(target.length).fill(LetterStatus.Incorrect);

    const targetLetters = target.split('');
    this.processCorrectLetters(word, targetLetters);
    this.processMisplacedLetters(word, targetLetters);
  }

  private processCorrectLetters(word: string, target: string[]) {
    for (let i = 0; i < word.length; ++i) {
      if (word[i] === target[i]) {
        this.status[i] = LetterStatus.Correct;
        target[i] = '';
      }
    }
  }

  private processMisplacedLetters(word: string, target: string[]) {
    for (let i = 0; i < word.length; ++i) {
      if (this.status[i] === LetterStatus.Correct) continue;

      const targetIndex = target.indexOf(word[i]);
      if (targetIndex >= 0) {
        this.status[i] = LetterStatus.Misplaced;
        target[targetIndex] = '';
      }
    }
  }
}
