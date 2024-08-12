import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WordInputComponent } from '../word-input/word-input.component';
import { WordService } from '../../services/word.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, WordInputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly randomWord;

  constructor(wordService: WordService) {
    this.randomWord = wordService.randomWord(5);
  }
}
