export type Item = {
  itemTitle: string;
  fulfilled: boolean;
  refcod: number;
};

export type Section = {
  fulfilled: boolean;
  itens: Item[];
};

export type ReportData = {
  [sectionTitle: string]: Section;
};
