import Image from "next/image";
import styles from "@/styles/page.module.scss";
import { useQuery } from "./actions/fetch";
import Foods from "@/components/Foods";

export default async function Home() {
  const filteredFoods = await useQuery({
    apiUrl: "https://run.mocky.io/v3/c75dc0d8-ad78-4b3d-b697-807a5ded8645",
    page: 1,
    perPage: 9,
    query: "Par",
  });
  console.log(filteredFoods);
  return (
    <>
      <main className={styles.main}>
        <Foods foods={filteredFoods} />
      </main>
    </>
  );
}
