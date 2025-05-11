import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AuthorInterface } from '../../../model/author-interface';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-form',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.scss'
})
export class AuthorFormComponent implements OnInit {
  @Input() author!: AuthorInterface;
  @Output() onSubmit = new EventEmitter<any>();

  formBuilder = inject(FormBuilder);
  authorForm = this.formBuilder.group({
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    nickname: ['', Validators.required],
    birthday: ['', Validators.required],
  });

  ngOnInit(): void {
    this.authorForm.patchValue({
      lastname: this.author.lastname,
      firstname: this.author.firstname,
      nickname: this.author.nickname,
      birthday: this.author.birthday?.toString(),
    });
  }

  submitForm() {
    if (this.authorForm.valid) 
      this.onSubmit.emit(this.authorForm.value);
  }
}
