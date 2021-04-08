import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  accession: string;
  similarProteins: any;
  similarPDBs: any;
  similarSummaries: any;

  constructor() {
    this.accession = 'P31800';
    this.similarSummaries = {
      'W5Q5G6': {
        'pdbs': 5,
        'ligands': 15,
        'interaction_partners': 7,
        'annotations': 0,
        'similar_proteins': 41
      }
    };
    this.similarPDBs = [
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
    this.similarProteins = [
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
  }
}
