/* eslint-disable @next/next/no-img-element */
//@ts-nocheck
import React from "react";
import { CoinIcon } from "../atoms/vectors";
import * as moment from "moment";

const CollectionActivityCard = ({
collection_id,
created_item,
listed_item,
created_item_listed,
from_user_id,
to_user_id,
activity_type,
createdAt,
}:{
from_user_id: string;
to_user_id: string;
collection_id: string;
created_item: string;
listed_item: string;
created_item_listed: string;
activity_type: string;
createdAt : string;
}) => {
  var activityType = '';
  switch (activity_type) {
    case "newly_created_item":
      activityType = "created an item";
      break;

    case "updated_item":
      activityType = "updated an item";
      break;

    case "newly_listed_item":
      activityType = "listed an item";
      break;

    case "updated_listing":
      activityType = "updated an item";
      break;

    case "new_mint":
      activityType = "minted an item";
      break;

    case "new_sales":
      activityType = "purchased an item";
      break;
    case "cancelled_listing":
      activityType = "delisted an item";
      break;
       case "newly_created_collection":
      activityType = "created a collection";
      break;
       case "newly_updated_collection":
      activityType = "updated a collection";
      break;

    default:
    // code block
  }

  var item_price = "";
  if (listed_item && listed_item !== null) {
    item = listed_item;
    item_price = listed_item.listing_price+" ETH";
  }
  else if (created_item && created_item !== null) {
    item = created_item;
    item_price = created_item.item_price+" ETH";
  }
  else{
    item_price = "----"
  }

  return (
    <div className="profile-activity-list">
          <div className="profile-activity-item">
            {
              collection_id
              ?
                 (<img src={
                                   collection_id
                                   && collection_id !== undefined
                                   && collection_id !== null
                                   ?
                                     collection_id.collectionLogoImage
                                   :
                               "/images/profile-nft.png"
                               } alt="" />)
              :created_item
              ?
                 (<img src={
                                   created_item
                                   && created_item !== undefined
                                   && created_item !== null
                                   ?
                                     created_item.item_art_url
                                   :
                               "/images/profile-nft.png"
                               } alt="" />)
              : created_item_listed
              ?
                 (<img src={
                                   created_item_listed
                                   && created_item_listed !== undefined
                                   && created_item_listed !== null
                                   ?
                                     created_item_listed.item_art_url
                                   :
                               "/images/profile-nft.png"
                               } alt="" />)
              :""
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
              <b>{
                      from_user_id
                      && from_user_id !== undefined
                      && from_user_id.username
                      && from_user_id.username !== undefined
                      ? from_user_id.username
                      : ""
                      }
                      {" "}
                      </b>
                {activityType}
                {" "}
                <b>
                  {created_item_listed &&
                  created_item_listed !== undefined &&
                  created_item_listed !== null
                    ? created_item_listed.item_title
                    : ""}
                </b>
              </span>
            </div>
          </div>


      <div className="profile-activity-price-wrapper">
           {
             item_price && item_price !=="----"
          ?
        <span className="profile-activity-coin-price">
            <CoinIcon /> {item_price}
            </span>
            :"----"
          }
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
                      && to_user_id.username
                      && to_user_id.username !== undefined
                      ? to_user_id.username
                      : "----"
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

export default CollectionActivityCard;
