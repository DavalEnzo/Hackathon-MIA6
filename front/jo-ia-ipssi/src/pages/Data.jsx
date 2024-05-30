import Layout from "../components/Layout";
import PieChart from "../components/PieChart";
import Ranking from "../components/Ranking";
import RankingChart from "../components/RankingChart";
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
          <p className="text-center my-4">
            Pour préparer les données en vue de l'entraînement d'un modèle, nous
            avons entrepris un processus de nettoyage méticuleux en utilisant
            les bibliothèques Pandas et PySpark. Initialement, les données
            brutes ont été chargées et inspectées afin d'identifier les
            anomalies, les valeurs manquantes et les incohérences.
          </p>

          <div className="col-12 col-md-4">
            <p className="text-center">
              Classement des pays par total des médailles
            </p>
            <Ranking />
          </div>
          <div className="col-12 col-md-8">
            <p className="text-center">Top 20 des pays par médailles</p>
            <RankingChart />
          </div>
          <div className="col-12 col-md-8 mt-2">
            <p className="text-center">
              Nombre médailles par année aux JO
            </p>
            <TrendChart />
          </div>
          <div className="col-12 col-md-4 mx-auto">
            <p className="text-center">
              Top 10 des pays par total des médailles
            </p>
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
