export interface Food {
  id: string;
  index: number;
  rating: number;
  promotion: string;
  isNew: boolean;
  categoryId: string;
  minCookTime: number;
  maxCookTime: number;
  restaurant: string;
  name: string;
  imageUrl: string;
}

export type Category = {
  id: string;
  name: string;
};

export interface ShowMoreProps {
  search: string | undefined;
  initialFoods: any; // Change 'any' to the actual type of initialFoods
  categoryId: string | undefined;
}
export interface FoodCategoryFilterProps {
  categoryId: string | undefined;
}
