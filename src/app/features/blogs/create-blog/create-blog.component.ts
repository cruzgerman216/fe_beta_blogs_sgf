import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogService } from '../../../core/services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss',
})
export class CreateBlogComponent {
  blogForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  fileSelected: File | null = null;

  constructor(private blogService: BlogService, private router: Router) {}

  createBlog() {
    const formData = new FormData();
    const title = this.blogForm.get('title')!.value
    const content = this.blogForm.get('content')!.value
    formData.append('title', title);
    formData.append('content', content);

    if(this.fileSelected){
      formData.append('cover_image', this.fileSelected, this.fileSelected.name)
    }

    this.blogService.createBlog(formData).subscribe({
      next: (res) => {
        console.log('Blog created!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.fileSelected = event.target.files[0];
    }
  }
}
