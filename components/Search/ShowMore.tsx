"use client";
import { useState, useEffect } from "react";
import { QueryFoodResult, ShowMoreProps } from "@/types";
import Foods from "@/components/Foods/Foods";
import { queryFood } from "@/app/actions/fetchFood";
import { CardWrapper } from "@/components/UI/Card";
import cardStyles from "@/styles/card.module.scss";
import buttonStyles from "@/styles/buttons.module.scss";
import { Button } from "@/components/UI/Buttons";

export function ShowMore({
  search,
  initialFoods,
  totalPages,
  categoryId,
  categories,
}: ShowMoreProps) {
  const [foods, setFoods] = useState(initialFoods);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState<number | undefined>(totalPages);

  const selectedCategory = categories
    ?.filter((category) => category.id === categoryId)
    .map((item) => item.name)[0];

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

  return (
    <div data-testid="showmore-component">
      <CardWrapper
        className={cardStyles["cards__wrapper"]}
        data-testid="foods-component"
      >
        <Foods foods={foods.data} category={selectedCategory} search={search} />
      </CardWrapper>
      {maxPages !== undefined && page < maxPages && (
        <Button
          className={[
            buttonStyles["button--hollow"],
            buttonStyles["button--yellow"],
            buttonStyles["button--align-center"],
          ].join(" ")}
          onClick={() => ShowMoreFoods()}
        >
          Show More
        </Button>
      )}
    </div>
  );
}
