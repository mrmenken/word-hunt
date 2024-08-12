import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { wordValidator } from '../../validators/validators';

@Component({
  selector: 'app-word-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './word-input.component.html',
  styleUrl: './word-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordInputComponent {
  protected control = new FormControl('', [
    Validators.required,
    wordValidator(),
  ]);
}
