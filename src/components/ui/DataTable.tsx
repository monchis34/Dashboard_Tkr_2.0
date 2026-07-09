import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, ArrowUpDown, Download } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  onExport?: () => void;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onSort,
  sortKey,
  sortDirection,
  onExport,
  className
}: DataTableProps<T>) {
  
  const handleSort = (key: string) => {
    if (!onSort) return;
    if (sortKey === key) {
      onSort(key, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(key, 'asc');
    }
  };

  if (data.length === 0) {
    return (
      <div className={cn("card p-12 flex flex-col items-center justify-center text-center", className)}>
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-slate-400 text-2xl">📋</span>
        </div>
        <h4 className="font-medium text-slate-700">No hay datos disponibles</h4>
        <p className="text-sm text-slate-500 mt-1">Ajusta los filtros para ver resultados.</p>
      </div>
    );
  }

  return (
    <div className={cn("card overflow-hidden flex flex-col", className)}>
      {onExport && (
        <div className="p-4 border-b border-slate-100 flex justify-end">
          <button 
            onClick={onExport}
            className="flex items-center gap-2 text-sm font-medium text-teker-primary bg-teker-cyan/10 hover:bg-teker-cyan/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            Exportar CSV
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col) => (
                <th 
                  key={col.key}
                  className={cn(
                    "p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider",
                    col.sortable && "cursor-pointer select-none hover:bg-slate-100"
                  )}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && (
                      <span className="text-slate-400">
                        {sortKey === col.key ? (
                          sortDirection === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                        ) : (
                          <ArrowUpDown className="h-3 w-3 opacity-50" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="p-4 text-sm text-slate-700 whitespace-nowrap">
                    {col.cell ? col.cell(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
