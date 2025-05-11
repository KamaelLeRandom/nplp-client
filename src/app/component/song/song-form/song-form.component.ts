import { Component, EventEmitter, inject, Input, input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorInterface } from '../../../model/author-interface';
import { SongService } from '../../../services/song.service';
import { AuthorService } from '../../../services/author.service';
import { SongInterface } from '../../../model/song-interface';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './song-form.component.html',
  styleUrl: './song-form.component.scss'
})
export class SongFormComponent implements OnInit {
  @Input() id!: string;
  @Output() onSubmit = new EventEmitter<any>();

  songService = inject(SongService);
  authorService = inject(AuthorService);
  formBuilder = inject(FormBuilder);
  songForm = this.formBuilder.group({
    title: ['', Validators.required],
    lyric: ['', Validators.required],
    publishAt: ['', Validators.required],
    duration: ['', Validators.required],
    authors: [[], Validators.required]
  });
  
  authorList: AuthorInterface[] = [];
  authorSearch = '';
  filteredAuthors: AuthorInterface[] = [];
  selectedAuthors: AuthorInterface[] = [];
  song: SongInterface = {} as SongInterface;

  ngOnInit(): void {
    forkJoin({
      authors: this.authorService.getAllAuthor(),
      song: this.songService.getSongById(Number(this.id))
    }).subscribe({
      next: ({ authors, song }) => {
        this.authorList = authors;
        this.song = song;

        if (authors !== null && song !== null) {
          this.songForm.patchValue({
            title: song.title,
            lyric: song.lyric,
            publishAt: song.publishAt.toString(),
            duration: song.duration.toString(),
          });

          this.selectedAuthors = this.authorList.filter(author =>
            song.authors.some((a: any) => a.id === author.id)
          );

          this.songForm.patchValue({
            authors: this.selectedAuthors.map(a => a.id) as any
          });
        }
      },
      error: (error) => {
        console.log('error', error);
      }
    });
  }

  submitForm() {
    if (this.songForm.valid) 
      this.onSubmit.emit(this.songForm.value);
  }
}
