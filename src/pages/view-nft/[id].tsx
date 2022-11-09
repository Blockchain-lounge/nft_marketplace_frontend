// @ts-nocheck
import { Button, Select } from "@/src/components/atoms";
import {
  CaretDown,
  CoinIcon,
  ExternalLinkIcon,
  LikeIcon,
  StatIcon,
} from "@/src/components/atoms/vectors";
import EyeIcon from "@/src/components/atoms/vectors/eye-icon";
import { Footer, Modal } from "@/src/components/organisms";
import DashboardLayout from "@/src/template/DashboardLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { apiRequest } from "../../functions/offChain/apiRequests";
import { toast } from "react-toastify";

const ViewNft = () => {
  const { query, push } = useRouter();
  const { id } = query;
  const [showModal, setShowModal] = useState(false);
  const [itemDetail, setItemDetail] = useState(null);

  const fetchItemDetail = async (id) => {
    if (id !== undefined) {
      const HEADER = {};
      const REQUEST_URL = "nft-item/detail/" + id;
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          push("/");
          return;
        } else if (response.status == 200) {
          setItemDetail(response.data.data);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    }
  };
  useEffect(() => {
    fetchItemDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // console.log({ itemDetail });
  return (
    <DashboardLayout>
      {itemDetail !== null ? (
        <div className="sub-layout-wrapper">
          <div className="center space-y-8 h-screen lg:h-[70vh] 2xl:h-[80vh]">
            <div className="view-wrapper-hero lg:grid-cols-[0.3fr_0.35fr_0.35fr]">
              <div>
                <div className="relative h-[25rem] lg:h-[100%]">
                  <Image
                    src={itemDetail.item_art_url}
                    alt={itemDetail.item_title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>

                {/* <div className="flex gap-x-6 mt-4 items-center">
                  <span className="flex gap-x-2 items-center">
                    <LikeIcon /> 298
                  </span>
                  <span className="view-hero-nft-link">
                    <Image
                      src="/icon-svg/discord.svg"
                      alt="view-nft-links"
                      layout="fill"
                      objectFit="contain"
                    />
                  </span>
                  <span className="view-hero-nft-link">
                    <Image
                      src="/icon-svg/twitter.svg"
                      alt="view-nft-links"
                      layout="fill"
                      objectFit="contain"
                    />
                  </span>
                  <span className="view-hero-nft-link">
                    <Image
                      src="/icon-svg/telegram.svg"
                      alt="view-nft-links"
                      layout="fill"
                      objectFit="contain"
                    />
                  </span>
                  <span className="view-hero-nft-link border border-border-1-line p-4 rounded-md">
                    <Image
                      src="/icon-svg/options.svg"
                      alt="view-nft-links"
                      layout="fill"
                      objectFit="cover"
                    />
                  </span>
                </div> */}
              </div>
              <div className="space-y-8 py-4">
                <div>
                  <div className="flex items-center mb-5">
                    {/*collection-logo*/}
                    {/* <div className="h-[2.125rem] w-[2.125rem] relative mr-4">
                      <Image
                        src="/images/colx_id.png"
                        alt="colx-img"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div> */}
                    {/* <span className="text-lg mr-1">CloneXx</span> */}
                    {/*verified-tag*/}
                    {/* <div className="h-5 w-5 relative">
                      <Image
                        src="/images/verify.svg"
                        alt="colx-img"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-full"
                      />
                    </div> */}
                  </div>
                  <span className="text-4xl font-bold capitalize">
                    {itemDetail.item_title}
                  </span>
                </div>
                <div className="view-hero-nft-owner">
                  <div className="flex items-center gap-x-4">
                    <div className="relative h-14 w-14">
                      <Image
                        src="/images/avatar.png"
                        alt="nft-img"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-txt-2"> Current Owner</span>
                      <span>Owned by you</span>
                    </div>
                  </div>
                </div>
                <div className="view-hero-nft-cta-wrapper">
                  <div className="flex w-full gap-x-6">
                    <div className="p-4 bg-bg-5 rounded-md w-full">
                      <span className="text-txt-2 block mb-4 text-xl">
                        Price
                      </span>
                      <div className="">
                        <span className="flex items-center text-[1.5rem] gap-x-1">
                          <CoinIcon />
                          {itemDetail.item_price}
                        </span>
                        <span className="text-xl block mt-2">
                          Item quantity: {itemDetail.item_quantity}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* <Button title="Edit" wt="w-full" outline2 /> */}
                  {/* <div className="w-full flex flex-col gap-y-4">
                    <div className="flex gap-x-5">
                      <Button
                        title="Sell"
                        onClick={() => push(`/list-nft-for-sale/${id}`)}
                        wt="w-full"
                      />
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="create-new-nft-wrapper-2 border border-border-1-line p-4 rounded-[1.25rem] hidden lg:block">
                <span className="create-new-nft-wrapper-2-label  pb-2 border-b border-border-1-line">
                  Offers
                </span>
                <div className="flex flex-col justify-center items-center h-[90%] gap-y-4">
                  <div className="relative h-[50%] w-[70%] ">
                    <Image
                      priority
                      src="/images/no-offer.svg"
                      alt="buy-nft-sample"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <span className="create-new-nft-wrapper-2-label">
                    No offers yet
                  </span>
                </div>
              </div>
            </div>
            <div className=" space-y-3">
              <h2 className="text-2xl font-bold ">Description</h2>
              <div className="flex flex-col">
                <p className="text-txt-2">{itemDetail.item_description}</p>
              </div>
              {/* <span className="flex items-center gap-x-2 text-txt-3 font-medium">
              See more
              <span>
                <CaretDown color="lightgray" />
              </span>
            </span> */}

              <div className="view-nft-details">
                <h2 className="text-2xl font-bold my-4">Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-x-2">
                    <CoinIcon />{" "}
                    <span className="block font-medium ">Ethereum</span>{" "}
                    <span className="text-txt-2">(ERC-721)</span>
                  </div>
                  {/* <div className="flex items-center gap-x-2 cursor-pointer">
                  <StatIcon />{" "}
                  <span className="block font-medium">View on Etherscan</span>
                  <ExternalLinkIcon />
                </div>
                <div className="flex items-center gap-x-2 cursor-pointer">
                  <EyeIcon />{" "}
                  <span className="block font-medium">Open original</span>{" "}
                  <ExternalLinkIcon />{" "}
                </div> */}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        ""
      )}
      <Modal openModal={showModal} closeModal={setShowModal} title="offer">
        <div></div>
      </Modal>
    </DashboardLayout>
  );
};

export default ViewNft;
