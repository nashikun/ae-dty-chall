import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AnimelistService} from '../../services/animelist.service';
import {AnimeService} from '../../services/anime.service';
import {Router} from '@angular/router';
import {ImageValidator} from '../../util/ImageValidator';
import {Anime} from '../../interfaces/anime';

@Component({
    selector: 'app-add-anime',
    templateUrl: './add-anime.component.html',
    styleUrls: ['./add-anime.component.css']
})
export class AddAnimeComponent implements OnInit {
    private imageUrl;
    private imageChanged = false;

    constructor(private fb: FormBuilder,
                private _animelistService: AnimelistService,
                private _animeService: AnimeService,
                private _router: Router
    ) {
    }

    addanimeForm: FormGroup;

    ngOnInit() {
        this.addanimeForm = this.fb.group({
            name: new FormControl(null, {
                validators: [Validators.required],
                // asyncValidators: [this.animevalidator.available.bind(this.animevalidator)]
            }),
            description: new FormControl(null, {validators: [Validators.required]}),
            episodes: new FormControl(0, {validators: [Validators.required]}),
            image: new FormControl(null, {validators: [Validators.required], asyncValidators: [ImageValidator]})
        });
    }

    addAnime() {
        this._animeService.addAnime(this.addanimeForm.value as Anime)
            .subscribe((res: { id: string }) => {
                this._router.navigate(['/animes', res.id]);
            });
    }

    ImageUploader(event: Event) {
        this.imageChanged = true;
        event.preventDefault();
        const image = (event.target as HTMLInputElement).files[0];
        if (image) {
            this.addanimeForm.patchValue({image: image});
            this.addanimeForm.get('image').updateValueAndValidity();
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => {
                if (this.addanimeForm.get('image').valid) {
                    this.imageChanged = false;
                    this.imageUrl = reader.result;
                }
            };
        }
    }
}
