import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SongListComponent } from './component/song/song-list/song-list.component';
import { SongItemComponent } from './component/song/song-item/song-item.component';
import { SongDetailComponent } from './component/song/song-detail/song-detail.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'song',
    component: SongListComponent,
  },
  {
    path: 'song/:id',
    component: SongDetailComponent,
  }
];
