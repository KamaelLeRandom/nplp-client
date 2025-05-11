import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CutInterface } from '../../../model/cut-interface';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DifficultyInterface } from '../../../model/difficulty-interface';
import { SongInterface } from '../../../model/song-interface';
import { forkJoin } from 'rxjs';
import { SongService } from '../../../services/song.service';
import { DifficultyService } from '../../../services/difficulty.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cut-form',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './cut-form.component.html',
  styleUrl: './cut-form.component.scss'
})
export class CutFormComponent implements OnInit {
  @Input() cut!: CutInterface;
  @Output() onSubmit = new EventEmitter<any>();

  formBuilder = inject(FormBuilder);
  cutForm = this.formBuilder.group({
    beforeLyric: ['', Validators.required],
    searchLyric: ['', Validators.required],
    afterLyric: ['', Validators.required],
    song: [null as number | null, Validators.required],
    difficulty: [null as number | null, Validators.required],
  });

  difficultyService = inject(DifficultyService);
  difficultyList: DifficultyInterface[] = [];
  songService = inject(SongService);
  songList: SongInterface[] = [];

  ngOnInit(): void {
    forkJoin({
      difficulties: this.difficultyService.getAllDifficulty(),
      songs: this.songService.getAllSong(),
    }).subscribe(({
      next: (response) => {
        this.difficultyList = response.difficulties;
        this.songList = response.songs;

        if (this.cut.id !== -1) {
          this.cutForm.patchValue({
            beforeLyric: this.cut.beforeLyric,
            searchLyric: this.cut.searchLyric,
            afterLyric: this.cut.afterLyric,
            song: this.cut.song.id,
            difficulty: this.cut.difficulty.id,
          });
        }
      },
      error: (error) => {
        console.log(error);
      }
    }))
  }

  submitForm() {
    if (this.cutForm.valid) 
      this.onSubmit.emit(this.cutForm.value);
  }
}
