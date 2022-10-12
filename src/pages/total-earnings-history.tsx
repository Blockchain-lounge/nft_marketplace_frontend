import React from "react";
import { TotalEarningCard } from "../components/molecules";
import EarningLayout from "../template/EarningLayout";

const TotalEarningsHistory = () => {
  const totalEarningData = [1, 2, 3, 4];
  return (
    <EarningLayout title="Earnings History">
      <div className="total-earnings-history-wrapper">
        {totalEarningData.map((value) => (
          <TotalEarningCard key={value} />
        ))}
      </div>
    </EarningLayout>
  );
};

export default TotalEarningsHistory;
