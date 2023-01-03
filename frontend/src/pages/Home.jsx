import Cards from "@components/Cards";
import datas from "@services/datas";
import axios from "axios";
import Layout from "./Layout";

export default function Home() {
  axios
    .get("http://localhost:5500/api/items", {
      withCredentials: true,
    })
    .then((res) => console.warn(res.data));
  return (
    <Layout>
      <header className="my-10">
        <h1 className="text-4xl font-bold">Bienvenue !</h1>
        <h2 className="text-2xl font-bold">
          Ici, vous pouvez archiver toutes vos BD, livres, mangas !
        </h2>
      </header>
      <Cards data={datas} home />
    </Layout>
  );
}
