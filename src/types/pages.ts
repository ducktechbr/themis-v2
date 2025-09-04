export type Item = {
  itemTitle: string;
  fulfilled: boolean;
  refcod: number;
};

export type Section = {
  fulfilled: boolean;
  itens: Item[];
  duplicatable: boolean;
};

export type ReportPages = {
  [sectionTitle: string]: Section;
};
