"use server";

import { Food } from "@/types/index";

interface QueryFoodOptions {
  apiUrl: string | undefined;
  page?: number;
  perPage?: number;
  query?: string;
  categoryId?: string; // Add categoryId parameter
}

export async function queryFood(
  options: QueryFoodOptions
): Promise<Food[] | null> {
  const { apiUrl, page = 1, perPage = 9, query, categoryId } = options;

  // Check if apiUrl is provided
  if (!apiUrl) {
    console.error("Error: apiUrl is required for fetching data");
    return null;
  }

  try {
    const response = await fetch(apiUrl as string, {
      next: { revalidate: 10 },
    });
    const data: { foods: Food[] } = await response.json();

    // Apply filtering based on both restaurant name and categoryId
    const filteredFoods = data.foods.filter((food) => {
      const matchesQuery =
        !query || food.restaurant.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !categoryId || food.categoryId === categoryId;

      return matchesQuery && matchesCategory;
    });

    // Calculate start and end indices for pagination
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    // Extract the desired page of items after filtering
    const paginatedFoods = filteredFoods.slice(startIndex, endIndex);

    return paginatedFoods;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
}
