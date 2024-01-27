import Image from "next/image";
import styles from "@/styles/card.module.scss";
import { useQuery } from "./actions/fetch";
import Foods from "@/components/Foods";
import Spinner from "@/components/ui/Spinner";
import { ShowMore } from "@/components/ShowMore";

export default async function Home() {
  const filteredFoods = await useQuery({
    apiUrl: "https://run.mocky.io/v3/c75dc0d8-ad78-4b3d-b697-807a5ded8645",
    page: 1,
    perPage: 9,
  });

  return (
    <div className="container">
      <main>
        <div className={styles["cards__wrapper"]}>
          <Spinner />
          <Foods foods={filteredFoods} />
          <ShowMore />
        </div>
      </main>
    </div>
  );
}
