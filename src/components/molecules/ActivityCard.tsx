/* eslint-disable @next/next/no-img-element */
import React from "react";
import { CoinIcon } from "../atoms/vectors";

const ActivityCard = () => {
  return (
    <div className="profile-activity-list">
      <div className="profile-activity-item">
        <img src="/images/profile-nft.png" alt="coin-img" />
        <div className="profile-activity-coin-info-wrapper">
          <span className="text-[1.375rem] font-bold">CloneX #4537</span>
          <span className="profile-activity-coin-tx-type text-txt-2">Sold</span>
        </div>
      </div>

      <div className="profile-activity-price-wrapper">
        <span className="profile-activity-coin-price">
          <CoinIcon /> 4.5k
        </span>
        <span className="profile-activity-amount text-txt-2">$5,954,532</span>
      </div>

      <div className="profile-activity-sender-wrapper">
        <img src="/images/ape.png" alt="sender-img" />
        <span className="profile-activity-sender">0xf7ec…952d</span>
      </div>

      <div className="profile-activity-receiver-wrapper">
        <div className="profile-activity-receiver">
          <img src="/images/hero-dashboard.jpg" alt="receiver-img" />
          <span>0xf7ec…952d</span>
        </div>
        <span className="profile-activity-receiver-time text-txt-1">
          1 hour ago
        </span>
      </div>
    </div>
  );
};

export default ActivityCard;
