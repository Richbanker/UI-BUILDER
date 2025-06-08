import * as react_jsx_runtime from 'react/jsx-runtime';

interface Column<T> {
    key: string;
    title: string;
    dataIndex: keyof T;
    width?: number;
    sortable?: boolean;
    filterable?: boolean;
    render?: (value: T) => React.ReactNode;
}
interface SortConfig {
    key: string;
    direction: 'asc' | 'desc';
}
interface FilterConfig {
    key: string;
    value: string;
    operator: 'contains' | 'equals' | 'startsWith' | 'endsWith';
}
interface PaginationConfig {
    currentPage: number;
    pageSize: number;
    total: number;
}
interface TableProps$1<T = any> {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
    sortable?: boolean;
    filterable?: boolean;
    pagination?: PaginationConfig;
    onSort?: (config: SortConfig) => void;
    onFilter?: (config: FilterConfig) => void;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    rowKey?: string | ((record: T) => string);
    virtualized?: boolean;
    height?: number;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    sortConfig?: SortConfig | null;
    filterConfig?: FilterConfig | null;
    paginationConfig?: PaginationConfig;
    onSort?: (config: SortConfig) => void;
    onFilter?: (config: FilterConfig) => void;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
}
declare function Table<T>({ columns, data, sortConfig, filterConfig, paginationConfig, onSort, onFilter, onPageChange, onPageSizeChange, }: TableProps<T>): react_jsx_runtime.JSX.Element;

export { type Column, type FilterConfig, type PaginationConfig, type SortConfig, Table, type TableProps$1 as TableProps };
