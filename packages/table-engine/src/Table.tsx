import React, { useState, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import styled from '@emotion/styled';
import { Column, SortConfig, FilterConfig, PaginationConfig } from './types';

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
  rowHeight?: number;
}

const TableWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

const TableHeader = styled.div`
  display: flex;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
`;

const HeaderCell = styled.div<{ width?: number }>`
  padding: 12px;
  font-weight: 600;
  flex: ${props => props.width ? 'none' : 1};
  width: ${props => props.width ? `${props.width}px` : 'auto'};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const TableBody = styled.div`
  height: 400px;
`;

const TableRow = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.div<{ width?: number }>`
  padding: 12px;
  flex: ${props => props.width ? 'none' : 1};
  width: ${props => props.width ? `${props.width}px` : 'auto'};
`;

const SortIcon = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 4px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #666;

  &.desc {
    transform: rotate(180deg);
  }
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 4px;
  margin-top: 4px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 12px;
  gap: 8px;
`;

const PageSizeSelect = styled.select`
  padding: 4px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

const PageButton = styled.button`
  padding: 4px 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export function Table<T>({
  columns,
  data,
  sortConfig,
  filterConfig,
  paginationConfig,
  onSort,
  onFilter,
  onPageChange,
  onPageSizeChange,
  rowHeight = 40,
}: TableProps<T>) {
  const [localSortConfig, setLocalSortConfig] = useState<SortConfig | null>(null);
  const [localFilterConfig, setLocalFilterConfig] = useState<FilterConfig | null>(null);

  const handleSort = (key: string) => {
    const newDirection = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const newConfig: SortConfig = { key, direction: newDirection };
    setLocalSortConfig(newConfig);
    onSort?.(newConfig);
  };

  const handleFilter = (key: string, value: string) => {
    const newConfig: FilterConfig = { key, value, operator: 'contains' };
    setLocalFilterConfig(newConfig);
    onFilter?.(newConfig);
  };

  const filteredData = useMemo(() => {
    let result = [...data];

    const currentFilterConfig = filterConfig || localFilterConfig;
    if (currentFilterConfig) {
      result = result.filter(item => {
        const value = String(item[currentFilterConfig.key as keyof T]).toLowerCase();
        return value.includes(currentFilterConfig.value.toLowerCase());
      });
    }

    const currentSortConfig = sortConfig || localSortConfig;
    if (currentSortConfig) {
      result.sort((a, b) => {
        const aValue = a[currentSortConfig.key as keyof T];
        const bValue = b[currentSortConfig.key as keyof T];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return currentSortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return currentSortConfig.direction === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      });
    }

    return result;
  }, [data, sortConfig, filterConfig, localSortConfig, localFilterConfig]);

  const paginatedData = useMemo(() => {
    if (!paginationConfig) return filteredData;

    const start = (paginationConfig.current - 1) * paginationConfig.pageSize;
    const end = start + paginationConfig.pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, paginationConfig]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = paginatedData[index];
    return (
      <TableRow style={style}>
        {columns.map(column => (
          <TableCell key={column.key} width={column.width}>
            {column.render ? column.render(item[column.dataIndex], item) : String(item[column.dataIndex])}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  return (
    <TableWrapper>
      <TableHeader>
        {columns.map(column => (
          <HeaderCell
            key={column.key}
            width={column.width}
            onClick={() => column.sortable && handleSort(column.key)}
          >
            {column.title}
            {column.sortable && sortConfig?.key === column.key && (
              <SortIcon className={sortConfig.direction} />
            )}
            {column.filterable && (
              <FilterInput
                type="text"
                placeholder={`Filter ${column.title}`}
                onChange={e => handleFilter(column.key, e.target.value)}
              />
            )}
          </HeaderCell>
        ))}
      </TableHeader>
      <TableBody>
        <List
          height={400}
          itemCount={paginatedData.length}
          itemSize={rowHeight}
          width="100%"
        >
          {Row}
        </List>
      </TableBody>
      {paginationConfig && (
        <Pagination>
          <PageSizeSelect
            value={paginationConfig.pageSize}
            onChange={e => onPageSizeChange?.(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </PageSizeSelect>
          <PageButton
            onClick={() => onPageChange?.(paginationConfig.current - 1)}
            disabled={paginationConfig.current === 1}
          >
            Previous
          </PageButton>
          <span>
            Page {paginationConfig.current} of{' '}
            {Math.ceil(paginationConfig.total / paginationConfig.pageSize)}
          </span>
          <PageButton
            onClick={() => onPageChange?.(paginationConfig.current + 1)}
            disabled={paginationConfig.current >= Math.ceil(paginationConfig.total / paginationConfig.pageSize)}
          >
            Next
          </PageButton>
        </Pagination>
      )}
    </TableWrapper>
  );
} 