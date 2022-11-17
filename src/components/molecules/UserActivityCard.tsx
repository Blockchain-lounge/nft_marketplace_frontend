/* eslint-disable @next/next/no-img-element */
//@ts-nocheck
import React from "react";
import { CoinIcon } from "../atoms/vectors";
import * as moment from "moment";

const UserActivityCard = ({
listed_item,
to_user_id,
from_user_id,
created_item,
activity_type,
createdAt,
created_item_listed,
}:{
to_user_id: string;
from_user_id: string;
listed_item: string;
created_item: string;
created_item_listed: string;
activity_type: string;
createdAt : string;
}) => {
  var item = null;
  var item_price = null;
  var activityType = null;

  if (listed_item && listed_item !== null) {
    item = listed_item;
    item_price = listed_item.listing_price;
  }
  if (created_item && created_item !== null) {
    item = created_item;
    item_price = created_item.item_price;
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
            {
              created_item
              ?
                 <img src={
                  created_item
                  && created_item !== undefined
                  && created_item !== null
                  ?
                    created_item.item_art_url
                  :
              "/images/profile-nft.png"
              } alt="" />
              :
              ""
              }

              {
                listed_item
                ?
                <img src={
                  listed_item
                  && listed_item !== undefined
                  && listed_item !== null
                  && created_item_listed !== undefined
                  && created_item_listed !== null
                  ?
                    created_item_listed.item_art_url
                  :
              "/images/profile-nft.png"
              } alt="" />
:
""
                }
            <div className="profile-activity-coin-info-wrapper">
              <span className="text-[1.375rem] font-bold">
                {
                  created_item
                  && created_item !== undefined
                  && created_item !== null
                  ?
                  created_item.item_title
                  :
                  ""
                }

                {
                  listed_item
                  && listed_item !== undefined
                  && listed_item !== null
                  && created_item_listed !== undefined
                  && created_item_listed !== null
                  ?
                  created_item_listed.item_title
                  :
                  ""
                }
              </span>
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
              {
              to_user_id
              && to_user_id !== undefined
              ?
              <img src=
                {
                  to_user_id
                    && to_user_id !== undefined
                    && to_user_id.userBannerImg !== undefined
                    ? to_user_id.userBannerImg
                    :
                  "/images/hero-dashboard.jpg"
                } alt="" />
:
"--"
}
                {
              to_user_id
              && to_user_id !== undefined
              ?
              <span>
              {
                to_user_id
                      && to_user_id !== undefined
                      && to_user_id.username
                      && to_user_id.username !== undefined
                      ? to_user_id.username
                      : ""
                      }
                      </span>
              :
"--"
}
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
