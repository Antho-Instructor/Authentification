import datas from "@services/datas";
import Cards from "@components/Cards";
import Layout from "./Layout";

export default function Books() {
  return (
    <Layout>
      <header className="my-5">
        <h1 className="text-4xl font-bold">Votre bibliothèque</h1>
      </header>
      <Cards data={datas} />
    </Layout>
  );
}
