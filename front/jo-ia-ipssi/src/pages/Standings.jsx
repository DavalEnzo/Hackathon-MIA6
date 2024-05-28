import Layout from "../components/Layout";
import RankingChart from "../components/RankingChart";

export default function Standings() {
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <h1 className="text-center">Classements</h1>

          <div className="col-12">
            <RankingChart />
          </div>
        </div>
      </div>
    </Layout>
  );
}
