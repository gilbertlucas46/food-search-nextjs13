import Image from "next/image";
import styles from "@/styles/page.module.css";
import { useQuery } from "./actions/fetch";

export default async function Home() {
  const filteredFoods = await useQuery({
    apiUrl: "https://run.mocky.io/v3/c75dc0d8-ad78-4b3d-b697-807a5ded8645",
    page: 2,
    perPage: 9,
    query: "p",
  });
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
