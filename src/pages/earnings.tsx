import { EarningsCard } from "../components/molecules";
import EarningLayout from "../template/EarningLayout";

const EarningPage = () => {
  const usersEarning = [
    { label: "balance", coinsAmount: 158.3, remainingAmount: "383,154.42" },
    {
      label: "Total Earnings",
      coinsAmount: 298.3,
      remainingAmount: "383,154.42",
      history: "/total-earnings-history",
    },
    {
      label: "Amount withdrawn",
      coinsAmount: 68.3,
      remainingAmount: "383,154.42",
      history: "/total-withdrawn-history",
    },
  ];
  return (
    <EarningLayout
      title="Earnings"
      cta={{
        label: "Withdraw",
        to: "/total-earnings-history",
      }}
    >
      <div className="earnings-cards">
        {usersEarning.map((earning) => (
          <EarningsCard key={earning.label} {...earning} />
        ))}
      </div>
    </EarningLayout>
  );
};

export default EarningPage;
