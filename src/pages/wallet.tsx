// @ts-nocheck
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { EarningsCard } from "../components/molecules";
import EarningLayout from "../template/EarningLayout";
import { getWalletBalance } from "../functions/onChain/generalFunction";
import { connectedAccount } from "../functions/onChain/authFunction";
const Wallet = () => {
  const [balanceInEth, setBalanceInEth] = useState("wallet");
  const [connectedAddress, setConnectedAddress] = useState(null);

  useEffect(() => {
    connectedAccount().then((response) => {
      if (response !== null) {
        setConnectedAddress(response);
      }

      if (connectedAddress !== null) {
        getWalletBalance(connectedAddress).then((response) => {
          setBalanceInEth(response);
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAddress, balanceInEth]);
  return (
    <EarningLayout title="Wallet">
      <div className="h-[80vh]  sm:h-[65vh] space-y-12 scrollbar-hide">
        <div className="flex items-center gap-x-6 mt-8">
          <div className="relative h-20 w-20">
            <Image
              src="/icon-svg/metamask-icon-logo.svg"
              alt="meta-mask-logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <span className="text-[1.75rem] font-bold">
            {connectedAddress !== undefined && connectedAddress !== null
              ? connectedAddress.substring(0, 5)
              : ""}
            ...
            {connectedAddress !== undefined && connectedAddress !== null
              ? connectedAddress.substring(37, 42)
              : ""}
          </span>
        </div>
        <div className="earnings-cards">
          <EarningsCard
            label="Balance"
            coinsAmount={balanceInEth}
            remainingAmount="0"
          />
          <EarningsCard label="Earnings" coinsAmount={0} remainingAmount="0" />
        </div>
      </div>
    </EarningLayout>
  );
};

export default Wallet;
