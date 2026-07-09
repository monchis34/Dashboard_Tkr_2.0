import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, Info, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AlertLevel = 'critical' | 'warning' | 'info' | 'success';

interface AlertBannerProps {
  level: AlertLevel;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  className?: string;
}

const levelStyles: Record<AlertLevel, string> = {
  critical: 'bg-teker-error/10 border-teker-error text-teker-error alert-critical',
  warning: 'bg-teker-warning/10 border-teker-warning text-yellow-800',
  info: 'bg-teker-info/10 border-teker-info text-teker-info',
  success: 'bg-green-100 border-green-500 text-green-800',
};

const IconMap = {
  critical: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

export function AlertBanner({
  level,
  title,
  message,
  actionLabel,
  onAction,
  dismissible = true,
  className
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const Icon = IconMap[level];

  return (
    <div className={cn(
      "relative rounded-lg border p-4 flex items-start gap-3",
      levelStyles[level],
      className
    )}>
      <Icon className="h-5 w-5 mt-0.5 shrink-0" />
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="mt-1 text-sm opacity-90">{message}</p>
        
        {actionLabel && (
          <button 
            onClick={onAction}
            className="mt-3 text-sm font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {actionLabel}
          </button>
        )}
      </div>
      
      {dismissible && (
        <button 
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-md hover:bg-black/5 transition-colors shrink-0"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
