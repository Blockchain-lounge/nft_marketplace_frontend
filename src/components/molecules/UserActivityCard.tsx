/* eslint-disable @next/next/no-img-element */
import React from "react";
import { CoinIcon } from "../atoms/vectors";
import * as moment from 'moment';

const UserActivityCard = ({
listed_item,
user,
created_item,
activity_type,
createdAt
}:{
user: string;
listed_item: string;
created_item: string;
activity_type: string;
createdAt : string
}) => {
var item =null;
var item_price =null;
var activityType =null;

  if(listed_item && listed_item !== null){
    item = listed_item
    item_price = listed_item.listing_price
  }
  if(created_item && created_item !== null){
    item = created_item;
    item_price = created_item.item_price
  }

    switch (activity_type) {
        case "newly_created_item":
            activityType = "item created";
            break;

        case "updated_item":
            activityType = "item updated";
            break;

        case "newly_listed_item":
            activityType = "item listed";
            break;

        case "updated_listing":
            activityType = "listing updated";
            break;

        case "new_mint":
            activityType = "item minted";
            break;

        case "new_sales":
            activityType = "item sold";
            break;
        case "cancelled_listing":
            activityType = "item cancelled";
            break;

        default:
        // code block
    }
  return (
    <div className="profile-activity-list">
          <div className="profile-activity-item">
            <img src="/images/profile-nft.png" alt="coin-img" />
            <div className="profile-activity-coin-info-wrapper">
              <span className="text-[1.375rem] font-bold">CloneX #4537</span>
              <span className="profile-activity-coin-tx-type text-txt-2">
                {activityType}</span>
            </div>
          </div>

          <div className="profile-activity-price-wrapper">
            <span className="profile-activity-coin-price">
              <CoinIcon /> {item_price} ETH
            </span>
            {/* <span className="profile-activity-amount text-txt-2">$5,954,532</span> */}
          </div>

          <div className="profile-activity-sender-wrapper">
            <img src={
              user.userBannerImg
              && user.userBannerImg !== undefined
              ? user.userBannerImg
              : "/images/ape.png"
              } 
              alt="sender-img" />
            <span className="profile-activity-sender">
              {
                user.username
                && user.username !== undefined
                ? user.username
                : ""
                }
            </span>
          </div>

          <div className="profile-activity-receiver-wrapper">
            <div className="profile-activity-receiver">
              <img src="/images/hero-dashboard.jpg" alt="receiver-img" />
              <span>0xf7ec…952d</span>
            </div>
            <span className="profile-activity-receiver-time text-txt-1">
              {
                moment(createdAt).format('ddd, MMM Do YYYY, hh:mm:ss')
                }
            </span>
          </div>
    </div>
  );
};

export default UserActivityCard;
