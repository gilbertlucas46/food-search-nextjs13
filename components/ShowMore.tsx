"use client";

import { useState } from "react";
import { Food } from "@/types";
import Foods from "./Foods";
import { useQuery } from "@/app/actions/fetch";
import Spinner from "./ui/Spinner";

export function ShowMore() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [page, setPage] = useState(1);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const ShowMoreFoods = async () => {
    await delay(2000);
    const nextPage = (page % 7) + 1;
    const newProducts =
      (await useQuery({
        apiUrl: "https://run.mocky.io/v3/c75dc0d8-ad78-4b3d-b697-807a5ded8645",
        page: nextPage,
        perPage: 9,
        query: "",
      })) ?? [];

    setFoods((prevProducts: Food[]) => [...prevProducts, ...newProducts]);
    setPage(nextPage);
  };

  return (
    <>
      <Foods foods={foods} />
      <Spinner />
      <button onClick={() => ShowMoreFoods()}> show more</button>
    </>
  );
}
