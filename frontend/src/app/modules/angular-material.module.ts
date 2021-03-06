import {NgModule} from '@angular/core';

import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
} from '@angular/material';


@NgModule({
  exports: [
    MatBadgeModule,
    MatSortModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})

export class AngularMaterialModule {

}
