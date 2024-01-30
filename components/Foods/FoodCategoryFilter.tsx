"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FoodCategoryFilterProps } from "@/types";
import useCreateQueryString from "@/components/Hooks/useCreateQueryString";
import styles from "@/styles/categoryButtons.module.scss";

const FoodCategoryFilter = ({
  categoryId,
  categoryList,
}: FoodCategoryFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
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
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (selectedCategoryId === "all") {
      current.delete("categoryId");
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
    }

    if (selectedCategoryId && selectedCategoryId !== "all") {
      router.push(`/?${createQueryString("categoryId", selectedCategoryId)}`);
    }
  }, [selectedCategoryId, createQueryString, pathname, router, searchParams]);

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
