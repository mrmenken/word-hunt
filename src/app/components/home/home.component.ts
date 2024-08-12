import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WordInputComponent } from "../word-input/word-input.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WordInputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
