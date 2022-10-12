import { TotalEarningCard } from "@/src/components/molecules";
import EarningLayout from "@/src/template/EarningLayout";

const TotalEarningsHistory = () => {
  const totalEarningData = [
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "sell",
      coinName: "CloneX#5434",
      receiver: "0xb4d...002d",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "sell",
      coinName: "CloneX#5434",
      receiver: "0xb4d...002d",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "sell",
      coinName: "CloneX#5434",
      receiver: "0xb4d...002d",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "sell",
      coinName: "CloneX#5434",
      receiver: "0xb4d...002d",
    },
  ];
  return (
    <EarningLayout title="Earnings History">
      <div className="total-earnings-history-wrapper">
        {totalEarningData.map((value, i) => (
          <TotalEarningCard {...value} key={value.coinName + i + "#"} />
        ))}
      </div>
    </EarningLayout>
  );
};

export default TotalEarningsHistory;
