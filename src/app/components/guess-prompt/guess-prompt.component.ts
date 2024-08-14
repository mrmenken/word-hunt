import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { wordValidator } from '../../validators/validators';
import { DictionaryService } from '../../services/dictionary.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-guess-prompt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './guess-prompt.component.html',
  styleUrl: './guess-prompt.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessPromptComponent {
  protected control;

  constructor(gameService: GameService, dictionary: DictionaryService) {
    this.control = new FormControl('', [
      Validators.required,
      Validators.minLength(gameService.wordLength),
      Validators.maxLength(gameService.wordLength),
      wordValidator(dictionary),
    ]);
  }
}
