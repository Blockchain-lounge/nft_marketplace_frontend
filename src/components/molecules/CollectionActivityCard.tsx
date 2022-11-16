/* eslint-disable @next/next/no-img-element */
//@ts-nocheck
import React from "react";
import { CoinIcon } from "../atoms/vectors";
import * as moment from "moment";

const CollectionActivityCard = ({
collection_id,
from_user_id,
activity_type,
createdAt,
}:{
from_user_id: string;
collection_id: string;
activity_type: string;
createdAt : string;
}) => {
  var activityType = '';
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
       case "newly_created_collection":
      activityType = "item collection created";
      break;
       case "newly_updated_collection":
      activityType = "item collection updated";
      break;

    default:
    // code block
  }
  return (
    <div className="profile-activity-list">
          <div className="profile-activity-item">
            {
              collection_id
              ?
                 <img src={
                  collection_id
                  && collection_id !== undefined
                  && collection_id !== null
                  ?
                    collection_id.collectionLogoImage
                  :
              "/images/profile-nft.png"
              } alt="" />
              :
              ""
              }
            <div className="profile-activity-coin-info-wrapper">
              <span className="text-[1.375rem] font-bold">
                {
                  collection_id
                  && collection_id !== undefined
                  && collection_id !== null
                  ?
                  collection_id.name
                  :
                  ""
                }
              </span>
              <span className="profile-activity-coin-tx-type text-txt-2">
                {activityType}
              </span>
            </div>
          </div>


      <div className="profile-activity-price-wrapper">
        {/* <span className="profile-activity-coin-price"> */}
        {/*   <CoinIcon /> {item_price} ETH */}
        {/* </span> */}
        {/* <span className="profile-activity-amount text-txt-2">$5,954,532</span> */}
      </div>

          <div className="profile-activity-sender-wrapper">
            {
              from_user_id
              && from_user_id !== undefined
              ?
                    <img src={
                    from_user_id
                    && from_user_id !== undefined
                    && from_user_id.userBannerImg !== undefined
                    ? from_user_id.userBannerImg
                    : "/images/ape.png"
                    } 
                    alt="" />
                    :
                    "--"
                    }

                    {
              from_user_id
              && from_user_id !== undefined
              ?
                  <span className="profile-activity-sender">
                    {
                      from_user_id
                      && from_user_id !== undefined
                      && from_user_id.username
                      && from_user_id.username !== undefined
                      ? from_user_id.username
                      : ""
                      }
                  </span>
                  :
                  "--"
                  }
            
          </div>

          <div className="profile-activity-receiver-wrapper">
            <div className="profile-activity-receiver">
              ----
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

export default CollectionActivityCard;
