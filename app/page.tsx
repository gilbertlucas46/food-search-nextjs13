import { queryFood } from "./actions/fetchFood";
import { ShowMore } from "@/components/Search/ShowMore";
import FoodsSearch from "@/components/Foods/FoodsSearch";
import { v4 as uuid } from "uuid";
import FoodCategoryFilter from "@/components/Foods/FoodCategoryFilter";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const categoryId =
    typeof searchParams.categoryId === "string"
      ? searchParams.categoryId
      : undefined;

  const filteredFoods = await queryFood({
    apiUrl: "https://run.mocky.io/v3/c75dc0d8-ad78-4b3d-b697-807a5ded8645",
    query: search,
    categoryId,
  });

  return (
    <div className="container">
      {/*
          Need to add dynamic key "key={uuid()}", this makes component look
          different every time.
          https://nextjs.org/docs/app/building-your-application/caching#router-cache
      */}
      <main key={uuid()}>
        <FoodsSearch search={search} />
        <FoodCategoryFilter categoryId={categoryId} />
        <ShowMore
          initialFoods={filteredFoods}
          search={search}
          categoryId={categoryId}
        />
      </main>
    </div>
  );
}
