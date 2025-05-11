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
    path: 'profile',
    // canActivate: [AuthentificationGuardService],
    component: ProfileComponent,
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
  }
];
