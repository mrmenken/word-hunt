import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GuessPromptComponent } from '../guess-prompt/guess-prompt.component';
import { GameService } from '../../services/game.service';
import { GuessComponent } from "../guess/guess.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [GuessPromptComponent, GuessComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  constructor(protected readonly gameService: GameService) {}
}
