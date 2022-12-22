// @ts-nocheck
import clsx from "clsx";
import Image from "next/image";

import { useRouter } from "next/router";
import { uploadFile } from "../functions/offChain/apiRequests";

import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Heading2, Input2, Select } from "../components/atoms";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiRequest } from "../functions/offChain/apiRequests";
import EarningLayout from "../template/EarningLayout";
import { ICategories } from "../utilities/types";
import { CloseIcon } from "../components/atoms/vectors";

const ImportCollection: FC<ICollectionProps> = () => {
  const [collectionBannerPreview, setCollectionBannerPreview] = useState("");
  const [collectionBanner, setCollectionBanner] = useState("");

  const [categories, setCategories] = useState<Array<ICategories> | null>(null);
  const [category, setCategory] = useState<Record<string, string> | null>(null);
  const [collectionFeaturedArt, setCollectionFeaturedArt] = useState("");
  const [collectionFeaturedArtPreview, setCollectionFeaturedArtPreview] =
    useState("");

  const [collectionLogo, setCollectionLogo] = useState("");
  const [collectionLogoPreview, setCollectionLogoPreview] = useState("");

  const [isTransloading, setIsTransLoading] = useState(false);

  const [validationError, setValidationError] = useState(false);
  const [collectionPayload, setCollectionPayload] = useState({
    collection_name: "",
    collection_description: "",
    collection_address: "",
    collection_creator_fee: 0,
  });

  const [socialLinksPayload, setSocialLinksPayload] = useState({
    website: "",
    discord: "",
    twitter: "",
    instagram: "",
  });

  const { push } = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCollectionPayload({
      ...collectionPayload,
      [name]: value,
    });
  };

  const handleSocialLinksFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSocialLinksPayload({
      ...socialLinksPayload,
      [name]: value,
    });
  };

  const handleSelect = (category) => {
    setCategory({ ...category, category });
  };

  const validateFileInput = (files, fieldName) => {
    var msg = "";
    if (!files[0] || files[0].size == 0 || files[0].size == null) {
      msg = fieldName + " is required!";
      alert(msg);
      setValidationError(true);
      return false;
    }
    var fullFileName = files[0].name;
    fullFileName = fullFileName.toLowerCase();
    var fileExt =
      fullFileName.substring(0, 1) === "."
        ? ""
        : fullFileName.split(".").slice(1).pop() || "";
    var fileExtArr = ["jpg", "jpeg", "png", "svg", "gif", "webp", "avif"];

    if (fileExtArr.indexOf(fileExt) <= -1) {
      msg =
        "Only images of type jpg, jpeg, png, svg, gif, webp, avif are allowed";
      toast(msg);
      return false;
    }

    if (files[0].name >= 20480) {
      // 5mb * 1024kb = 5120
      msg = "File is larger than 20mb";
      toast(msg);
      return false;
    }
  };
  const handleImageFieldChange = async (e) => {
    const { files, name } = e.target;
    var fieldName = "";
    if (name === "collectionBannerImage") {
      fieldName = "Collection banner image";
      validateFileInput(files, fieldName);
      // setCollectionBanner(files[0]);
      const { imgUrl } = await uploadFile(files[0], toast);
      setCollectionBanner(imgUrl);
      setCollectionBannerPreview(URL.createObjectURL(files[0]));
    }
    if (name === "collectionFeaturedImage") {
      fieldName = "Collection featured image";
      validateFileInput(files, fieldName);
      // setCollectionFeaturedArt(files[0]);
      const { imgUrl } = await uploadFile(files[0], toast);
      setCollectionFeaturedArt(imgUrl);
      setCollectionFeaturedArtPreview(URL.createObjectURL(files[0]));
    }
    if (name === "collectionLogoImage") {
      fieldName = "Collection logo image";
      validateFileInput(files, fieldName);
      // setCollectionLogo(files[0]);
      const { imgUrl } = await uploadFile(files[0], toast);
      setCollectionLogo(imgUrl);
      setCollectionLogoPreview(URL.createObjectURL(files[0]));
    } else {
      return;
    }
  };

  const fetchCategories = async () => {
    try {
      const HEADER = "";
      const REQUEST_URL = "category/index";
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          return;
        } else if (response.status == 401) {
          toast("Unauthorized request!");
          return;
        } else if (response.status == 200) {
          setCategory(response.data.data[1]);
          setCategories(response.data.data);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    } catch (error) {
      toast("Something went wrong, please try again!");
      return;
    }
  };
 
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    var msg = "";
    if (
      !collectionPayload.collection_name ||
      !collectionPayload.collection_description ||
      !collectionPayload.collection_address
    ) {
      msg = "Collection name and decsription is required";
      toast(msg);
      return false;
    } else if (!collectionBanner || !collectionFeaturedArt || !collectionLogo) {
      msg = "Some the required images are still not added";
      toast(msg);
      return false;
    }
    var collectionData = {
      name: collectionPayload.collection_name,
      collection_address: collectionPayload.collection_address,
      collection_creator_fee: collectionPayload.collection_creator_fee && isNaN(collection_creator_fee) === false ? collection_creator_fee : 0,
      description: collectionPayload.collection_description,
      cover_image: collectionBanner,
      collectionFeaturedImage: collectionFeaturedArt,
      collectionLogoImage: collectionLogo,
      category_id: category._id || category.id,
      ...socialLinksPayload,
    };
    // console.log({ collectionData });
    setIsTransLoading(true);
    try {
      const HEADER = "authenticated_and_form_data";
      const REQUEST_URL = "nft-collection/store";
      const METHOD = "POST";
      const DATA = collectionData;

      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        // console.log({ response });
        setIsTransLoading(false);
        if (response.status == 400 || response.status == 404) {
          var error = response.data.error;
          toast(error);
          setIsTransLoading(false);
          return;
        }
        if (response.status == 401) {
          toast("Unauthorized request!");
          return;
        } else if (response.status == 201) {
          toast(response.data.message);
          setIsTransLoading(false);
          push("/create-new-nft");
          setCollectionPayload({
            ...collectionPayload,
            collection_name: "",
            collection_description: "",
          });
          setSocialLinksPayload({
            ...socialLinksPayload,
            website: "",
            discord: "",
            instagram: "",
            twitter: "",
          });
          setCollectionBanner(null);
          setCollectionFeaturedArt(null);
          setCollectionLogo(null);
          // closeModal((prev) => !prev);
        } else {
          toast("Something went wrong, please try again!");
          setIsTransLoading(false);
          return;
        }
      });
    } catch (error) {
      toast("Internal server occured!");
      setIsTransLoading(false);
      return;
    }
  };

  return (
    <EarningLayout title="Import Collection">
      <div className="create-new-nft-form max-w-[80%] 2xl:max-w-[60%]">
        <ToastContainer />
        {/*Logo Image*/}
        <div className="create-new-nft-wrapper-2">
          <span className="create-new-nft-wrapper-2-label">Logo Image</span>
          <span className="create-new-nft-wrapper-2-label-type">
            File types supported: JPG, JPEG, PNG, SVG, WEBP and GIF. Max size:
            20 MB
          </span>
          <div className="h-40 w-40 relative rounded-full">
            <input
              type="file"
              id="logoCollection"
              onChange={(e) => handleImageFieldChange(e)}
              className="hidden"
              name="collectionLogoImage"
            />

            {collectionLogoPreview && (
              <Image
                src={collectionLogoPreview || "/ape.png"}
                alt="collection-cover-art"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            )}

            <label
              htmlFor="logoCollection"
              className="absolute inset-0 flex flex-col justify-center items-center bg-[#1c1e3d7f] rounded-full"
            >
              <Image
                src="/gallery-add.svg"
                alt="add-img-svg"
                width="24px"
                height="24px"
              />
              {/* <span
                className={clsx(
                  collectionLogoPreview ? "hidden" : "block mt-2 text-sm"
                )}
              >
                Click to change image
              </span> */}
            </label>
          </div>
        </div>
        {/*Banner Image*/}
        <div className="create-new-nft-wrapper-2">
          <span className="create-new-nft-wrapper-2-label">Banner Image</span>
          <span className="create-new-nft-wrapper-2-label-type">
            File types supported: JPG, JPEG, PNG, SVG, WEBP and GIF. Max size:
            20 MB
          </span>
          <div className="h-[20rem] rounded-lg relative mt-2">
            <input
              type="file"
              id="userImg"
              onChange={(e) => handleImageFieldChange(e)}
              className="hidden"
              name="collectionBannerImage"
            />

            {collectionBannerPreview && (
              <Image
                src={collectionBannerPreview || "/ape.png"}
                alt="collection-cover-art"
                layout="fill"
                objectFit="cover"
              />
            )}

            <label
              htmlFor="userImg"
              className="absolute inset-0 flex flex-col justify-center items-center bg-[#1c1e3d7f]"
            >
              <Image
                src="/gallery-add.svg"
                alt="add-img-svg"
                width="24px"
                height="24px"
              />
              <span
                className={clsx(
                  collectionBannerPreview ? "hidden" : "block mt-2"
                )}
              >
                Click to upload collection banner image
              </span>
            </label>
          </div>
        </div>
        {/*Featured Image*/}
        <div className="create-new-nft-wrapper-2">
          <span className="create-new-nft-wrapper-2-label">Featured Image</span>
          <span className="create-new-nft-wrapper-2-label-type">
            File types supported: JPG, JPEG, PNG, SVG, WEBP and GIF. Max size:
            20 MB
          </span>
          <div className="h-72 w-72 rounded-lg relative">
            <input
              type="file"
              id="featuredCollection"
              onChange={(e) => handleImageFieldChange(e)}
              className="hidden"
              name="collectionFeaturedImage"
            />

            {collectionFeaturedArtPreview && (
              <Image
                src={collectionFeaturedArtPreview || ""}
                alt="collection-cover-art"
                layout="fill"
                objectFit="cover"
              />
            )}

            <label
              htmlFor="featuredCollection"
              className="absolute inset-0 flex flex-col justify-center items-center bg-[#1c1e3d7f]"
            >
              <Image
                src="/gallery-add.svg"
                alt="add-img-svg"
                width="24px"
                height="24px"
              />
              <span
                className={clsx(
                  collectionFeaturedArtPreview ? "hidden" : "block mt-2"
                )}
              >
                Click to change image
              </span>
            </label>
          </div>
        </div>

        {/*Input Fields*/}
        <Input2
          name="collection_name"
          label="Collection name"
          placeholder="Enter collection name"
          onChange={handleFieldChange}
          value={collectionPayload.collection_name}
          required
        />

        <Input2
          name="collection_address"
          label="NFT Address"
          placeholder="Enter NFT address"
          onChange={handleFieldChange}
          value={collectionPayload.collection_address}
          required
        />

        <Input2
          name="collection_creator_fee"
          label="NFT Creator Fee"
          placeholder="Enter NFT Creator Fee in %"
          onChange={handleFieldChange}
          value={collectionPayload.collection_creator_fee}
          required
        />

        <div>
          <span className="create-new-nft-wrapper-2-label mb-2">
            Description
          </span>
          <textarea
            name="collection_description"
            className="w-full bg-transparent text-white outline-none select"
            placeholder="Enter collection description..."
            rows={5}
            maxLength={250}
            onChange={handleFieldChange}

            // value={userDetailsPayload.bio}
          ></textarea>
        </div>
        <div>
          <span className="create-new-nft-wrapper-2-label mb-2">Category</span>
          {category !== null ? (
            <Select
              title={category.name || category.label}
              lists={categories}
              onClick2={handleSelect}
            />
          ) : null}
        </div>
        <div>
          <span className="create-new-nft-wrapper-2-label mb-2">Links</span>
          <div className="flex flex-col gap-y-5">
            {/*Website-Link*/}
            <div className="flex items-center gap-x-5">
              <div className="flex items-center justify-center gap-x-4 h-[3.625rem] w-[15%] bg-bg-2 rounded-lg">
                <div className="relative w-6 h-8">
                  <Image
                    src="/icon-svg/link.svg"
                    alt="website-link"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="font-medium">Website</span>
              </div>
              <div className="w-[85%]">
                <Input2
                  onChange={handleSocialLinksFieldChange}
                  name="website"
                  placeholder="Enter your website link"
                  value={socialLinksPayload.website}
                  suffix={<CloseIcon />}
                  onClickSuffix={() =>
                    setSocialLinksPayload({
                      ...socialLinksPayload,
                      website: "",
                    })
                  }
                />
              </div>
            </div>
            {/*Discord-Link*/}
            <div className="flex items-center gap-x-5">
              <div className="flex items-center justify-center gap-x-4 h-[3.625rem] w-[15%] bg-bg-2 rounded-lg">
                <div className="relative w-6 h-5">
                  <Image
                    src="/icon-svg/discord.svg"
                    alt="discord-link"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="font-medium">Discord</span>
              </div>
              <div className="w-[85%]">
                <Input2
                  suffix={<CloseIcon />}
                  onChange={handleSocialLinksFieldChange}
                  name="discord"
                  placeholder="Enter your discord link"
                  value={socialLinksPayload.discord}
                  onClickSuffix={() =>
                    setSocialLinksPayload({
                      ...socialLinksPayload,
                      discord: "",
                    })
                  }
                />
              </div>
            </div>
            {/*Twitter-Link*/}
            <div className="flex items-center gap-x-5">
              <div className="flex items-center justify-center gap-x-4 h-[3.625rem] w-[15%] bg-bg-2 rounded-lg">
                <div className="relative w-6 h-5">
                  <Image
                    src="/icon-svg/twitter.svg"
                    alt="twitter-link"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="font-medium">Twitter</span>
              </div>
              <div className="w-[85%]">
                <Input2
                  suffix={<CloseIcon />}
                  onChange={handleSocialLinksFieldChange}
                  name="twitter"
                  placeholder="Enter your twitter link"
                  value={socialLinksPayload.twitter}
                  onClickSuffix={() =>
                    setSocialLinksPayload({
                      ...socialLinksPayload,
                      twitter: "",
                    })
                  }
                />
              </div>
            </div>
            {/*Instagram-Link*/}
            <div className="flex items-center gap-x-5">
              <div className="flex items-center justify-center gap-x-4 h-[3.625rem] w-[15%] bg-bg-2 rounded-lg">
                <div className="relative w-6 h-8">
                  <Image
                    src="/icon-svg/instagram.svg"
                    alt="instagram-link"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="font-medium">Instagram</span>
              </div>
              <div className="w-[85%]">
                <Input2
                  suffix={<CloseIcon />}
                  onChange={handleSocialLinksFieldChange}
                  name="instagram"
                  placeholder="Enter your instagram link"
                  value={socialLinksPayload.instagram}
                  onClickSuffix={() =>
                    setSocialLinksPayload({
                      ...socialLinksPayload,
                      instagram: "",
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          title="Import collection"
          twClasses="w-full"
          onClick={handleSubmit}
          isDisabled={isTransloading}
        />
      </div>
    </EarningLayout>
  );
};

export default ImportCollection;
