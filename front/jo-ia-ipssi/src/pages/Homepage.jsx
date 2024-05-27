import React from "react";
import Navbar from "../components/Head";
import Ranking from "../components/Ranking";
import RankingChart from "../components/RankingChart";
import TrendChart from "../components/TrendChart";
import PieChart from "../components/PieChart";


export default function Homepage() {
  return (
    <>
      <Navbar />

      <div className="container">
        <div className="row mt-5">
          <Ranking />
          <RankingChart />
          <TrendChart />
          <PieChart />
          <RankingChart />
          <RankingChart />
        </div>
      </div>
    </>
  );
}
