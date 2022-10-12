/* eslint-disable @next/next/no-img-element */
import React from "react";
import { CoinIcon } from "../atoms/vectors";

const TotalEarningCard = () => {
  return (
    <div className="total-earning-card-wrapper">
      <div className="total-earning-details">
        <img src="/images/Dreamy-ape.png" alt="user-img" />
        <div className="total-earning-transaction-details">
          <p className="total-earning-transaction-detail">
            You sold{" "}
            <span className="total-earning-transaction-detail-receiver">
              CloneX#5454
            </span>{" "}
            to
            <span className="text-white"> jakes</span>
          </p>
          <div className="total-earning-transaction-date-time">
            <span className="total-earning-transaction-date">02/09/2022,</span>
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

export default TotalEarningCard;
