import { Component, inject } from '@angular/core';
import { CutFormComponent } from '../cut-form/cut-form.component';
import { Router } from '@angular/router';
import { CutInterface } from '../../../model/cut-interface';
import { CutService } from '../../../services/cut.service';

@Component({
  selector: 'app-cut-add',
  imports: [CutFormComponent],
  templateUrl: './cut-add.component.html',
  styleUrl: './cut-add.component.scss'
})
export class CutAddComponent {
  router = inject(Router);
  cutService = inject(CutService);
  cut: CutInterface = {} as CutInterface;

  onSubmit(cutForm: any) {
    this.cutService
      .postCut({
          beforeLyric: cutForm.beforeLyric,
          searchLyric: cutForm.searchLyric,
          afterLyric: cutForm.afterLyric,
          difficulty: { id: cutForm.difficulty },
          song: { id: cutForm.song },
          dailies: [] as any[],
        } as CutInterface)
      .subscribe(({
        next: (response) => {
          this.router.navigateByUrl(`/song/${cutForm.song}`) 
        },
        error: (error) => {
          console.log(error);
        },
      }))
  }
}
