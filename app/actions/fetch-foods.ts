// app/actions/fetch-foods.ts
"use strict";
import { Food } from "@/types/index";

export async function fetchFoods(
  page: number,
  perPage: number,
  restaurantSearch?: string
): Promise<Food[] | null> {
  const apiUrl = "https://run.mocky.io/v3/c75dc0d8-ad78-4b3d-b697-807a5ded8645";

  try {
    const response = await fetch(apiUrl);
    const data: { foods: Food[] } = await response.json();

    // Apply case-insensitive partial match for restaurant name
    const filteredFoods = restaurantSearch
      ? data.foods.filter((food) =>
          food.restaurant.toLowerCase().includes(restaurantSearch.toLowerCase())
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
