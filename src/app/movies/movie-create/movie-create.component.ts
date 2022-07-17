import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../category/category.model';
import { AlertifyService } from '../../services/alertify.services';
import { CategoryService } from '../../category/category.service';
import { MovieService } from '../movie.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';

// import { buildUrl } from 'cloudinary-build-url'
// import { Cloudinary } from 'cloudinary-core';
// import * as cloudinary from 'cloudinary-core';

declare function startWidget(): any;
declare function imageUpload(file: any): any;
declare function getImageUrl(): any;

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [CategoryService, MovieService, AlertifyService, CloudinaryService]
})
export class MovieCreateComponent implements OnInit {
  categories: Category[];
  model: any = { categoryId: -1 };
  file: File;

  constructor(private categoryService: CategoryService,
    private movieService: MovieService,
    private alertifyService: AlertifyService,
    private cloudinaryService: CloudinaryService,
    private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  movieForm = new FormGroup({
    title: new FormControl("Movie New",[Validators.required,Validators.minLength(5)]),
    description: new FormControl("",[Validators.required]),
    categoryId: new FormControl("",[Validators.required])
  });

  ClearForm(){
    this.movieForm.patchValue({
      title:'',
      description:'',
      imageUrl:'',
      categoryId:'-1'
    });
  }

  onSelect(event: any) {
    this.file = null;
    this.file = event.addedFiles[0];
  }
  onRemove() {
    this.file = null;
  }
  
  createMovie() {
    var formData = new FormData();
    formData.append('file', this.file);
    formData.append('upload_preset', 'uw_angular');
    formData.append('cloud_name', 'social-network-web');


    this.cloudinaryService.uploadImage(formData).subscribe(response => {
        const movie = {
          id:0,
          title:this.movieForm.value.title,
          description:this.movieForm.value.description,
          imageUrl: response.secure_url,
          isPopular:false,
          datePublished:new Date().getTime(),
          categoryId:this.movieForm.value.categoryId
        };

        this.movieService.createMovie(movie).subscribe(response=>{
          this.router.navigate(['/movies']);
        });
    });


    //console.log(form);
    // console.log(form.controls["categoryId"].value);
    // console.log(form.value);
    //console.log(this.model);

    // if(title.value==""){
    //   this.alertifyService.error("You should write title");
    //   return;
    // }
    // if(title.value.length<5){
    //   this.alertifyService.warning("you should write at least 5 characters");
    //   return;
    // }
    // if(description.value==""){
    //   this.alertifyService.error("You should write description");
    //   return;
    // }
    // if(imageUrl.value==""){
    //   this.alertifyService.error("You should write imageUrl");
    //   return;
    // }
    // if(categoryId.value=="-1"){
    //   this.alertifyService.error("You should write category");
    //   return;
    // }

    // const movie = {
    //   id:0,
    //   title:this.movieForm.value.title,
    //   description:this.movieForm.value.description,
    //   imageUrl:this.movieForm.value.imageUrl,
    //   isPopular:false,
    //   datePublished:new Date().getTime(),
    //   categoryId:this.movieForm.value.categoryId
    // };

    //   this.movieService.createMovie(movie)
    //   .subscribe(data=>
    //     {
    //       console.log(data);
    //       this.router.navigate(['/movies'])});
  }
}
