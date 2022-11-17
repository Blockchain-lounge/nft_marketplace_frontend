import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Button, Input2 } from "../components/atoms";
import { EarningsCard } from "../components/molecules";
import { Modal } from "../components/organisms";
import EarningLayout from "../template/EarningLayout";

const EarningPage = () => {
const [showModal, setShowModal] = useState(false);
const [modalType, setModalType] = useState(0);
const [amountToWihdraw, setAmountToWithdraw] = useState("");
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
history: "/total-withdrawal-history",
},
];

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
const { value } = e.currentTarget;

const newValue = Number(value).toFixed(2);
setAmountToWithdraw(newValue);
};
return (
<EarningLayout
title="Earnings"
cta={{
label: "Withdraw",
onClick: () => {
setShowModal((prev) => !prev);
},
}}
>
<div className="earnings-cards">
{usersEarning.map((earning) => (
<EarningsCard key={earning.label} {...earning} />
))}
</div>
<Modal
openModal={showModal}
closeModal={setShowModal}
noTop={modalType === 2 ? true : false}
title={modalType === 0 ? "Withdraw" : "Confirm withdrawal"}
modalWt={modalType === 0 ? "w-[40%]" : "w-[30rem]"}
>
<div className="">
{modalType === 0 ? (
<div className="flex flex-col gap-y-4 justify-center items-center">
<span className="text-lg">Enter amount to withdraw</span>
<div className="flex items-center justify-center gap-x-2 mb-4">
<span className="font-bold text-4xl block mr-2">ETH</span>
<input
type="text"
// step={0.01}
// value={}
placeholder="0.00"
onChange={handleChange}
className="font-bold text-4xl w-[20%]"
/>
</div>
<span className="text-4xl">{amountToWihdraw}</span>
<Button title="Withdraw" />
</div>
) : modalType === 1 ? (
<div className="flex flex-col gap-y-8 justify-center items-center">
<div className="relative h-20 w-20">
<Image
src="/icon-svg/metamask-icon-logo.svg"
alt="meta-mask-logo"
layout="fill"
objectFit="contain"
/>
</div>
<div className="w-[65%] flex justify-between items-center">
<div className="flex flex-col gap-y-4">
<span className="text-lg text-txt-2">Amount</span>
<span className="text-lg text-txt-2">Wallet address</span>
</div>

<div className="flex flex-col gap-y-4">
<span className="text-lg">{amountToWihdraw} ETH</span>
<span className="text-lg">0xb4d...002d</span>
</div>
</div>

<div className="flex justify-center flex-col gap-y-4">
<Button title="Confirm" />
<Button title="Cancel" outline />
</div>
</div>
) : modalType === 2 ? (
<div className="flex flex-col gap-y-8 justify-center items-center py-8">
<div className="h-32 w-32 relative">
<Image
src="/images/withdraw-success.svg"
alt="withdraw successful"
layout="fill"
/>
</div>

<p className="font-bold text-2xl max-w-xs text-center">
You have successfully withdrawn {amountToWihdraw} ETH
</p>

<Button title="Done" />
</div>
) : null}
</div>
</Modal>
</EarningLayout>
);
};

export default EarningPage;
