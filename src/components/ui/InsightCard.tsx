import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  title: string;
  insight: string;
  recommendation?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

export function InsightCard({ title, insight, recommendation, variant = 'light', className }: InsightCardProps) {
  const isDark = variant === 'dark';
  
  return (
    <div className={cn(
      "p-4 rounded-2xl",
      isDark ? "bg-white/10 border border-white/10" : "card bg-gradient-to-br from-white to-teker-cyan/5 border-teker-cyan/20", 
      className
    )}>
      <div className="flex items-center gap-2 mb-2">
        {isDark ? null : <Sparkles className="h-4 w-4 text-teker-cyan shrink-0" />}
        <h4 className={cn("font-medium text-sm", isDark ? "text-teker-cyan" : "text-teker-primary")}>{title}</h4>
      </div>
      <p className={cn("text-xs leading-relaxed mb-3", isDark ? "text-white/80 italic" : "text-slate-600")}>
        {isDark ? `"${insight}"` : insight}
      </p>
      {recommendation && (
        <div className={cn("pt-3 mt-auto", isDark ? "" : "border-t border-teker-cyan/10")}>
          <p className={cn("text-xs font-medium", isDark ? "text-white" : "text-teker-primary")}>
            <span className={cn("font-normal mr-1", isDark ? "text-white/60" : "text-slate-500")}>Recomendación:</span>
            {recommendation}
          </p>
        </div>
      )}
    </div>
  );
}
