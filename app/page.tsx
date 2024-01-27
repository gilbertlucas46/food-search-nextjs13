import Image from "next/image";
import styles from "@/styles/page.module.scss";
import { useQuery } from "./actions/fetch";
import Foods from "@/components/Foods";

export default async function Home() {
  const filteredFoods = await useQuery({
    apiUrl: process.env.FOODS_API,
    page: 1,
    perPage: 9,
  });

  return (
    <div className="container">
      <main className={styles.main}>
        <Foods foods={filteredFoods} />
      </main>
    </div>
  );
}
