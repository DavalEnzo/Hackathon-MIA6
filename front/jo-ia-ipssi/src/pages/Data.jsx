import Layout from "../components/Layout";
import PieChart from "../components/PieChart";
import Ranking from "../components/Ranking";
import TableDataAthlete from "../components/TableDataAthlete";
import TableDataHost from "../components/TableDataHost";
import TableDataMedals from "../components/TableDataMedals";
import TrendChart from "../components/TrendChart";

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

          <div className="col-12 col-sm-6">
            <Ranking />
          </div>
          <div className="col-12 col-sm-6">
            <TrendChart />
          </div>
          <div className="col-12 col-sm-5 mx-auto">
            <PieChart />
          </div>
          <div className="col-12 mt-5">
            <p className="fw-bold fs-4">Athlètes</p>
            <TableDataAthlete />
            <small>72568 lignes</small>
          </div>
          <div className="col-12 mt-5">
            <p className="fw-bold fs-4">Hôtes</p>
            <TableDataHost />
            <small>53 lignes</small>
          </div>
          <div className="col-12 mt-5">
            <p className="fw-bold fs-4">Médailles</p>
            <TableDataMedals />
            <small>21703 lignes</small>
          </div>
        </div>
      </div>
    </Layout>
  );
}
