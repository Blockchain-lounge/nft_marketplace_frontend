import clsx from "clsx";
import { useRouter } from "next/router";

import {
  CreateNftIcon,
  CreateCollectionIcon,
} from "@/src/components/atoms/vectors";
import { Dispatch, SetStateAction } from "react";

interface IMiniUserProfile {
  showOptions: boolean;
  onClick: (val: boolean) => void;
  modalType: Dispatch<SetStateAction<string>>;
  showModal: Dispatch<SetStateAction<boolean>>;
}

const CreateNftNavOptions = ({
  showOptions,
  onClick,
  modalType,
  showModal,
}: IMiniUserProfile) => {
  const createNftLinks = [
    {
      link: "Create NFT",
      icon: <CreateNftIcon />,
      to: "/create-new-nft",
    },
    {
      link: "Create Collection",
      icon: <CreateCollectionIcon />,
      to: "/create-collection",
    },
    // {
    //   link: "Import Collection",
    //   icon: <CreateCollectionIcon />,
    //   to: "/import-collection",
    // },
  ];
  const { push } = useRouter();
  return (
    <div
      className={clsx(
        "mini-user-profile-wrapper",
        showOptions ? "flex duration-300 right-32" : "hidden"
      )}
      onMouseLeave={() => onClick(false)}
    >
      {createNftLinks.map(({ icon, link, to }) => (
        <div
          key={link}
          className="mini-user-profile-links"
          onClick={() => {
            push(to);
          }}
        >
          {icon} <span className="mini-user-profile-link">{link}</span>
        </div>
      ))}
    </div>
  );
};

export default CreateNftNavOptions;
