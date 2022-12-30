//@ts-nocheck
import { ITransactionCard } from "@/src/utilities/types";
import Image from "next/image";
import React from "react";
import { CoinIcon } from "../atoms/vectors";
import * as moment from "moment";

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
          ) : resell_item_id ? (
            <Image
              src={
                resell_item_id &&
                resell_item_id !== undefined &&
                resell_item_id !== null
                  ? resell_item_id.item_art_url
                  : ""
              }
              alt=""
              layout="fill"
              className="rounded-full"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
            />
          ) : created_item_listed ? (
            <Image
              src={
                created_item_listed &&
                created_item_listed !== undefined &&
                created_item_listed !== null
                  ? created_item_listed.item_art_url
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
          {activity_type === "newly_created_item" ? (
            <p className="transaction-card-p">
              {from_user_id &&
              from_user_id !== undefined &&
              from_user_id.username &&
              from_user_id.username !== undefined
                ? from_user_id.username
                : ""}
              <span className="transaction-card-span">
                {" "}
                created new item{" "}
                <b>
                  {created_item &&
                  created_item !== undefined &&
                  created_item !== null
                    ? created_item.item_title
                    : ""}
                </b>
              </span>
            </p>
          ) : activity_type === "updated_item" ? (
            <p className="transaction-card-p">
              {from_user_id &&
              from_user_id !== undefined &&
              from_user_id.username &&
              from_user_id.username !== undefined
                ? from_user_id.username
                : ""}
              <span className="transaction-card-span">
                {" "}
                updated an item{" "}
                <b>
                  {created_item &&
                  created_item !== undefined &&
                  created_item !== null
                    ? created_item.item_title
                    : ""}
                </b>
              </span>
            </p>
          ) : activity_type === "newly_listed_item" ? (
            <p className="transaction-card-p">
              {from_user_id &&
              from_user_id !== undefined &&
              from_user_id.username &&
              from_user_id.username !== undefined
                ? from_user_id.username
                : ""}
              <span className="transaction-card-span">
                {" "}
                recently listed an item{" "}
                <b>
                  {created_item_listed &&
                  created_item_listed !== undefined &&
                  created_item_listed !== null
                    ? created_item_listed.item_title
                    : ""}
                </b>
              </span>
            </p>
          ) : activity_type === "updated_listing" ? (
            <p className="transaction-card-p">
              {from_user_id &&
              from_user_id !== undefined &&
              from_user_id.username &&
              from_user_id.username !== undefined
                ? from_user_id.username
                : ""}
              <span className="transaction-card-span">
                {" "}
                recently updated an item{" "}
                <b>
                  {listed_item &&
                  listed_item !== undefined &&
                  listed_item !== null &&
                  created_item_listed !== undefined &&
                  created_item_listed !== null
                    ? created_item_listed.item_title
                    : ""}
                </b>
              </span>
            </p>
          ) : activity_type === "new_mint" ? (
            <p className="transaction-card-p">
              {from_user_id &&
              from_user_id !== undefined &&
              from_user_id.username &&
              from_user_id.username !== undefined
                ? from_user_id.username
                : ""}
              <span className="transaction-card-span">
                {" "}
                recently minted an item{" "}
                <b>
                  {created_item_listed &&
                  created_item_listed !== undefined &&
                  created_item_listed !== null
                    ? created_item_listed.item_title
                    : ""}
                </b>
              </span>
            </p>
          ) : activity_type === "new_sales" ? (
            <p className="transaction-card-p">
              {from_user_id &&
              from_user_id !== undefined &&
              from_user_id.username &&
              from_user_id.username !== undefined
                ? from_user_id.username
                : ""}
              <span className="transaction-card-span">
                {" "}
                recently purchased an item{" "}
                <b>
                  {created_item_listed &&
                  created_item_listed !== undefined &&
                  created_item_listed !== null
                    ? created_item_listed.item_title
                    : ""}
                </b>
              </span>
            </p>
          ) : activity_type === "cancelled_listing" ? (
            <p className="transaction-card-p">
              {from_user_id &&
              from_user_id !== undefined &&
              from_user_id.username &&
              from_user_id.username !== undefined
                ? from_user_id.username
                : ""}
              <span className="transaction-card-span">
                {" "}
                recently cancelled an item{" "}
                <b>
                  {created_item_listed &&
                  created_item_listed !== undefined &&
                  created_item_listed !== null
                    ? created_item_listed.item_title
                    : ""}
                </b>
              </span>
            </p>
          ) : null}

          <div className="total-earning-transaction-date-time">
            <span className="total-earning-transaction-date"></span>
            <span className="total-earning-transaction-time">10:52</span>
          </div>
        </div>
      </div>
      {/* <div className="total-earning-bal"> */}
      {/*   <span className="total-earning-coin-sold"> */}
      {/*     <CoinIcon /> 4.5k */}
      {/*   </span> */}
      {/*   <span className="total-earning-coin-sold-receiver">$5,954,532</span> */}
      {/* </div> */}
    </div>
  );
};

export default NotificationCard;
