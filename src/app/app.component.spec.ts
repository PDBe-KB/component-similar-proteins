import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {SimilarProteinsComponent} from './similar-proteins/similar-proteins.component';
import {MolstarDialogComponent} from './molstar-dialog/molstar-dialog.component';
import {CsvExporterComponent} from './csv-exporter/csv-exporter.component';
import {MatDialogModule} from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SimilarProteinsComponent,
        MolstarDialogComponent,
        CsvExporterComponent
      ],
      imports: [
        MatDialogModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
