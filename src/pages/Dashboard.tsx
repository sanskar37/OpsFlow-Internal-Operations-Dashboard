import { useEffect, useState } from 'react';
import { LayoutDashboard, FolderOpen, Clock, CheckCircle } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { TopBar } from '@/components/layout/TopBar';
import { StatCard } from '@/components/ui/StatCard';
import { itemsStore } from '@/lib/items-store';

interface Stats {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, open: 0, inProgress: 0, closed: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setStats(itemsStore.getStats());
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout>
      <TopBar title="Dashboard" />
      
      <div className="p-6">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Overview of your operational items and their current status.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Items"
            value={isLoading ? 0 : stats.total}
            icon={<LayoutDashboard className="h-6 w-6 text-primary" />}
            iconClassName="bg-primary/10"
          />
          <StatCard
            title="Open"
            value={isLoading ? 0 : stats.open}
            icon={<FolderOpen className="h-6 w-6 text-status-open" />}
            iconClassName="bg-status-open/10"
          />
          <StatCard
            title="In Progress"
            value={isLoading ? 0 : stats.inProgress}
            icon={<Clock className="h-6 w-6 text-status-progress" />}
            iconClassName="bg-status-progress/10"
          />
          <StatCard
            title="Closed"
            value={isLoading ? 0 : stats.closed}
            icon={<CheckCircle className="h-6 w-6 text-status-closed" />}
            iconClassName="bg-status-closed/10"
          />
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/items"
              className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-lg hover:border-primary/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <FolderOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">View All Items</h3>
                  <p className="text-sm text-muted-foreground">Manage operational tasks</p>
                </div>
              </div>
            </a>
            
            <a
              href="/items"
              className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-lg hover:border-status-open/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-status-open/10 group-hover:bg-status-open/20 transition-colors">
                  <Clock className="h-5 w-5 text-status-open" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Open Items</h3>
                  <p className="text-sm text-muted-foreground">{stats.open} items need attention</p>
                </div>
              </div>
            </a>

            <a
              href="/settings"
              className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-lg hover:border-muted-foreground/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted group-hover:bg-muted/80 transition-colors">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure your workspace</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
