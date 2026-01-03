import { Item, ItemFormData, ItemStatus } from '@/types/item';

const STORAGE_KEY = 'opsflow_items';

// Generate a simple unique ID
const generateId = (): string => {
  return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Initial seed data for demo purposes
const seedData: Item[] = [
  {
    id: 'item_1',
    title: 'Review Q4 financial reports',
    description: 'Complete review of quarterly financial statements and prepare summary for leadership.',
    status: 'Open',
    owner: 'Rohit Sharma',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'item_2',
    title: 'Update employee onboarding docs',
    description: 'Refresh onboarding documentation with new compliance requirements and updated policies.',
    status: 'In Progress',
    owner: 'Virat Kohli',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'item_3',
    title: 'Vendor contract renewal',
    description: 'Negotiate and finalize renewal terms with primary software vendor.',
    status: 'Open',
    owner: 'Hardik Pandya',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'item_4',
    title: 'IT security audit preparation',
    description: 'Gather all necessary documentation and access logs for upcoming security audit.',
    status: 'In Progress',
    owner: 'Jasprit Bumrah',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'item_5',
    title: 'Office supplies inventory',
    description: 'Complete quarterly inventory count and place reorder for depleted items.',
    status: 'Closed',
    owner: 'Rishabh Pant',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Initialize storage with seed data if empty
const initializeStorage = (): Item[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return seedData;
  }
  return JSON.parse(stored);
};

export const itemsStore = {
  getAll: (): Item[] => {
    return initializeStorage();
  },

  getById: (id: string): Item | undefined => {
    const items = initializeStorage();
    return items.find(item => item.id === id);
  },

  create: (data: ItemFormData): Item => {
    const items = initializeStorage();
    const newItem: Item = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    items.unshift(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return newItem;
  },

  update: (id: string, data: Partial<ItemFormData>): Item | undefined => {
    const items = initializeStorage();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return undefined;
    
    items[index] = { ...items[index], ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return items[index];
  },

  delete: (id: string): boolean => {
    const items = initializeStorage();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    items.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  },

  getStats: () => {
    const items = initializeStorage();
    return {
      total: items.length,
      open: items.filter(i => i.status === 'Open').length,
      inProgress: items.filter(i => i.status === 'In Progress').length,
      closed: items.filter(i => i.status === 'Closed').length,
    };
  },

  filter: (search: string, status: ItemStatus | 'All'): Item[] => {
    let items = initializeStorage();
    
    if (search) {
      const searchLower = search.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.owner.toLowerCase().includes(searchLower)
      );
    }
    
    if (status !== 'All') {
      items = items.filter(item => item.status === status);
    }
    
    return items;
  },
};
