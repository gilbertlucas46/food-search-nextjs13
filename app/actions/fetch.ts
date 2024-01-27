"use server";

import { Food } from "@/types/index";
interface UseQueryOptions {
  apiUrl: string | undefined;
  page?: number;
  perPage?: number;
  query?: string;
}

export async function useQuery(
  options: UseQueryOptions
): Promise<Food[] | null> {
  const { apiUrl, page = 1, perPage = 10, query } = options;

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

    // Apply case-insensitive partial match for restaurant name
    const filteredFoods = query
      ? data.foods.filter((food) =>
          food.restaurant.toLowerCase().includes(query.toLowerCase())
        )
      : data.foods;

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
