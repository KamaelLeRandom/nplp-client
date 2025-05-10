import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user = {
    pseudo: 'Kamael',
    arrivalDate: new Date('2023-02-15'),
    avatarUrl: 'https://64.media.tumblr.com/ad2d177a7920d159b2219d1f57ca4212/99a902d475c1a44f-4f/s500x750/ba5bb1b0dae495620fbaa84cd10d4f27c9b0e6f3.jpg',
    rank: 42,
    history: [
      { date: new Date('2024-05-01'), description: 'Gagné un tournoi' },
      { date: new Date('2024-03-20'), description: 'Monté au rang 42' },
    ],
  };
}