export interface Case {
  id: number;
  name: string;
  year: number;
  type: 'Civil' | 'Criminal';
}

export interface CasesContextData {
  cases: Case[];
  loading: boolean;
  reload: () => void;
}
