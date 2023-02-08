import Image from "next/image";
import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { ConnectWalletTab } from ".";
import {
  CoinIcon,
  SwapArrowIcon,
  SwapIcon,
  UniSwapGuardIcon,
} from "../../components/atoms/vectors";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../atoms";
import {
  getWalletBalance,
  swapEthforWEth,
} from "@/src/functions/onChain/generalFunction";
import { swapWEthforEth } from "@/src/functions/onChain/generalFunction";
import { getWalletWEthBalance } from "@/src/functions/onChain/generalFunction";
import { connectedAccount } from "@/src/functions/onChain/authFunction";

interface IPropsSwap {
  ethValue: number;
  setEthValue: Dispatch<SetStateAction<number>>;
  wETHvalue: string;
  setWETHvalue: Dispatch<SetStateAction<string>>;
  handleShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  connectedAddress: string;
}

const SwapCard = ({
  ethValue,
  wETHvalue,
  setEthValue,
  setWETHvalue,
  handleShowModal,
  connectedAddress,
}: IPropsSwap) => {
  const [activeOfferTab, SetActiveOfferTab] = useState(0);
  const [isTransloading, setIsTransLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const offerTab = [
    { text: "Swap for wETH", icon: SwapIcon },
    { text: "Deposit Crypto", icon: SwapIcon },
  ];

  const handleEthChange = (e: ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    setEthValue(e.target.value);
  };

  const handleWETHvalue = (e: ChangeEvent<HTMLInputElement>) => {
    setWETHvalue(e.target.value);
  };

  const handleWEthSwap = () => {
    setIsTransLoading((prev) => !prev);
    if (ethValue != 0) {
      connectedAccount().then((response) => {
        console.log({ response });
        if (response !== null) {
          getWalletBalance(response).then((balance) => {
            const currentEthBal = balance.split(" ")[0];
            if (ethValue < Number(currentEthBal)) {
              swapEthforWEth(ethValue).then((res) => {
                toast.success(
                  "eth successfully converted to wEth, Please proceed with your transaction"
                );
                handleShowModal((prev) => !prev);
                setIsTransLoading((prev) => !prev);
              });
              return;
            } else {
              toast("Insufficent ETH");
              setIsTransLoading((prev) => !prev);
              return;
            }
          });
        } else {
          toast("Connect your wallet");
          setIsTransLoading((prev) => !prev);
          return;
        }
      });
    } else {
      // alert("You can't swap 0 eth")
      toast("You can't swap 0 eth");
      setIsTransLoading((prev) => !prev);
      return;
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(connectedAddress)
      .then(() => {
        toast.success("Your wallet address has been copied successfully");
      })
      .catch((error) => {
        toast.error("Failed to copy to clipboard: ", error);
      });
  };

  return (
    <div className="">
      <ToastContainer />
      <ConnectWalletTab
        tabs={offerTab}
        activeTab={activeOfferTab}
        setActiveTab={SetActiveOfferTab}
        tabWT="w-full justify-around"
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
                    value={ethValue}
                    onChange={handleWETHvalue}
                  />
                  <div className="flex items-center gap-x-3 py-3 px-12 bg-bg-6 rounded-full font-medium">
                    <CoinIcon /> wETH
                  </div>
                </div>
              </div>
            </div>
            {/*Below Swap Wrap*/}
            {/*Display this only when you insert insufficient amount of eth in the value field*/}
            <span className="font-medium">Insufficient ETH Balance</span>
            <div className="mt-10">
              <Button
                title="Swap for Wrap ETH"
                wt="w-full"
                onClick={handleWEthSwap}
                isDisabled={isTransloading}
              />
              <p className="text-center font-medium mt-5 text-txt-2 flex items-center justify-center gap-x-2">
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
            <div className="flex flex-col md:flex-row gap-y-6 md:gap-y-0 gap-x-6 mt-12 w-full">
              <span className="md:w-[80%] font-bold py-4 px-6 rounded-lg bg-bg-6 truncate">
                {connectedAddress}
              </span>
              <Button
                title="Copy"
                wt="  w-full md:w-[40%]"
                isDisabled={isTransloading}
                onClick={handleCopyToClipboard}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SwapCard;
