import Image from "next/image";
import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { ConnectWalletTab } from ".";
import {
  CoinIcon,
  SwapArrowIcon,
  SwapIcon,
  UniSwapGuardIcon,
} from "../../components/atoms/vectors";
import { Button } from "../atoms";

interface IPropsSwap {
  ethValue: string;
  setEthValue: Dispatch<SetStateAction<string>>;
  wETHvalue: string;
  setWETHvalue: Dispatch<SetStateAction<string>>;
  handleEthSwap: () => void;
}

const SwapCard = ({
  ethValue,
  wETHvalue,
  setEthValue,
  setWETHvalue,
  handleEthSwap,
}: IPropsSwap) => {
  const [activeOfferTab, SetActiveOfferTab] = useState(0);
  const offerTab = [
    { text: "Swap for wETH", icon: SwapIcon },
    { text: "Deposit Crypto", icon: SwapIcon },
  ];

  const handleEthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEthValue(e.target.value);
  };

  const handleWETHvalue = (e: ChangeEvent<HTMLInputElement>) => {
    setWETHvalue(e.target.value);
  };
  return (
    <div className="">
      <ConnectWalletTab
        tabs={offerTab}
        activeTab={activeOfferTab}
        setActiveTab={SetActiveOfferTab}
        tabWT="w-full justify-evenly"
      />
      <div className="px-10 pt-14">
        {activeOfferTab === 0 ? (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-y-6 md:gap-x-6 mb-2">
              <div>
                <span className="font-medium ">Swap</span>
                <div className="mt-2 border border-border-1-line rounded-xl px-12 flex flex-col items-center gap-y-6 py-6">
                  <input
                    className="text-4xl font-medium w-[8rem] text-center"
                    value={ethValue}
                    onChange={handleEthChange}
                  />

                  <div className="flex items-center gap-x-3 py-3 px-12 bg-bg-6 rounded-full font-medium">
                    <CoinIcon /> ETH
                  </div>
                </div>
              </div>
              <span className="py-4 px-6 bg-bg-6 rounded-full">
                <SwapArrowIcon />
              </span>
              <div>
                <span className="font-medium">For</span>
                <div className="mt-2 border border-border-1-line rounded-xl px-12 flex flex-col items-center gap-y-6 py-6">
                  <input
                    className="text-4xl font-medium w-[8rem] text-center"
                    value={wETHvalue}
                    onChange={handleWETHvalue}
                  />
                  <div className="flex items-center gap-x-3 py-3 px-12 bg-bg-6 rounded-full font-medium">
                    <CoinIcon /> wETH
                  </div>
                </div>
              </div>
            </div>
            {/*Below Swap Wrap*/}
            <span className="font-medium">Insufficient ETH Balance</span>
            <div className="mt-10">
              <Button
                title="Swap for Wrap ETH"
                wt="w-full"
                onClick={handleEthSwap}
              />
              <p className="text-center font-medium mt-5 text-txt-2 flex items-center justify-center">
                <UniSwapGuardIcon />
                Powered by the Uniswap Protocol
              </p>
            </div>
          </div>
        ) : activeOfferTab === 1 ? (
          <div>
            <div className="flex flex-col items-center">
              <div className="relative w-[9rem] h-[10rem]">
                <Image
                  src="/images/wwcc.webp"
                  alt="wallet with credit card"
                  layout="fill"
                />
              </div>
              <p className="text-center mt-10 mx-auto w-[80%]">
                Transfer funds from an exchange or another wallet to your wallet
                address below:
              </p>
            </div>
            <div className="flex gap-x-6 mt-12">
              <span className="w-[80%] font-bold py-4 pl-6 rounded-lg bg-bg-6">
                0xdE8cFsgre5y454754h545uu5u4u5u1C79
              </span>
              <Button title="Copy" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SwapCard;
