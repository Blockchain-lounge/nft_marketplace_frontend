// @ts-nocheck
import clsx from "clsx";
import Image from "next/image";

import { uploadFile } from "../../functions/offChain/apiRequests";

import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";
import { Button, Input2 } from "../atoms";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiRequest } from "../../functions/offChain/apiRequests";

interface ICollectionProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
  changeModalType?: Dispatch<SetStateAction<string>>;
}

const CreateCollection: FC<ICollectionProps> = ({
  closeModal,
  changeModalType,
}) => {
  const [collectionBannerPreview, setCollectionBannerPreview] = useState("");
  const [collectionBanner, setCollectionBanner] = useState("");

  const [collectionFeaturedArt, setCollectionFeaturedArt] = useState("");
  const [collectionFeaturedArtPreview, setCollectionFeaturedArtPreview] =
    useState("");

  const [collectionLogo, setCollectionLogo] = useState("");
  const [collectionLogoPreview, setCollectionLogoPreview] = useState("");

  const [isTransloading, setIsTransLoading] = useState(false);

  // const [validationError, setValidationError] = useState(false);
  const [collectionPayload, setCollectionPayload] = useState({
    collection_name: "",
    collection_description: "",
  });

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCollectionPayload({
      ...collectionPayload,
      [name]: value,
    });
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
    var fileExtArr = ["jpg", "jpeg", "png"];

    if (fileExtArr.indexOf(fileExt) <= -1) {
      msg = "Only images of type jpg, jpeg, png are allowed";
      toast(msg);
      return false;
    }

    if (files[0].name >= 5120) {
      // 5mb * 1024kb = 5120
      msg = "File is larger than 5mb";
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

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    var msg = "";
    if (
      !collectionPayload.collection_name ||
      !collectionPayload.collection_description
    ) {
      msg = "Collection name or/and decsription is still empty";
      toast(msg);
      return false;
    } else if (!collectionBanner || !collectionFeaturedArt || !collectionLogo) {
      msg = "Some the required images are still not added";
      toast(msg);
      return false;
    }
    var collectionData = {
      name: collectionPayload.collection_name,
      description: collectionPayload.collection_description,
      cover_image: collectionBanner,
      collectionFeaturedImage: collectionFeaturedArt,
      collectionLogoImage: collectionLogo,
    };
    setIsTransLoading(true);
    try {
      const HEADER = "authenticated_and_form_data";
      const REQUEST_URL = "nft-collection/store";
      const METHOD = "POST";
      const DATA = collectionData;

      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400 || response.status == 404) {
          var error = response.data.error;
          toast(error);
          return;
        }
        if (response.status == 401) {
          toast("Unauthorized request!");
          return;
        } else if (response.status == 201) {
          toast(response.data.message);
          setIsTransLoading(false);
          closeModal((prev) => !prev);
          setCollectionPayload({
            ...collectionPayload,
            collection_name: "",
            collection_description: "",
          });
          setCollectionBanner(null);
          setCollectionFeaturedArt(null);
          setCollectionLogo(null);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    } catch (error) {
      toast("Internal server occured!");
      return;
    }
  };

  return (
    <div className="create-new-nft-form max-w-[90%] mx-auto overflow-auto h-[70vh] scrollbar-hide">
      <ToastContainer />
      {/*Banner Image*/}
      <div className="create-new-nft-wrapper-2">
        <span className="create-new-nft-wrapper-2-label">Banner Image</span>
        <span className="create-new-nft-wrapper-2-label-type">
          File types supported: JPG, JPEG and PNG. Max size: 5 MB
        </span>
        <div className="h-56 rounded-lg relative mt-2">
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
            className="absolute inset-0 rounded-lg flex flex-col justify-center items-center bg-[#1c1e3d7f]"
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
          File types supported: JPG and PNG. Max size: 5 MB
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
              src={collectionFeaturedArtPreview || "/ape.png"}
              alt="collection-cover-art"
              layout="fill"
              objectFit="cover"
            />
          )}

          <label
            htmlFor="featuredCollection"
            className="absolute inset-0 rounded-lg flex flex-col justify-center items-center bg-[#1c1e3d7f]"
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
      {/*Logo Image*/}
      <div className="create-new-nft-wrapper-2">
        <span className="create-new-nft-wrapper-2-label">Logo Image</span>
        <span className="create-new-nft-wrapper-2-label-type">
          File types supported: JPG and PNG. Max size: 5 MB
        </span>
        <div className="h-40 w-40 rounded-lg relative mt-2">
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
            />
          )}

          <label
            htmlFor="logoCollection"
            className="absolute inset-0 rounded-lg flex flex-col justify-center items-center bg-[#1c1e3d7f]"
          >
            <Image
              src="/gallery-add.svg"
              alt="add-img-svg"
              width="24px"
              height="24px"
            />
            <span
              className={clsx(
                collectionLogoPreview ? "hidden" : "block mt-2 text-sm"
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
      <div>
        <span className="create-new-nft-wrapper-2-label">Description</span>
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
      <Button
        title="Create collection"
        twClasses="w-full"
        onClick={handleSubmit}
        isDisabled={isTransloading}
      />
    </div>
  );
};

export default CreateCollection;
