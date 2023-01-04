//@ts-nocheck
import { ITransactionCard } from "@/src/utilities/types";
import Image from "next/image";
import React from "react";
import { CoinIcon } from "../atoms/vectors";
import * as moment from "moment";
import { Button } from "../atoms";

const NotificationCard = ({
  activity_type,
  created_item,
  added_item,
  offer,
}: {
  activity_type: string;
  created_item: {
    item_art_url: string;
    item_name: string;
    time: string;
  };
  offer: {
    item_art_url: string;
    item_name: string;
    time: string;
    price: string;
  };
  added_item: {
    by: string;
    item_art_url: string;
    collection_name: string;
    time: string;
    price: string;
  };
}) => {
  return (
    <div className="total-earning-card-wrapper">
      <div className="transaction-card-details">
        <div className="transaction-card-img">
          {created_item ? (
            <Image
              src={
                created_item &&
                created_item !== undefined &&
                created_item !== null
                  ? created_item.item_art_url
                  : ""
              }
              alt=""
              layout="fill"
              className="rounded-full"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
            />
          ) : offer ? (
            <Image
              src={
                offer && offer !== undefined && offer !== null
                  ? offer.item_art_url
                  : ""
              }
              alt=""
              layout="fill"
              className="rounded-full"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
            />
          ) : added_item ? (
            <Image
              src={
                added_item && added_item !== undefined && added_item !== null
                  ? added_item.item_art_url
                  : "/images/profile-nft.png"
              }
              alt=""
              layout="fill"
              // objectFit="contain"
              className="rounded-full"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
            />
          ) : (
            ""
          )}
        </div>
        <div className="transaction-card">
          {activity_type === "newly_created_collection" ? (
            <p className="transaction-card-span">
              Your collection{" "}
              <span className="notification-span">
                {created_item &&
                created_item !== undefined &&
                created_item.item_name &&
                created_item.item_name !== undefined
                  ? created_item.item_name
                  : ""}
              </span>{" "}
              has been created successfully
              <b>
                {created_item &&
                created_item !== undefined &&
                created_item !== null
                  ? created_item.item_title
                  : ""}
              </b>
            </p>
          ) : activity_type === "newly_added_item" ? (
            <p className="transaction-card-p">
              {added_item &&
              added_item !== undefined &&
              added_item.by &&
              added_item.by !== undefined
                ? added_item.by
                : ""}
              <span className="transaction-card-span">
                {" "}
                added an item to your collection{" "}
              </span>

              {added_item && added_item !== undefined && added_item !== null
                ? added_item.collection_name
                : ""}
            </p>
          ) : activity_type === "new_offer" ? (
            <p className="transaction-card-p">
              {offer &&
              offer !== undefined &&
              offer.by &&
              offer.by !== undefined
                ? offer.by
                : ""}
              <span className="transaction-card-span"> made an offer for </span>
              {offer && offer !== undefined && offer !== null
                ? offer.item_name
                : ""}
            </p>
          ) : null}

          <div className="notification-detail">
            {activity_type === "new_offer" ? (
              <>
                <span className="flex items-center gap-x-2 font-bold">
                  <CoinIcon /> {offer.price}
                </span>
                <span className="h-1 w-1 bg-txt-4 rounded-full"></span>
              </>
            ) : (
              ""
            )}
            <span className="font-medium text-xs sm:text-base text-txt-2">
              {activity_type === "newly_created_collection"
                ? created_item.time
                : activity_type === "newly_added_item"
                ? added_item.time
                : activity_type === "new_offer"
                ? offer.time
                : ""}
            </span>
            {/* <span className="notification-date-time">10:52</span> */}
          </div>
        </div>
      </div>
      {/* <div className="total-earning-bal"> */}
      {/*   <span className="total-earning-coin-sold"> */}
      {/*     <CoinIcon /> 4.5k */}
      {/*   </span> */}
      {/*   <span className="total-earning-coin-sold-receiver">$5,954,532</span> */}
      {/* </div> */}
      <div className="flex gap-x-6">
        {activity_type === "newly_created_collection" ||
        activity_type === "newly_added_item" ? (
          <Button title="View" outline2 />
        ) : activity_type === "new_offer" ? (
          <>
            <Button title="Decline" danger /> <Button title="Accept" />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
