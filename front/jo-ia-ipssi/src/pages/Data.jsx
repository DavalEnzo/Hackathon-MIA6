import Layout from "../components/Layout";
import TableDataAthlete from "../components/TableDataAthlete";
import TableDataHost from "../components/TableDataHost";

export default function Data() {
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <h1 className="text-center">Jeu de données</h1>
          <p className="text-center mt-4">
            Pour préparer les données en vue de l'entraînement d'un modèle, nous
            avons entrepris un processus de nettoyage méticuleux en utilisant
            les bibliothèques Pandas et PySpark. Initialement, les données
            brutes ont été chargées et inspectées afin d'identifier les
            anomalies, les valeurs manquantes et les incohérences.
          </p>
          <div className="col-12 mt-5">
            <p className="fw-bold fs-4">Athlètes</p>
            <TableDataAthlete />
            <small>Limite 200</small>
          </div>
          <div className="col-12 mt-5">
            <p className="fw-bold fs-4">Hôtes</p>
            <TableDataHost />
          </div>
        </div>
      </div>
    </Layout>
  );
}
