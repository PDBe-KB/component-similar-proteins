import {Component, Input} from '@angular/core';
import {MolstarDialogComponent} from '../molstar-dialog/molstar-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-similar-proteins',
  templateUrl: './similar-proteins.component.html',
  styleUrls: ['./similar-proteins.component.css']
})
export class SimilarProteinsComponent {

  @Input() similarProteins: any;
  @Input() similarPDBs: any;
  @Input() summaries: any;
  @Input() accession: string;
  searchTerm: string;
  collapsed: any;

  constructor(public dialog: MatDialog) {
    this.collapsed = {
      'similar-pdbs': false,
      'similar-with-no-data': true
    };
  }

  showOrCollapse(key: string) {
    /*
     * Toggles the boolean value in this.collapsed depending on a key
     *
     * @param key - A key from this.collapsed
     */
    this.collapsed[key] = !this.collapsed[key];
  }

  getSummaryCount() {
    /*
     * Gets the number of summaries (i.e. number of ligands per each related UniProt)
     *
     * @returns The number of summaries
     */
    return Object.keys(this.summaries).length;
  }

  getCombinedData() {
    /*
     * Concatenates the data from the similarProteins and similarPDBs.
     * This is used for passing the combined data to the csv-exporter component.
     */
    const combinedData = [];
    if (this.similarProteins) {
      this.similarProteins.forEach(val => combinedData.push(Object.assign({}, val)));
    }
    if (this.similarPDBs) {
      this.similarPDBs.forEach(function(item) {
        combinedData.push(item);
      });
    }
    return combinedData;
  }


  setSearchTerm(term: any) {
    /*
     * Sets the search term
     *
     * @param term - A search term
     */
    this.searchTerm = term.srcElement.value;
  }

  filterData(data: any) {
    /*
    * Return a filtered data object depending on this.searchTerm
    *
    * @param data - The data that has to be filtered
    * @returns
     */
    if (!this.searchTerm) {
      return data;
    }
    const searchTerm = this.searchTerm.toLowerCase();
    const filteredData = [];
    data.forEach(function(item) {
      if (item.description.toLowerCase().indexOf(searchTerm) > -1 ||
        item.species.toLowerCase().indexOf(searchTerm) > -1 ||
        item.taxid.toString().indexOf(searchTerm) > -1
      ) {
        filteredData.push(item);
      }
    });
    return filteredData;
  }

  getIconStyle(value: number) {
    /*
     * Return a style object to be used for formatting icons.
     * This is used for the summary icons, i.e. the number of ligands or
     * interaction partners a UniProt accession has. The icons look the same,
     * except when the count is 0
     *
     * @param value - A count of data items, e.g. number of ligands
     * @return A style object
     */
    const style = {};
    style['border-bottom'] = 'none';
    if (value === 0) {
      style['color'] = '#808080';
    }
    return style;
  }

  getSectionStyle(pdb: any, uniprotLength: number, transparent: boolean) {
    /*
     * Return a style object to be used for formatting boxes that represent PDB.
     * This is used to create boxes for PDBs that cover a certain segment of
     * a UniProt accession
     *
     * @param pdb - An object that has information on the start and end indices of residues
     * @param uniprotLength - A number that gives the length of the related UniProt accession sequence
     * @param transparent - A boolean to decide if a segment should be transparent
     * @return A style object
     */
    const style = {};
    if (transparent) {
      style['opacity'] = 0.5;
    }
    style['background-color'] = 'royalblue';
    style['width'] = Math.ceil((pdb.unp_end - pdb.unp_start + 1) / uniprotLength * 100) + '%';
    style['left'] = Math.floor(pdb.unp_start / uniprotLength * 100) + '%';
    return style;
  }

  getExample() {
    /*
     * Get the first species name as an example of a search term or use a fallback value
     *
     * @returns A string which is an example species name
     */
    if (this.similarProteins) {
      return this.similarProteins[0].species;
    }
    if (this.similarPDBs) {
      return this.similarPDBs[0].species;
    }
    return 'Homo sapiens';
  }

  getCount() {
    /*
     * Counts the number of similar UniProt entries.
     *
     * @returns The sum of similar PDBs and similar proteins
     */
    let count = 0;
    if (this.similarProteins) {
      count += this.similarProteins.length;
    }
    if (this.similarPDBs) {
      count += this.similarPDBs.length;
    }
    return count;
  }

  showCoverage(value: number) {
    /*
     * Get a formatted, rounded value
     *
     * @param value - A number to be rounded and formatted
     * @returns The formatted value
     */
    return Math.round((value * 100)).toString() + '%';
  }

  openMolstarDialog(pdb: any) {
    /*
     * Opens a Mol* dialog window
     *
     * @param pdb - An object with information on a PDB identifier and PDB chain
     */
    const entries = [];
    entries.push(
      {
        pdbId: pdb.pdb_id,
        chainId: pdb.best_chain,
        chainColor: [50, 130, 255]
      }
    );

    const entryData = {
      entryList: entries,
      current: 0
    };

    this.dialog.open(MolstarDialogComponent,
      {
        disableClose: false,
        panelClass: 'molstarDialog',
        data: entryData
      }
    );
  }

}
