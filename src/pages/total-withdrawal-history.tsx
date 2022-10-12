import { TotalEarningCard } from "@/src/components/molecules";
import EarningLayout from "@/src/template/EarningLayout";

const TotalWithdrawalHistory = () => {
  const totalWithdrawalData = [
    {
      imgUrl: "/images/Coinbase-logo.png",
      transactionType: "withdrawn",
      coinName: "CloneX#5434",
      receiver: "0xb4d...002d",
    },
    {
      imgUrl: "/images/Coinbase-logo.png",
      transactionType: "withdrawn",
      coinName: "CloneX#5434",
      receiver: "0xb4d...002d",
    },
    {
      imgUrl: "/images/Coinbase-logo.png",
      transactionType: "withdrawn",
      coinName: "CloneX#5434",
      receiver: "0xb4d...002d",
    },
    {
      imgUrl: "/images/Coinbase-logo.png",
      transactionType: "withdrawn",
      coinName: "CloneX#5434",
      receiver: "0xb4d...002d",
    },
    {
      imgUrl: "/images/Coinbase-logo.png",
      transactionType: "withdrawn",
      coinName: "CloneX#5434",
      receiver: "0xb4d...002d",
    },
    {
      imgUrl: "/images/Coinbase-logo.png",
      transactionType: "withdrawn",
      coinName: "CloneX#5434",
      receiver: "0xb4d...002d",
    },
  ];
  return (
    <EarningLayout title="Withdrawal History">
      <div className="total-earnings-history-wrapper">
        {totalWithdrawalData.map((value, i) => (
          <TotalEarningCard {...value} key={value.coinName + i} />
        ))}
      </div>
    </EarningLayout>
  );
};

export default TotalWithdrawalHistory;
