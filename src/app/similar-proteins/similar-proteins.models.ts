export class SimilarProtein {
  uniprot_id: string;
  name: string;
  description: string;
  species: string;
  taxid: string;
  coverage?: number;
  ligands?: number;
  complexes?: number;
  unp_length: number;
  sequence_identity?: number;
  representative_pdbs?: RepresentativePdb[];
  mapped_segments?: MappedSegment[];
}

export class RepresentativePdb {
  pdb_id: string;
  best_chain: string;
  entity_id: number;
  unp_start: number;
  unp_end: number;
}

export class MappedSegment {
  pdb_id: string;
  entity_id: number;
  best_chain: string;
  unp_start: number;
  unp_end: number;
}
