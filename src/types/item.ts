export type ItemStatus = 'Open' | 'In Progress' | 'Closed';

export interface Item {
  id: string;
  title: string;
  description: string;
  status: ItemStatus;
  owner: string;
  createdAt: string;
}

export interface ItemFormData {
  title: string;
  description: string;
  status: ItemStatus;
  owner: string;
}
