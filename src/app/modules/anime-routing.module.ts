import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnimesComponent} from '../components/animes/animes.component';
import {AnimeComponent} from '../components/anime/anime.component';
import {AddAnimeComponent} from '../components/add-anime/add-anime.component';
import {AdminGuard} from '../guards/admin.guard';


const routes: Routes = [
  {path: '', component: AnimesComponent},
  {path: 'addAnime', component: AddAnimeComponent, canActivate: [AdminGuard]},
  {path: ':anime', component: AnimeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimeRoutingModule {
}
