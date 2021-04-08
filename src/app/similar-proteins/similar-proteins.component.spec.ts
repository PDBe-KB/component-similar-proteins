import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarProteinsComponent } from './similar-proteins.component';
import {CsvExporterComponent} from '../csv-exporter/csv-exporter.component';
import {MolstarDialogComponent} from '../molstar-dialog/molstar-dialog.component';
import {MatDialog} from '@angular/material/dialog';

describe('SimilarProteinsComponent', () => {
  let component: SimilarProteinsComponent;
  let fixture: ComponentFixture<SimilarProteinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarProteinsComponent, CsvExporterComponent, MolstarDialogComponent ],
      providers: [
        {provide: MatDialog, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarProteinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return count', () => {
    // Get the count of items in a list
    component.summaries = [42];
    expect(component.getSummaryCount()).toEqual(1);
  });

  it('should switch the value', () => {
    // Switch from true to false
    component.collapsed = {'foo': true};
    component.showOrCollapse('foo');
    expect(component.collapsed['foo']).toBeFalsy();

    // Switch from false to true
    component.showOrCollapse('foo');
    expect(component.collapsed['foo']).toBeTruthy();
  });

  it('should combine data', () => {
    // Combine two arrays
    let expectation = {};
    component.similarProteins = [{'foo': 1, 'bar': 2}];
    component.similarPDBs = [{'asd': 3}];
    expectation = [{'foo': 1, 'bar': 2, 'asd': 3}];
    expect(component.getCombinedData()['foo']).toEqual(expectation['foo']);
    expect(component.getCombinedData()['bar']).toEqual(expectation['bar']);
    expect(component.getCombinedData()['asd']).toEqual(expectation['asd']);

    // Combine two arrays when one is null
    component.similarProteins = null;
    component.similarPDBs = [{'asd': 3}];
    expectation = [{'asd': 3}];
    expect(component.getCombinedData()['asd']).toEqual(expectation['asd']);

    // Combine two arrays when the other is null
    component.similarProteins = [{'foo': 1, 'bar': 2}];
    component.similarPDBs = null;
    expectation = [{'foo': 1, 'bar': 2}];
    expect(component.getCombinedData()['foo']).toEqual(expectation['foo']);
    expect(component.getCombinedData()['bar']).toEqual(expectation['bar']);
  });


  it('should set the search term', () => {
    // Set the search term
    let term = {'srcElement': {'value': 'asd'}};
    component.setSearchTerm(term);
    expect(component.searchTerm).toEqual('asd');

    // Set the search term to empty string
    term = {'srcElement': {'value': ''}};
    component.setSearchTerm(term);
    expect(component.searchTerm).toEqual('');
  });

  it('should filter the data', () => {
    const data = [
      {'description': 'foo', 'species': 'bar', 'taxid': '0123'},
      {'description': 'asd', 'species': 'bar', 'taxid': '0124'}
    ];

    // Filter data using no search term (i.e. don't filter)
    let expected = [
      {'description': 'foo', 'species': 'bar', 'taxid': '0123'},
      {'description': 'asd', 'species': 'bar', 'taxid': '0124'}
    ];
    let result = component.filterData(data);
    expect(result).toEqual(expected);

    // Filter data using description
    component.searchTerm = 'foo';
    result = component.filterData(data);
    expected = [
      {'description': 'foo', 'species': 'bar', 'taxid': '0123'}
    ];

    // Filter data using species
    expect(result).toEqual(expected);
    component.searchTerm = 'bar';
    result = component.filterData(data);
    expected = [
      {'description': 'foo', 'species': 'bar', 'taxid': '0123'},
      {'description': 'asd', 'species': 'bar', 'taxid': '0124'}
    ];

    // Filter data using taxid
    expect(result).toEqual(expected);
    component.searchTerm = '0124';
    result = component.filterData(data);
    expected = [
      {'description': 'asd', 'species': 'bar', 'taxid': '0124'}
    ];
    expect(result).toEqual(expected);
  });

  it('should get icon style', () => {
    let expected = {};

    // Get the style when the count is higher than 0
    expected = {'border-bottom': 'none'};
    let result = component.getIconStyle(1);
    expect(result).toEqual(expected);

    // Get the style when the count is 0
    expected = {'border-bottom': 'none', 'color': '#808080'};
    result = component.getIconStyle(0);
    expect(result).toEqual(expected);
  });

  it('should get section style', () => {
    let expected = {};

    // Get the style when transparent if false
    expected = {'background-color': 'royalblue', 'width': '84%', 'left': '2%'};
    let result = component.getSectionStyle({'unp_start': 1, 'unp_end': 42}, 50, false);
    expect(result).toEqual(expected);

    // Get the style when transparent if true
    expected = {'opacity': 0.5, 'background-color': 'royalblue', 'width': '84%', 'left': '2%'};
    result = component.getSectionStyle({'unp_start': 1, 'unp_end': 42}, 50, true);
    expect(result).toEqual(expected);
  });

  it('should get an example', () => {
    // Get the default example if no data is present
    expect(component.getExample()).toEqual('Homo sapiens');

    // Get the first species from similarProteins
    component.similarPDBs = [{'species': 'Asd asd'}];
    component.similarProteins = [{'species': 'Foo bar'}];
    expect(component.getExample()).toEqual('Foo bar');

    // Get the first species from similarPDBs, if similarProteins is null
    component.similarProteins = null;
    expect(component.getExample()).toEqual('Asd asd');
  });

  it('should count well', () => {
    // Get the sum if both lists exist
    component.similarPDBs = [1, 2, 3];
    component.similarProteins = [4, 5, 6];
    expect(component.getCount()).toEqual(6);

    // Get the sum when similarPDBs is empty
    component.similarPDBs = null;
    component.similarProteins = [4, 5, 6];
    expect(component.getCount()).toEqual(3);

    // Get the sum when similarProteins is empty
    component.similarPDBs = [1, 2, 3];
    component.similarProteins = null;
    expect(component.getCount()).toEqual(3);
  });

  it('should round and format', () => {
    expect(component.showCoverage(0.12345)).toEqual('12%');

    expect(component.showCoverage(0.00045)).toEqual('0%');

    expect(component.showCoverage(1.1)).toEqual('110%');
  });
});
