import { Component, Input } from '@angular/core';
import { AuthorInterface } from '../../../model/author-interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-author-item',
  imports: [RouterLink],
  templateUrl: './author-item.component.html',
  styleUrl: './author-item.component.scss'
})
export class AuthorItemComponent {
  @Input() author!: AuthorInterface;

  get formattedDate(): string {
    const date = new Date(this.author.birthday);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
