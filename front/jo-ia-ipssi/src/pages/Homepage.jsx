import Ranking from "../components/Ranking";
import RankingChart from "../components/RankingChart";
import TrendChart from "../components/TrendChart";
import PieChart from "../components/PieChart";
import ParallaxComponent from "../components/ParallaxComponent";

import Layout from "../components/Layout";
import MapPositionTorch from "../components/MapPositionTorch";
import TextHome from "../components/TextHome";

export default function Homepage() {
  return (
    <Layout>
      <TextHome />
      <ParallaxComponent />
      <div className="container">
        <div className="row my-5">
          <div className="col-12 col-sm-6 col-xxl-4 mt-4">
            <Ranking />
          </div>
          <div className="col-12 col-sm-6 col-xxl-4 mt-4">
            <RankingChart />
          </div>
          <div className="col-12 col-sm-6 col-xxl-4 mt-4">

            <PieChart />

          </div>
        </div>
      </div>

      <div className="container">
        <div className="row my-5">
          <div className="col-12 col-sm-6 col-xxl-4 mt-4">
            <TrendChart />
          </div>
          <div className="col-12 col-sm-6 col-xxl-4 mt-4">
            <RankingChart />
          </div>
          <div className="col-12 col-sm-6 col-xxl-4 mt-4">
            <RankingChart />
          </div>
        </div>
      </div>
    </Layout>
  );
}
