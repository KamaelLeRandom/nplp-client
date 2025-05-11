import { Component, inject } from '@angular/core';
import { AuthorFormComponent } from '../author-form/author-form.component';
import { Router } from '@angular/router';
import { AuthorInterface } from '../../../model/author-interface';
import { AuthorService } from '../../../services/author.service';

@Component({
  selector: 'app-author-add',
  imports: [AuthorFormComponent],
  templateUrl: './author-add.component.html',
  styleUrl: './author-add.component.scss'
})
export class AuthorAddComponent {
  router = inject(Router);
  authorService = inject(AuthorService);
  author: AuthorInterface = {} as AuthorInterface;

  onSubmit(authorForm: any) {
    this.authorService.postAuthor({
      lastname: authorForm.lastname,
      firstname: authorForm.firstname,
      nickname: authorForm.nickname,
      birthday: authorForm.birthday,
    } as AuthorInterface)
      .subscribe(({
        next: (response: any) => {
          console.log(response);
          this.router.navigateByUrl(`/author/${response.id}`);
        },
        error: (error) => {
          console.log(error);
        }
      }))
    ;
  }
}
