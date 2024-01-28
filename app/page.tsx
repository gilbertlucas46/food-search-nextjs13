import styles from "@/styles/card.module.scss";
import { useQuery } from "./actions/fetch";
import { ShowMore } from "@/components/ShowMore";
import { CardWrapper } from "@/components/UI/Card";
import FoodsSearch from "@/components/Foods/FooodsSearch";
import { v4 as uuid } from "uuid";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const filteredFoods = await useQuery({
    apiUrl: "https://run.mocky.io/v3/c75dc0d8-ad78-4b3d-b697-807a5ded8645",
    query: search,
  });

  return (
    <div className="container">
      <main key={uuid()}>
        <FoodsSearch search={search} />
        {/* 
          Need to add dynamic key "key={uuid()}", this makes component look
          different every time.
          https://nextjs.org/docs/app/building-your-application/caching#router-cache
        */}
        <CardWrapper className={styles["cards__wrapper"]}>
          <ShowMore initialFoods={filteredFoods} search={search} />
        </CardWrapper>
      </main>
    </div>
  );
}
