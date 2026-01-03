import { cn } from '@/lib/utils';
import { ItemStatus } from '@/types/item';

interface StatusBadgeProps {
  status: ItemStatus;
  className?: string;
}

const statusStyles: Record<ItemStatus, string> = {
  'Open': 'bg-status-open/10 text-status-open border-status-open/20',
  'In Progress': 'bg-status-progress/10 text-status-progress border-status-progress/20',
  'Closed': 'bg-status-closed/10 text-status-closed border-status-closed/20',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
}
