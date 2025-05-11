import { Component, inject, Input, OnInit } from '@angular/core';
import { AuthorService } from '../../../services/author.service';
import { Router } from '@angular/router';
import { AuthorInterface } from '../../../model/author-interface';
import { NgIf } from '@angular/common';
import { AuthorFormComponent } from '../author-form/author-form.component';

@Component({
  selector: 'app-author-edit',
  imports: [AuthorFormComponent, NgIf],
  templateUrl: './author-edit.component.html',
  styleUrl: './author-edit.component.scss'
})
export class AuthorEditComponent implements OnInit {
  @Input() id!: string;
  router = inject(Router);
  authorService = inject(AuthorService);
  author: AuthorInterface = {} as AuthorInterface;
  loading: boolean = true;

  ngOnInit(): void {
    if (isNaN(Number(this.id))) {
      this.router.navigateByUrl('/error', { state: { reason: 'Identifiant de chanteur invalide' } })
    }

    this.authorService.getAuthorById(Number(this.id))
      .subscribe(({
        next: (response) => {
          this.loading = false;
          this.author = response;
        },
        error: (error) => {
          console.log('error', error);
          this.router.navigateByUrl('/error', { state: { reason: 'Chanteur introuvable' } })
        }
      }))
    ;
  }

  onSubmit(authorForm: any) {
    this.authorService
      .editAuthor({
        id: this.author.id,
        lastname: authorForm.lastname,
        firstname: authorForm.firstname,
        nickname: authorForm.nickname,
        birthday: authorForm.birthday,
      } as AuthorInterface)
      .subscribe(({
        next: (response: any) => {
          this.router.navigateByUrl(`/author/${response.id}`) 
        },
        error: (error) => {
          console.log(error);
        }
      }))
    ;
  }
}
