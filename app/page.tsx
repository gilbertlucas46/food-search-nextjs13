import Image from "next/image";
import styles from "@/styles/page.module.css";
import { fetchFoods } from "./actions/fetch-foods";

export default async function Home() {
  const foods = await fetchFoods(1, 10, "eve");
  console.log(foods, "=========================");
  return (
    <>
      <main className={styles.main}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia magni
        repellendus itaque minima ullam, quas quisquam exercitationem nesciunt
        commodi, quis temporibus libero consequuntur, natus cupiditate incidunt
        culpa in impedit odit.
      </main>
    </>
  );
}
