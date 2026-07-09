import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export type KPICardVariant = 'success' | 'warning' | 'error' | 'info';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number; // percentage, positive or negative
  variant?: KPICardVariant;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const variantPillStyles: Record<KPICardVariant, string> = {
  success: 'bg-green-50 text-green-600',
  warning: 'bg-amber-50 text-amber-600',
  error: 'bg-red-50 text-red-600',
  info: 'bg-blue-50 text-blue-600',
};

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  variant = 'info',
  icon,
  className,
  onClick
}: KPICardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;
  const isNeutral = trend === 0;

  return (
    <div 
      onClick={onClick}
      className={cn(
        "card !rounded-2xl p-5 kpi-card relative overflow-hidden group flex flex-col justify-between h-32",
        onClick && "cursor-pointer hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</span>
        {trend !== undefined ? (
          <span className={cn(
            "px-2 py-1 text-[10px] font-bold rounded-md flex items-center gap-0.5",
            isPositive ? "bg-green-50 text-green-600" : isNegative ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-600"
          )}>
            {isPositive && "+"}
            {trend}%
          </span>
        ) : icon ? (
          <div className="text-slate-400 opacity-50">
            {icon}
          </div>
        ) : null}
      </div>
      
      <div className="flex items-baseline gap-2">
        <h2 className="text-3xl font-bold text-teker-primary kpi-value">
          {value}
        </h2>
      </div>
      
      <div className="w-full flex items-center justify-between">
        {subtitle ? (
          <p className="text-[10px] text-slate-400 italic">{subtitle}</p>
        ) : (
           <div className="w-full bg-slate-100 h-1 rounded-full mt-2">
             <div className={cn("h-1 rounded-full", variant === 'success' ? 'bg-green-500' : variant === 'warning' ? 'bg-amber-400' : variant === 'error' ? 'bg-red-500' : 'bg-blue-500')} style={{ width: '50%' }}></div>
           </div>
        )}
      </div>
    </div>
  );
}
