"use client";

import { useState } from "react";
import { Food } from "@/types";
import Foods from "./Foods/Foods";
import { useQuery } from "@/app/actions/fetch";
import Spinner from "./UI/Spinner";

export function ShowMore({ search, initialFoods }) {
  const [foods, setFoods] = useState(initialFoods);
  const [page, setPage] = useState(1);

  const ShowMoreFoods = async () => {
    const nextPage = (page % 7) + 1;
    const newProducts =
      (await useQuery({
        apiUrl: "https://run.mocky.io/v3/c75dc0d8-ad78-4b3d-b697-807a5ded8645",
        page: nextPage,
        perPage: 9,
        query: "",
      })) ?? [];

    setFoods((prevProducts) => [...prevProducts, ...newProducts]);
    setPage(nextPage);
  };

  console.log(foods);

  return (
    <>
      <Foods foods={foods} />
      <Spinner />
      <button onClick={() => ShowMoreFoods()}> show more</button>
    </>
  );
}
