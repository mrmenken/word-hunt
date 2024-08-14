import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Guess, LetterStatus } from '../../models/guess';

@Component({
  selector: 'app-guess',
  standalone: true,
  imports: [],
  templateUrl: './guess.component.html',
  styleUrl: './guess.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessComponent {
  protected LetterStatus = LetterStatus;

  readonly guess = input.required<Guess>();
}
