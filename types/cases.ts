export interface Case {
  id: string;
  name: string;
  year: string;
  type: 'Civil' | 'Criminal';
}

export interface CasesContextData {
  cases: Case[];
  loading: boolean;
}
