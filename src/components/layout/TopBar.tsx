import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopBarProps {
  title: string;
  onCreateClick?: () => void;
  showCreateButton?: boolean;
}

export function TopBar({ title, onCreateClick, showCreateButton = false }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      
      {showCreateButton && (
        <Button onClick={onCreateClick} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Item
        </Button>
      )}
    </header>
  );
}
