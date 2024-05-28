import Layout from "../components/Layout";
import TableData from "../components/TableData";


export default function Data() {
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <h1 className="text-center">Jeu de données</h1>
          <div className="col-12 mt-5">
            <TableData />
          </div>
          <div className="col-12 mt-5">
            <TableData />
          </div>
        </div>
      </div>
    </Layout>
  );
}
