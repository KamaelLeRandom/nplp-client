import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SongListComponent } from './component/song/song-list/song-list.component';
import { SongDetailComponent } from './component/song/song-detail/song-detail.component';
import { AuthentificationGuardService } from './services/authentification-guard';
import { SongFormComponent } from './component/song/song-form/song-form.component';
import { SongEditComponent } from './component/song/song-edit/song-edit.component';
import { ErrorPageComponent } from './component/error/error-page/error-page.component';
import { CutEditComponent } from './component/song/cut-edit/cut-edit.component';
import { CutAddComponent } from './component/song/cut-add/cut-add.component';
import { SongAddComponent } from './component/song/song-add/song-add.component';
import { AuthorListComponent } from './component/author/author-list/author-list.component';
import { AuthorDetailsComponent } from './component/author/author-details/author-details.component';
import { AuthorAddComponent } from './component/author/author-add/author-add.component';
import { AuthorEditComponent } from './component/author/author-edit/author-edit.component';
import { LeaderboardComponent } from './component/leaderboard/leaderboard.component';
import { GameComponent } from './component/game/game.component';
import { TrainingComponent } from './component/training/training.component';
import { PasswordResetComponent } from './login/password-reset/password-reset.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'error',
    component: ErrorPageComponent,
  },
  {
    path: 'training',
    // canActivate: [AuthentificationGuardService],
    component: TrainingComponent,
  },
  {
    path: 'profile',
    // canActivate: [AuthentificationGuardService],
    component: ProfileComponent,
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
  },
  {
    path: 'leaderboard',
    // canActivate: [AuthentificationGuardService],
    component: LeaderboardComponent,
  },
  {
    path: 'song',
    // canActivate: [AuthentificationGuardService],
    component: SongListComponent,
  },
  {
    path: 'song/create',
    // canActivate: [AuthentificationGuardAdminService],
    component: SongAddComponent,
  },
  {
    path: 'song/:id',
    // canActivate: [AuthentificationGuardService],
    component: SongDetailComponent,
  },
  {
    path: 'song/:id/edit',
    // canActivate: [AuthentificationGuardService],
    component: SongEditComponent,
  },
  {
    path: 'cut/:id/edit',
    // canActivate: [AuthentificationGuardAdminService],
    component: CutEditComponent,
  },
  {
    path: 'cut/create',
    // canActivate: [AuthentificationGuardAdminService],
    component: CutAddComponent,
  },
  {
    path: 'author',
    // canActivate: [AuthentificationGuardService],
    component: AuthorListComponent,
  },
  {
    path: 'author/create',
    // canActivate: [AuthentificationGuardService],
    component: AuthorAddComponent,
  },
  {
    path: 'author/:id',
    // canActivate: [AuthentificationGuardService],
    component: AuthorDetailsComponent,
  },
  {
    path: 'author/:id/edit',
    // canActivate: [AuthentificationGuardService],
    component: AuthorEditComponent,
  },
];
