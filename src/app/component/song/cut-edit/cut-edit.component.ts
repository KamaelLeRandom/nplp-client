import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CutService } from '../../../services/cut.service';
import { CutInterface } from '../../../model/cut-interface';
import { CutFormComponent } from '../cut-form/cut-form.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cut-edit',
  imports: [CutFormComponent, NgIf],
  templateUrl: './cut-edit.component.html',
  styleUrl: './cut-edit.component.scss'
})
export class CutEditComponent implements OnInit {
  @Input() id!: string;
  router = inject(Router);
  cutService = inject(CutService);
  cut: CutInterface = {} as CutInterface;
  loading: boolean = true;

  ngOnInit(): void {
    if (isNaN(Number(this.id))) {
      this.router.navigateByUrl('/error', { state: { reason: 'Identifiant de coupure invalide' } })
    }

    this.cutService.getCutById(Number(this.id))
      .subscribe(({
        next: (response) => {
            this.loading = false;
            this.cut = response;
        },
        error: (error) => {
          console.log('error', error);
          this.router.navigateByUrl('/error', { state: { reason: 'Coupure introuvable' } })
        }
      }))
    ;
  }

  onSubmit(cutForm: any) {
    this.cutService
      .editCut({
          id: Number(this.id),
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
