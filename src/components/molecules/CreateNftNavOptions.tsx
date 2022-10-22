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
      action: "collection",
    },
  ];
  const { push } = useRouter();
  return (
    <div
      className={clsx(
        "mini-user-profile-wrapper",
        showOptions
          ? "transition-[right] duration-300 right-20"
          : "transition-[right] ease-in-out duration-300 right-[-50rem]"
      )}
    >
      {createNftLinks.map(({ icon, link, to, action }) => (
        <div
          key={link}
          className="mini-user-profile-links"
          onClick={() => {
            if (to) {
              push(to);
            }
            onClick(!showOptions);
            if (action) {
              showModal(true);
              modalType("collection");
            }
          }}
        >
          {icon} <span className="mini-user-profile-link">{link}</span>
        </div>
      ))}
    </div>
  );
};

export default CreateNftNavOptions;
