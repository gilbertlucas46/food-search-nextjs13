"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Category, FoodCategoryFilterProps } from "@/types";
import useCreateQueryString from "@/components/Hooks/useCreateQueryString";
import { fetchCategories } from "@/app/actions/fetchCategories";
import styles from "@/styles/categoryButtons.module.scss";

const FoodCategoryFilter = ({ categoryId }: FoodCategoryFilterProps) => {
  // Get router and current search parameters
  const router = useRouter();
  const searchParams = useSearchParams();

  // track the initial render
  const initialRender = useRef(true);

  // Set an initial value for the selected category state
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categoryId || ""
  );

  // State for storing categories
  const [categories, setCategories] = useState<Category[]>([]);

  // Use the custom hook
  const createQueryString = useCreateQueryString();

  // Function to fetch categories from the API
  const fetchCategoriesFromApi = async () => {
    const data = await fetchCategories({
      apiUrl: "https://run.mocky.io/v3/b88ec762-2cb3-4015-8960-2839b06a7593",
    });

    if (data) {
      // Add the new category to the existing categories
      const allCategory = {
        id: "12345",
        name: "All",
      };

      setCategories([allCategory, ...data]);
    }
  };

  // handle URL update after initial render
  useEffect(() => {
    // Check if it's the initial render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    // Check if a category is selected, then update the URL
    if (selectedCategoryId) {
      router.push(`/?${createQueryString("categoryId", selectedCategoryId)}`);
    }
  }, [selectedCategoryId, createQueryString, router]);

  // Handler for category button click
  const handleCategoryClick = (id: string) => {
    setSelectedCategoryId(id);
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategoriesFromApi();
  }, []);
  return (
    <div className={styles["categorybuttons"]}>
      {categories.map((item) => {
        const selectedCategoryId = searchParams.get("categoryId");
        const isActive = item.id === selectedCategoryId;
        console.log(searchParams.get("categoryId"));
        return (
          <button
            key={item.id}
            className={`${
              isActive
                ? styles["active"]
                : selectedCategoryId === null && item.id === "12345"
                ? styles["active"]
                : ""
            }`}
            onClick={() => handleCategoryClick(item.id)}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default FoodCategoryFilter;
