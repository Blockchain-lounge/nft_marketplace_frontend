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
interface ICollectionProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
  changeModalType?: Dispatch<SetStateAction<string>>;
}

const CreateCollection: FC<ICollectionProps> = ({
  closeModal,
  changeModalType,
}) => {
  const [userImgBanner, setUserImgBanner] = useState<FileList | null>(null);
  const [collectionCoverArt, setCollectionCoverArt] = useState("");
  const [validationError, setValidationError] = useState(false);
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

  const handleImageFieldChange = (e) => {
    const { files } = e.target;
    var msg = '';
    if (!files[0] || files[0].size == 0 || files[0].size == null) {
      msg = 'Collection cover art is required!';
      alert(msg);
      setValidationError(true);
      return false;
    }
    var fullFileName = (files[0].name);
    fullFileName = fullFileName.toLowerCase();
    var fileExt = fullFileName.substring(0, 1) === '.' ? '' : fullFileName.split('.').slice(1).pop() || '';
    var fileExtArr = ['jpg', 'jpeg', 'png'];
    
    if (fileExtArr.indexOf(fileExt) <= -1) {
      msg = 'Only images of type jpg, jpeg, png are allowed'
      toast(msg);
      return false;
    }

    if (files[0].name >= 5120) {
      // 5mb * 1024kb = 5120
      msg = 'File is larger than 5mb'
      toast(msg);
      return false;
    }
    setCollectionCoverArt(URL.createObjectURL(files[0]));
}

  const handleSubmit = async () => {
    var msg = '';
    if (
      !collectionPayload.collection_name ||
      !collectionPayload.collection_description
    ){
      msg = 'Collection name or/and decsription is still empty'
      toast(msg);
      return false;
    }
    var formData = {
      trackTitle: state.trackTitle,
    }


    // toast(res.message);

    // setTimeout(() => {
    //   setNotification("");
    // }, 100);
  };
  // const handleSubmit = () => {
  //   closeModal((prev) => !prev);
  //   //@ts-ignore
  //   changeModalType("wallet");
  // };
  return (
    <div className="create-new-nft-form max-w-[90%] mx-auto">
      <ToastContainer />
      <div className="create-new-nft-wrapper-2">
        <span className="create-new-nft-wrapper-2-label">File/Media</span>
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
            className="absolute inset-0 rounded-lg flex flex-col justify-center items-center bg-[#1c1e3d7f] mt-2"
          >
            { collectionCoverArt.length ?
            <Image
              src={ collectionCoverArt.length > 0 ? collectionCoverArt : "/ape.png"
              }
              alt="user-profile-img-banner"
              objectFit="cover"
              layout="fill"
              className="rounded-lg"
            />
            :
            <Image
              src="/gallery-add.svg"
              alt="add-img-svg"
              width="24px"
              height="24px"
            />
            }
            <span className={clsx(userImgBanner ? "hidden" : "block")}>
              Click to change image
            </span>
          </label>
        </div>
      </div>
      <Input2
        name="collection_name"
        label="Collection name"
        placeholder="Enter collection name"
        onChange={handleFieldChange}
        value={collectionPayload.name}
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
