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
export interface QueryFoodOptions {
  apiUrl: string | undefined;
  page?: number;
  perPage?: number;
  query?: string;
  categoryId?: string; // Add categoryId parameter
}
export interface FetchCategoriesOptions {
  apiUrl: string | undefined;
}

export interface PromotionConfig {
  icon: React.ReactNode | null;
  content: string;
  cssClass: string;
}
export interface FoodProps {
  foods: Food[] | null;
}
