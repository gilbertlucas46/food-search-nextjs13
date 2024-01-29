// components/ShowMore.tsx
"use client";
import { useState, useEffect } from "react";
import { QueryFoodResult, ShowMoreProps } from "@/types";
import Foods from "@/components/Foods/Foods";
import { queryFood } from "@/app/actions/fetchFood";
import Spinner from "@/components/UI/Spinner";
import { CardWrapper } from "@/components/UI/Card";
import styles from "@/styles/card.module.scss";

export function ShowMore({
  search,
  initialFoods,
  totalPages,
  categoryId,
}: ShowMoreProps) {
  const [foods, setFoods] = useState(initialFoods);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState<number | undefined>(totalPages);

  const ShowMoreFoods = async () => {
    try {
      // Use destructuring to get the data property from the result
      const { data, totalPages } = (await queryFood({
        apiUrl: "https://run.mocky.io/v3/c75dc0d8-ad78-4b3d-b697-807a5ded8645",
        page: page,
        perPage: 9,
        query: search,
        categoryId: categoryId,
      })) ?? { data: null, totalPages: 0 };

      // Check if there's data
      if (data) {
        setFoods((prevFoods: QueryFoodResult) => ({
          ...prevFoods,
          data: [...(prevFoods?.data || []), ...data],
        }));
        setPage(page + 1);
        setMaxPages(totalPages);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  // console.log(foods, maxPages, page);

  return (
    <>
      <CardWrapper className={styles["cards__wrapper"]}>
        <Foods foods={foods.data} />
      </CardWrapper>
      <Spinner />
      {maxPages !== undefined && page < maxPages && (
        <button onClick={() => ShowMoreFoods()}>Show More</button>
      )}
    </>
  );
}
