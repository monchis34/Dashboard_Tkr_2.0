import React from 'react';
import { Download, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  insight?: string;
  className?: string;
  height?: number | string;
  onExport?: () => void;
}

export function ChartContainer({
  title,
  subtitle,
  action,
  children,
  insight,
  className,
  height = 300,
  onExport
}: ChartContainerProps) {
  return (
    <div className={cn("card flex flex-col", className)}>
      {/* Header */}
      <div className="p-5 pb-0 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {action}
          {onExport && (
            <button 
              onClick={onExport}
              className="p-1.5 text-slate-400 hover:text-teker-primary hover:bg-slate-50 rounded-md transition-colors"
              title="Exportar CSV"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Chart Area */}
      <div className="p-5 flex-1 w-full relative" style={{ minHeight: height }}>
        {children}
      </div>
      
      {/* Footer Insight */}
      {insight && (
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl flex gap-3 items-start">
          <Info className="h-4 w-4 text-teker-cyan shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 leading-relaxed">
            {insight}
          </p>
        </div>
      )}
    </div>
  );
}
