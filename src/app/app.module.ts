import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimilarProteinsComponent } from './similar-proteins/similar-proteins.component';
import { MolstarDialogComponent } from './molstar-dialog/molstar-dialog.component';
import { CsvExporterComponent } from './csv-exporter/csv-exporter.component';

@NgModule({
  declarations: [
    AppComponent,
    SimilarProteinsComponent,
    MolstarDialogComponent,
    CsvExporterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
