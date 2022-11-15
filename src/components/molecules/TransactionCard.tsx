import { ITransactionCard } from "@/src/utilities/types";
import Image from "next/image";
import React from "react";
import { CoinIcon } from "../atoms/vectors";

const TransactionCard = ({
  transactionType,
  imgUrl,
  address,
  user,
  collectionName,
  receiver,
  coinAmount = "4.5",
  amount = "5,954,532",
  date = "02/08/2022",
  time = "10:52",
}: // activity_type,
// ITransactionCard &
{
  transactionType: string;
  imgUrl: string;
  address?: string;
  collectionName?: string;
  receiver?: string;
  coinAmount?: string;
  amount?: string;
  date?: string;
  time?: string;
  user?: string;
}) => {
  return (
    <div className="total-earning-card-wrapper">
      <div className="total-earning-details">
        <div className="total-earning-details-img">
          <Image
            src={imgUrl ? imgUrl : ""}
            alt="user-img"
            layout="fill"
            className="rounded-full"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
          />
        </div>
        <div className="transaction-card">
          {transactionType === "listing" ? (
            <p className="transaction-card-p">
              {address}
              <span className="transaction-card-span"> listed for</span>
            </p>
          ) : transactionType === "add" ? (
            <p className="transaction-card-p">
              {user}{" "}
              <span className="transaction-card-span">
                added a new collection
              </span>{" "}
              {`"${collectionName}"`}
            </p>
          ) : transactionType === "transfer" ? (
            <p className="transaction-card-p">
              {user}
              <span className="transaction-card-span">
                {" "}
                transferred to{" "}
              </span>{" "}
              {address}
            </p>
          ) : transactionType === "purchase" ? (
            <p className="transaction-card-p">
              {user}{" "}
              <span className="transaction-card-span"> purchased for</span>
            </p>
          ) : transactionType === "bid" ? (
            <p className="transaction-card-p">
              {address}{" "}
              <span className="transaction-card-span">accepted bid</span>
            </p>
          ) : null}

          <div className="total-earning-transaction-date-time">
            <span className="total-earning-transaction-date">02/09/2022,</span>{" "}
            <span className="total-earning-transaction-time">10:52</span>
          </div>
        </div>
      </div>
      <div className="total-earning-bal">
        <span className="total-earning-coin-sold">
          <CoinIcon /> 4.5k
        </span>
        <span className="total-earning-coin-sold-receiver">$5,954,532</span>
      </div>
    </div>
  );
};

export default TransactionCard;
