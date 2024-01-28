// components/ShowMore.tsx
"use client";

import { useState } from "react";
import { Food, ShowMoreProps } from "@/types";
import Foods from "./Foods/Foods";
import { queryFood } from "@/app/actions/fetch-food";
import Spinner from "./UI/Spinner";
import { CardWrapper } from "./UI/Card";
import styles from "@/styles/card.module.scss";

export function ShowMore({ search, initialFoods, categoryId }: ShowMoreProps) {
  const [foods, setFoods] = useState(initialFoods);
  const [page, setPage] = useState(1);

  const ShowMoreFoods = async () => {
    const nextPage = (page % 7) + 1;
    const newFoodItems =
      (await queryFood({
        apiUrl: "https://run.mocky.io/v3/c75dc0d8-ad78-4b3d-b697-807a5ded8645",
        page: nextPage,
        perPage: 9,
        query: search,
        categoryId: categoryId, // Use the state variable here
      })) ?? [];

    setFoods((prevFoods: Food[]) => [...prevFoods, ...newFoodItems]);
    setPage(nextPage);
  };

  return (
    <>
      <CardWrapper className={styles["cards__wrapper"]}>
        <Foods foods={foods} />
      </CardWrapper>
      <Spinner />
      <button onClick={() => ShowMoreFoods()}> show more</button>
    </>
  );
}
