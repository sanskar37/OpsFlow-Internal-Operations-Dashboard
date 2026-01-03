import { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { TopBar } from '@/components/layout/TopBar';
import { ItemsTable } from '@/components/items/ItemsTable';
import { ItemsFilters } from '@/components/items/ItemsFilters';
import { ItemModal } from '@/components/items/ItemModal';
import { DeleteConfirmDialog } from '@/components/items/DeleteConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { TableSkeleton } from '@/components/ui/TableSkeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { itemsStore } from '@/lib/items-store';
import { Item, ItemFormData, ItemStatus } from '@/types/item';

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ItemStatus | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deletingItem, setDeletingItem] = useState<Item | null>(null);
  
  const { toast } = useToast();

  const loadItems = () => {
    setItems(itemsStore.getAll());
  };

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      loadItems();
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    return itemsStore.filter(search, statusFilter);
  }, [items, search, statusFilter]);

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: Item) => {
    setDeletingItem(item);
  };

  const handleSubmit = (data: ItemFormData) => {
    if (editingItem) {
      itemsStore.update(editingItem.id, data);
      toast({
        title: 'Item updated',
        description: `"${data.title}" has been updated successfully.`,
      });
    } else {
      itemsStore.create(data);
      toast({
        title: 'Item created',
        description: `"${data.title}" has been created successfully.`,
      });
    }
    loadItems();
  };

  const handleConfirmDelete = () => {
    if (deletingItem) {
      itemsStore.delete(deletingItem.id);
      toast({
        title: 'Item deleted',
        description: `"${deletingItem.title}" has been deleted.`,
      });
      loadItems();
      setDeletingItem(null);
    }
  };

  return (
    <AppLayout>
      <TopBar 
        title="Items" 
        showCreateButton 
        onCreateClick={handleCreate}
      />
      
      <div className="p-6 space-y-6">
        <ItemsFilters
          search={search}
          onSearchChange={setSearch}
          status={statusFilter}
          onStatusChange={setStatusFilter}
        />

        {isLoading ? (
          <TableSkeleton rows={5} columns={5} />
        ) : filteredItems.length === 0 ? (
          <EmptyState
            title={search || statusFilter !== 'All' ? 'No items found' : 'No items yet'}
            description={
              search || statusFilter !== 'All'
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating your first operational item.'
            }
            action={
              !search && statusFilter === 'All' && (
                <Button onClick={handleCreate} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Item
                </Button>
              )
            }
          />
        ) : (
          <ItemsTable
            items={filteredItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ItemModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        item={editingItem}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={!!deletingItem}
        onOpenChange={(open) => !open && setDeletingItem(null)}
        onConfirm={handleConfirmDelete}
        itemTitle={deletingItem?.title || ''}
      />
    </AppLayout>
  );
}
