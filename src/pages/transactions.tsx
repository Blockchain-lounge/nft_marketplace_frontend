import { TotalEarningCard } from "@/src/components/molecules";
import EarningLayout from "@/src/template/EarningLayout";

const TransactionsPage = () => {
  const totalEarningData = [
    {
      imgUrl: "/images/nftsample2.png",
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
      imgUrl: "/images/nftsample2.png",
      transactionType: "sell",
      coinName: "CloneX#5434",
      receiver: "0xb4d...002d",
    },
    {
      imgUrl: "/images/nftsample2.png",
      transactionType: "sell",
      coinName: "CloneX#5434",
      receiver: "0xb4d...002d",
    },
    {
      imgUrl: "/images/nftSample3.png",
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
    <EarningLayout title="Transaction History">
      <div className="total-earnings-history-wrapper">
        {totalEarningData.map((value, i) => (
          <TotalEarningCard {...value} key={value.coinName + i + "#"} />
        ))}
      </div>
    </EarningLayout>
  );
};

export default TransactionsPage;
