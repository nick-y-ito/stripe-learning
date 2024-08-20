import { itemsData } from '@/data/itemsData';
import { IItemRepository } from '@/repositories/IItemRepository';
import { Item } from '@/types/itemType';

export class ItemRepository implements IItemRepository {
  getItemById(id: string): Item | null {
    return itemsData.find((item) => item.id === id) || null;
  }
}
