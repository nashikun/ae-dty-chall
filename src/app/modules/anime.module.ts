import {AnimesComponent} from '../components/animes/animes.component';
import {AddAnimeComponent} from '../components/add-anime/add-anime.component';
import {AnimeComponent} from '../components/anime/anime.component';
import {NgModule} from '@angular/core';
import {AngularMaterialModule} from './angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AnimeRoutingModule} from './anime-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AnimesComponent,
    AddAnimeComponent,
    AnimeComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AnimeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})

export class AnimeModule {
}
