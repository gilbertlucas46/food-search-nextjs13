import styles from "@/styles/card.module.scss";
import { useQuery } from "./actions/fetch";
import Foods from "@/components/Foods";
import { ShowMore } from "@/components/ShowMore";
import { CardWrapper } from "@/components/ui/Card";

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
      <main>
        <CardWrapper className={styles["cards__wrapper"]}>
          <ShowMore initialFoods={filteredFoods} search={search} />
        </CardWrapper>
      </main>
    </div>
  );
}
