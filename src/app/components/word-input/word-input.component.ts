import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { wordValidator } from '../../validators/validators';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-word-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './word-input.component.html',
  styleUrl: './word-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordInputComponent {
  protected control;

  constructor(dictionary: DictionaryService) {
    this.control = new FormControl('', [
      Validators.required,
      wordValidator(dictionary),
    ]);
  }
}
