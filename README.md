PDBe-KB Similar Proteins Component
=


This repository is for the codebase of a lightweight Angular v7 web component that displays information on similar proteins to an input UniProt accession.

This web component is used on PDBe-KB Aggregated Views of Proteins to display PDB entries where the PDB sequence is similar to any PDB sequence of a UniProt accession, and any UniProt accessions in the same UniRef90 cluster as the protein of interest.

Note: This component uses the "molstar-dialog" web component available at [https://github.com/PDBe-KB/component-molstar-dialog](https://github.com/PDBe-KB/component-molstar-dialog) and the csv-exporter component available at [https://github.com/PDBe-KB/component-csv-exporter](https://github.com/PDBe-KB/component-csv-exporter)

### Example:

<img src="https://raw.githubusercontent.com/PDBe-KB/component-similar-proteins/main/pdbe-kb-similar-proteins.png">

## Quick Start

Get the code and install dependencies
```
git clone https://github.com/PDBe-KB/component-similar-proteins.git
cd component-similar-proteins
npm i
```

Running the app
```
ng serve
```

Running tests
```
ng test
```

## Dependencies

This web component embeds two other PDBe-KB web components: [https://github.com/PDBe-KB/component-csv-exporter](https://github.com/PDBe-KB/component-csv-exporter) and [https://github.com/PDBe-KB/component-molstar-dialog](https://github.com/PDBe-KB/component-molstar-dialog)

In order to use all the features of this web component, retrieve the "molstar-dialog" and "csv-exporter" components and replace the contents of the `src/app/molstar-dialog` and `src/app/csv-exporter` folders with those files.


The main template (i.e. `index.html` by default) should also have the following CSS imports:
```angular2html
<link rel="stylesheet" href="https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/css/ebi-global.css" type="text/css" media="all"/>
<link rel="stylesheet" href="https://ebi.emblstatic.net/web_guidelines/EBI-Icon-fonts/v1.3/fonts.css" type="text/css" media="all"/>
<link rel="stylesheet" href="https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/css/theme-pdbe-green.css" type="text/css" media="all"/>
```

## Basic usage

The component can be added to any Angular v7 apps.

#### 1.) Import the component:

Import the component in `app.module.ts` by default.
```
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SimilarProteinsComponent} from './similar-proteins/similar-proteins.component';
import {MolstarDialogComponent} from './molstar-dialog/molstar-dialog.component';
import {CsvExporterComponent} from './csv-exporter/csv-exporter.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SimilarProteinsComponent,
    MolstarDialogComponent,
    CsvExporterComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

#### 2.) Add the component to a template:
```angular2html
<app-similar-proteins [accession]="accession" [similarProteins]="similarProteins" [similarPDBs]="similarPDBs" [summaries]="similarSummaries"></app-similar-proteins>

```

The data model for the input data is described in 
`src/app/similar-proteins/similar-proteins.models.ts`

##### Example input data

```angular2html
    accession = 'P31800';
    
    similarSummaries = {
      'W5Q5G6': {
        'pdbs': 5,
        'ligands': 15,
        'interaction_partners': 7,
        'annotations': 0,
        'similar_proteins': 41
      }
    };
    
    similarPDBs = [
      {
        'mapped_segment': [
          {
            'pdb_id': '5j4z',
            'best_chain': 'CB',
            'unp_start': 35,
            'unp_end': 483,
            'entity_id': 51
          }
        ],
        'unp_length': 483,
        'species': 'Ovis aries',
        'taxid': 9940,
        'name': 'W5Q5G6_SHEEP',
        'description': 'Uncharacterized protein',
        'uniprot_id': 'W5Q5G6',
        'sequence_identity': 95
      }
    ];
    
    similarProteins = [
      {
        'uniprot_id': 'W5Q5G6',
        'name': 'W5Q5G6_SHEEP',
        'description': 'Uncharacterized protein',
        'species': 'Ovis aries',
        'taxid': 9940,
        'unp_length': 483,
        'representative_pdbs': [
          {
            'pdb_id': '6q9e',
            'best_chain': 'A',
            'entity_id': 1,
            'unp_start': 35,
            'unp_end': 483,
            'observed_regions': [
              {
                'unp_start': 36,
                'unp_end': 256
              },
              {
                'unp_start': 263,
                'unp_end': 283
              },
              {
                'unp_start': 287,
                'unp_end': 483
              }
            ]
          }
        ],
        'mapped_segment': [],
        'coverage': 0.91
      },
      {
        'uniprot_id': 'A0A6B0R6A2',
        'name': 'A0A6B0R6A2_9CETA',
        'description': 'Uncharacterized protein',
        'species': 'Bos mutus',
        'taxid': 72004,
        'unp_length': 467,
        'representative_pdbs': [],
        'mapped_segment': [
          {
            'pdb_id': '1sqb',
            'entity_id': 1,
            'best_chain': 'A',
            'unp_start': 1,
            'unp_end': 261
          }
        ],
        'coverage': 0
      }
    ];
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/PDBe-KB/component-similar-proteins/tags).

## Authors

* **Mihaly Varadi** - *Initial Implementation* - [mvaradi](https://github.com/mvaradi)

See also the list of [contributors](https://github.com/PDBe-KB/component-similar-proteins/contributors) who participated in this project.

## License

This project is licensed under the EMBL-EBI License - see the [LICENSE](LICENSE) file for details

## Acknowledgements

We would like to thank the [PDBe team](https://www.pdbe.org) and the [PDBe-KB partner resources](https://github.com/PDBe-KB/pdbe-kb-manual/wiki/PDBe-KB-Annotations) for their feedback and contributions.
