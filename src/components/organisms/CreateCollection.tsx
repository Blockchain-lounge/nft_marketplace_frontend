import clsx from "clsx";
import Image from "next/image";
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
  const [collectionBannerArt, setCollectionBannerArt] = useState("");
  const [collectionFeaturedArt, setCollectionFeaturedArt] = useState("");
  const [collectionLogoArt, setCollectionLogoArt] = useState("");
  {
    /*featured img*/
  }
  const [collectionFeaturedImg, setcollectionFeaturedImage] =
    useState<FileList | null>(null);
  {
    /*logo img*/
  }
  const [collectionLogoImg, setCollectionLogoImage] = useState<FileList | null>(
    null
  );
  const [collectionBanner, setCollectionBannerImage] =
    useState<FileList | null>(null);

  const [validationError, setValidationError] = useState(false);
  const [collectionPayload, setCollectionPayload] = useState({
    collection_name: "",
    collection_description: "",
    collection_cover_image: null,
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

  //@ts-ignore
  const handleImageFieldChange = (e, setImg, setArt) => {
    const { files } = e.target;
    var msg = "";
    if (!files[0] || files[0].size == 0 || files[0].size == null) {
      msg = "Collection cover art is required!";
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
    setImg(files[0]);
    setArt(URL.createObjectURL(files[0]));
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
    }
    var collectionData = {
      name: collectionPayload.collection_name,
      description: collectionPayload.collection_description,
      cover_image: collectionBanner,
    };
    try {
      const HEADER = "authenticated_and_form_data";
      const REQUEST_URL = "nft-collection/store";
      const METHOD = "POST";
      const DATA = collectionData;

      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          return;
        }
        if (response.status == 401) {
          toast("Unauthorized request!");
          return;
        } else if (response.status == 201) {
          toast(response.data.message);
          closeModal((prev) => !prev);
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
            onChange={(e) =>
              handleImageFieldChange(
                e,
                setCollectionBannerImage,
                setCollectionBannerArt
              )
            }
            className="hidden"
            name="img"
          />

          {collectionBannerArt && (
            <Image
              src={collectionBannerArt || "/ape.png"}
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
              className={clsx(collectionBannerArt ? "hidden" : "block mt-2")}
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
            onChange={(e) =>
              handleImageFieldChange(
                e,
                setcollectionFeaturedImage,
                setCollectionFeaturedArt
              )
            }
            className="hidden"
            name="img"
          />

          {collectionFeaturedArt && (
            <Image
              src={collectionFeaturedArt || "/ape.png"}
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
              className={clsx(collectionFeaturedArt ? "hidden" : "block mt-2")}
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
            onChange={(e) =>
              handleImageFieldChange(
                e,
                setCollectionLogoImage,
                setCollectionLogoArt
              )
            }
            className="hidden"
            name="img"
          />

          {collectionLogoArt && (
            <Image
              src={collectionLogoArt || "/ape.png"}
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
                collectionLogoArt ? "hidden" : "block mt-2 text-sm"
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
        <span className="create-new-nft-wrapper-2-label">Bio</span>
        <textarea
          name="collection_description"
          className="w-full bg-transparent  outline-none select"
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
      />
    </div>
  );
};

export default CreateCollection;
