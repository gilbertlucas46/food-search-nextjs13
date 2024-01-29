// components/Foods/FoodCategoryFilter.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Category, FoodCategoryFilterProps } from "@/types";
import useCreateQueryString from "@/components/Hooks/useCreateQueryString";
import styles from "@/styles/categoryButtons.module.scss";

const FoodCategoryFilter = ({
  categoryId,
  categoryList,
}: FoodCategoryFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRender = useRef(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categoryId || ""
  );
  const createQueryString = useCreateQueryString();

  const allCategory = {
    id: "all",
    name: "All",
  };

  const handleCategoryClick = (id: string) => {
    setSelectedCategoryId(id);
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (selectedCategoryId === "all") {
      router.push(`/`);
    }

    if (selectedCategoryId && selectedCategoryId !== "all") {
      router.push(`/?${createQueryString("categoryId", selectedCategoryId)}`);
    }
  }, [selectedCategoryId, createQueryString, router]);

  if (!categoryList) return;
  const categories = [allCategory, ...categoryList];

  return (
    <div className={styles["categorybuttons"]}>
      {categories?.map((item) => {
        const selectedCategoryId = searchParams.get("categoryId");
        const isActive = item.id === selectedCategoryId;

        return (
          <button
            key={item.id}
            className={`${
              isActive
                ? styles["active"]
                : selectedCategoryId === null && item.id === "all"
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
