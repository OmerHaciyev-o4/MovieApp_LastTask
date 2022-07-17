import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers:[MovieService]
})
export class MovieDetailsComponent implements OnInit {

  movie:Movie;

  constructor(private movieService:MovieService,
              private activatedRouted:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouted.params.subscribe(params=>{
      this.movieService.getMovieById(params["movieId"])
      .subscribe(data=>{
        this.movie=data;
      })
    })
  }

}