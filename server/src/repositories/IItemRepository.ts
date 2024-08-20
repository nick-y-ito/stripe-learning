import { Item } from '@/types/itemType';

export interface IItemRepository {
  getItemById(id: string): Item | null;
}
