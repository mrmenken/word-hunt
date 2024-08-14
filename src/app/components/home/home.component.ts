import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoadingScreenComponent, GameComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(protected readonly gameService: GameService) {}
}
