export interface Case {
  id: string;
  name: string;
  year: number;
  type: 'Civil' | 'Criminal';
}

export interface CasesContextData {
  cases: Case[];
  loading: boolean;
}
