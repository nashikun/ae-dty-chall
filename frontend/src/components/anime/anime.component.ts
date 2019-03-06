import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AnimeService} from '../../services/anime.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../../services/auth.service';
import {AnimelistService} from '../../services/animelist.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css']
})
export class AnimeComponent implements OnInit {

  constructor(private _auth: AuthService, private _animelist: AnimelistService, private _anime: AnimeService,
              private _activatedRoute: ActivatedRoute, private fb: FormBuilder, private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('upvoted',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/baseline-thumb_up_alt-24px.svg'));
    this.matIconRegistry.addSvgIcon('upvote',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/outline-thumb_up_alt-24px.svg'));
    this.matIconRegistry.addSvgIcon('star',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/baseline-star-24px.svg'));
    this.matIconRegistry.addSvgIcon('star_outline',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/baseline-star_border-24px.svg'));
  }

  reviewForm: FormGroup;
  anime = {name: '', image: '', description: '', _id: null, status: '', watchedEpisodes: '', rating: {_id: '', rating: 0}};
  reviews = [];
  userReview = {id: '', review: ''};
  editMode = false;

  ngOnInit() {
    this.reviewForm = this.fb.group({
      review: new FormControl(null, {validators: [Validators.required, Validators.minLength(100)]})
    });
    this._anime.getAnime(this._activatedRoute.snapshot.paramMap.get('anime')).subscribe(anime => {
      this.anime = anime;
      if (!anime.rating) {
        anime.rating = {};
      }
    }, error => console.error(error));
  }

  Add() {
    this._animelist.addToList(this.anime._id, 'Plan To Watch').subscribe(() => {
      this.anime.status = 'Plan To Watch';
    });
  }

  Update() {
    this._animelist.updateList(this.anime._id, this.anime.status, this.anime.watchedEpisodes).subscribe();
  }

  postReview() {
    if (!this.userReview.review) {
      this._anime.postReview(this.anime._id, this.reviewForm.value.review).subscribe(result => {
        this.editMode = false;
        this.userReview = result;
      });
    } else {
      this._anime.editReview(this.anime._id, this.userReview.id, this.reviewForm.value.review).subscribe(() => {
        this.editMode = false;
        this.userReview.review = this.reviewForm.value.review;
      });
    }
  }

  deleteReview() {
    this._anime.deleteReview(this.anime._id, this.userReview.id).subscribe(() => {
      this.editMode = true;
      this.userReview = {id: '', review: ''};
      this.reviewForm.reset();
    });
  }

  getReviews() {
    if (!this.reviews.length) {
      this._anime.getReviews(this.anime._id).subscribe(results => {
        this.reviews = results.reviews;
        if (results.userReview) {
          this.reviewForm.get('review').patchValue(results.userReview.review);
          this.userReview = results.userReview;
        }
      });
    }
  }

  upVote(review) {
    this._anime.upvote(this.anime._id, review.id).subscribe(response => {
      review.upvoted = true;
      review.upvotesCount = response.upvotesCount;
    });
  }

  unVote(review) {
    this._anime.unvote(this.anime._id, review.id).subscribe(response => {
      review.upvoted = false;
      review.upvotesCount = response.upvotesCount;
    });
  }

  rateAnime() {
    if (this.anime.rating._id) {
      this._anime.changeRating(this.anime._id, this.anime.rating._id, this.anime.rating.rating).subscribe();
    } else {
      this._anime.addRating(this.anime._id, this.anime.rating.rating).subscribe();
    }
  }

}

