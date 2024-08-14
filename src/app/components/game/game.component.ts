import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GuessPromptComponent } from "../guess-prompt/guess-prompt.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [GuessPromptComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {}
