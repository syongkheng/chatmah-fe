export interface Page<T1> {
  contents: T1[];
  page: number;
  totalPages: number;
  totalRecords: number;
  isLast: boolean;
}