// components/Foods/FoodCategoryFilter.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const FoodCategoryFilter = ({
  categoryId,
}: {
  categoryId?: string;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
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
  const [categories, setCategories] = useState([]);

  // Function to fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://run.mocky.io/v3/b88ec762-2cb3-4015-8960-2839b06a7593"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // query string with updated category
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

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
  }, [searchParams, selectedCategoryId]);

  // Handler for category button click
  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <p>Filter by Category:</p>

      <div className="categorybuttons">
        {categories.map((item) => (
          <button key={item.id} onClick={() => handleCategoryClick(item.id)}>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FoodCategoryFilter;
