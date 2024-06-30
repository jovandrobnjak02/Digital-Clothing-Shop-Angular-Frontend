import { ClothingColor } from "./clothing-color.model";
import { ClothingSize } from "./clothing-size.model";

export interface ClothingItem {
  id?: number; 
  itemName: string;
  type: string;
  manufacturer: string;
  createdAt: Date;  
  price: number;
  clothingSizes: ClothingSize[];
  sizes: string;
  colors: ClothingColor[];
}
