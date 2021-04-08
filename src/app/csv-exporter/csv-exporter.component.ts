import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-csv-exporter',
  template: '<html></html>',
  styles: ['']
})
export class CsvExporterComponent {
  @Input() data: any;
  @Input() accession: any;
  @Input() optionalData: any;
}

// THIS IS A PLACEHOLDER COMPONENT
// GET THE IMPLEMENTATION FROM https://github.com/PDBe-KB/component-csv-exporter
