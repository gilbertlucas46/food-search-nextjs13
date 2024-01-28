// app/actions/fetchCategories.ts
"use server";

import { Category } from "@/types/index";

interface FetchCategoriesOptions {
  apiUrl: string | undefined;
}

export async function fetchCategories(
  options: FetchCategoriesOptions
): Promise<Category[] | null> {
  const { apiUrl } = options;

  // Check if apiUrl is provided
  if (!apiUrl) {
    console.error("Error: apiUrl is required for fetching categories");
    return null;
  }

  try {
    const response = await fetch(apiUrl as string);
    const data: Category[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}
