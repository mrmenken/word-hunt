import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
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
export class GuessPromptComponent implements AfterViewInit {
  @ViewChild('guess') private readonly controlRef!: ElementRef;

  protected control;

  constructor(
    private readonly gameService: GameService,
    dictionary: DictionaryService
  ) {
    this.control = new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(gameService.wordLength),
        Validators.maxLength(gameService.wordLength),
        wordValidator(dictionary),
      ],
    });
  }

  ngAfterViewInit() {
    this.controlRef.nativeElement.focus();
  }

  protected onSubmit() {
    if (this.control.invalid) return;

    this.gameService.addGuess(this.control.value);

    this.control.setValue('');
  }
}
