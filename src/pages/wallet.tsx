import Image from "next/image";
import React from "react";
import { EarningsCard } from "../components/molecules";
import EarningLayout from "../template/EarningLayout";

const Wallet = () => {
  return (
    <EarningLayout title="Wallet">
      <div className="h-[55vh] space-y-12">
        <div className="flex items-center gap-x-6 mt-8">
          <div className="relative h-20 w-20">
            <Image
              src="/icon-svg/metamask-icon-logo.svg"
              alt="meta-mask-logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <span className="text-[1.75rem] font-bold">0xdE8cF...1C79</span>
        </div>
        <div className="earnings-cards">
          <EarningsCard
            label="Balance"
            coinsAmount={158.3}
            remainingAmount="383,154.42"
          />
          <EarningsCard
            label="Transactions"
            coinsAmount={405}
            remainingAmount="383,154.42"
            history="/transactions"
          />
        </div>
      </div>
    </EarningLayout>
  );
};

export default Wallet;
