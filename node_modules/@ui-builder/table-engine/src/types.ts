export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  [key: string]: string;
}

export interface PaginationConfig {
  current: number;
  pageSize: number;
  total: number;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  virtualized?: boolean;
  height?: number;
  rowHeight?: number;
  pagination?: PaginationConfig;
  onSort?: (config: SortConfig) => void;
  onFilter?: (config: FilterConfig) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  rowKey?: string | ((record: T) => string);
} 