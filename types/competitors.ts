export interface Competitor {
  id: number;
  name: string;
  grad_year: number;
}

export interface CompetitorsContextData {
  competitors: Competitor[];
  loading: boolean;
  reload: () => void;
}
