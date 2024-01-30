"use server";

import { Food, QueryFoodOptions, QueryFoodResult } from "@/types/index";

export async function queryFood(
  options: QueryFoodOptions
): Promise<QueryFoodResult> {
  const { apiUrl, page = 1, perPage = 9, query, categoryId } = options;

  // Check if apiUrl is provided
  if (!apiUrl) {
    console.error("Error: apiUrl is required for fetching data");
    return {
      data: null,
      totalPages: 0,
      loading: false,
      error: new Error("apiUrl is required"),
    };
  }

  try {
    // Set loading to true while fetching
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

    // Calculate total pages based on the unfiltered data length and perPage
    const totalPages = Math.ceil(data.foods.length / perPage);

    // Calculate start and end indices for pagination
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    // Extract the desired page of items after filtering
    const paginatedFoods = filteredFoods.slice(startIndex, endIndex);

    // Set loading to false and return data and totalPages
    return { data: paginatedFoods, totalPages, loading: false, error: null };
  } catch (error) {
    // Set loading to false and return error
    console.error("Error fetching data", error);
    return { data: null, totalPages: 0, loading: false, error: error as Error };
  }
}
