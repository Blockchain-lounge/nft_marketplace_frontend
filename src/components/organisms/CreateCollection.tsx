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
  const [userImgBanner, setUserImgBanner] = useState<FileList | null>(null);

  const [featuredImg, setFeaturedImg] = useState<FileList | null>(null);

  const [logoImg, setLogoImg] = useState<FileList | null>(null);

  const [collectionCoverArt, setCollectionCoverArt] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [collectionCoverImage, setCollectionCoverImage] = useState();
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
  const handleImageFieldChange = (e) => {
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
    setCollectionCoverImage(files[0]);
    setCollectionCoverArt(URL.createObjectURL(files[0]));
  };
  return (
    <div className="create-new-nft-form max-w-[90%] mx-auto overflow-auto h-[70vh]">
      <ToastContainer />
      <div className="create-new-nft-wrapper-2">
        <span className="create-new-nft-wrapper-2-label">Banner Image</span>
        <span className="create-new-nft-wrapper-2-label-type">
          File types supported: JPG and PNG. Max size: 5 MB
        </span>
        <div className="h-56 rounded-lg relative mt-2">
          <input
            type="file"
            id="userImg"
            onChange={(e) => handleImageFieldChange(e)}
            className="hidden"
            name="img"
          />
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
            <span className={clsx(userImgBanner ? "hidden" : "block mt-2")}>
              Click to upload collection banner image
            </span>
          </label>
        </div>
      </div>
      <div className="create-new-nft-wrapper-2">
        <span className="create-new-nft-wrapper-2-label">Featured Image</span>
        <span className="create-new-nft-wrapper-2-label-type">
          File types supported: JPG and PNG. Max size: 100 MB
        </span>
        <div className="h-72 w-72 rounded-lg relative">
          <div
            className={`relative h-full w-full ${
              !featuredImg ? "hidden" : "block"
            }`}
          >
            <Image
              src={
                featuredImg
                  ? //@ts-ignore
                    URL.createObjectURL([...featuredImg][0])
                  : "/ape.png"
              }
              alt="user-profile-img-banner"
              objectFit="cover"
              layout="fill"
              className="rounded-lg"
            />
          </div>

          <input
            type="file"
            id="featuredImg"
            onChange={({
              currentTarget: { files },
            }: React.ChangeEvent<HTMLInputElement>) => setFeaturedImg(files)}
            className="hidden"
            name="img"
          />
          <label
            htmlFor="featuredImg"
            className="absolute inset-0 rounded-lg flex flex-col justify-center items-center bg-[#1c1e3d7f]"
          >
            <Image
              src="/gallery-add.svg"
              alt="add-img-svg"
              width="24px"
              height="24px"
            />
            <span className={clsx(featuredImg ? "hidden" : "block mt-2")}>
              Click to change image
            </span>
          </label>
        </div>
      </div>
      <div className="create-new-nft-wrapper-2">
        <span className="create-new-nft-wrapper-2-label">Logo Image</span>
        <span className="create-new-nft-wrapper-2-label-type">
          File types supported: JPG and PNG. Max size: 100 MB
        </span>
        <div className="h-40 w-40 rounded-lg relative mt-2">
          <div
            className={`relative h-full w-full ${
              !logoImg ? "hidden" : "block"
            }`}
          >
            <Image
              src={
                logoImg
                  ? //@ts-ignore
                    URL.createObjectURL([...logoImg][0])
                  : "/ape.png"
              }
              alt="user-profile-img-banner"
              objectFit="cover"
              layout="fill"
              className="rounded-lg"
            />
          </div>

          <input
            type="file"
            id="logo"
            onChange={({
              currentTarget: { files },
            }: React.ChangeEvent<HTMLInputElement>) => setLogoImg(files)}
            className="hidden"
            name="img"
          />
          <label
            htmlFor="logo"
            className="absolute inset-0 rounded-lg flex flex-col justify-center items-center bg-[#1c1e3d7f] "
          >
            <Image
              src="/gallery-add.svg"
              alt="add-img-svg"
              width="24px"
              height="24px"
            />
            <span className={clsx(logoImg ? "hidden" : "block text-sm mt-2")}>
              Click to upload image
            </span>
          </label>
        </div>
      </div>
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
