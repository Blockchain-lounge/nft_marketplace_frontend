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

interface ICollectionProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
  changeModalType?: Dispatch<SetStateAction<string>>;
}

const CreateCollection: FC<ICollectionProps> = ({
  closeModal,
  changeModalType,
}) => {
  const [userImgBanner, setUserImgBanner] = useState<FileList | null>(null);
  const [collectionPayload, setCollectionPayload] = useState({
    name: "",
    description: "",
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
  const handleSubmit = () => {
    closeModal((prev) => !prev);
    //@ts-ignore
    changeModalType("wallet");
  };
  return (
    <div className="create-new-nft-form max-w-[90%] mx-auto">
      <div className="create-new-nft-wrapper-2">
        <span className="create-new-nft-wrapper-2-label">File/Media</span>
        <span className="create-new-nft-wrapper-2-label-type">
          File types supported: JPG and PNG. Max size: 100 MB
        </span>
        <div className="h-56 rounded-lg relative mt-2">
          <div
            className={`relative h-full w-full ${
              !userImgBanner ? "hidden" : "block"
            }`}
          >
            <Image
              src={
                userImgBanner
                  ? //@ts-ignore
                    URL.createObjectURL([...userImgBanner][0])
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
            id="userImg"
            onChange={({
              currentTarget: { files },
            }: React.ChangeEvent<HTMLInputElement>) => setUserImgBanner(files)}
            className="hidden"
            name="img"
          />
          <label
            htmlFor="userImg"
            className="absolute inset-0 rounded-lg flex flex-col justify-center items-center bg-[#1c1e3d7f] mt-2"
          >
            <Image
              src="/gallery-add.svg"
              alt="add-img-svg"
              width="24px"
              height="24px"
            />
            <span className={clsx(userImgBanner ? "hidden" : "block")}>
              Click to change image
            </span>
          </label>
        </div>
      </div>
      <Input2
        name="name"
        label="Collection name"
        placeholder="Enter collection name"
        onChange={handleFieldChange}
        value={collectionPayload.name}
        required
      />
      <Input2
        name="description"
        label="Description"
        placeholder="Provide some details about your collection"
        onChange={handleFieldChange}
        value={collectionPayload.description}
      />
      <Button
        title="Create collection"
        twClasses="w-full"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default CreateCollection;
