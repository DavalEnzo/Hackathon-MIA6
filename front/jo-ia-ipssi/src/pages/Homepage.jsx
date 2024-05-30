import RankingChartPrediction from "../components/RankingChartPrediction";
import RankingPrediction from "../components/RankingPrediction";
import PieChartPrediction from "../components/PieChartPrediction";
import ParallaxComponent from "../components/ParallaxComponent";
import Layout from "../components/Layout";
import TextHome from "../components/TextHome";

export default function Homepage() {
  return (
    <Layout>
      <TextHome />
      <ParallaxComponent />
      <div className="container mt-5">
        <div className="row">
          <h1 className="text-center">Prédictions JO 2024</h1>

          <div className="col-12 mt-5">
            <RankingChartPrediction />
          </div>

          <div className="col-12 col-md-6 mt-5">
            <RankingPrediction />
          </div>

          <div className="col-12 col-md-6 mt-5">
            <PieChartPrediction />
          </div>
        </div>
      </div>
    </Layout>
  );
}
