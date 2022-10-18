import clsx from "clsx";
import { useRouter } from "next/router";

import {
  CreateNftIcon,
  CreateCollectionIcon,
} from "@/src/components/atoms/vectors";

interface IMiniUserProfile {
  showOptions: boolean;
  onClick: (val: boolean) => void;
}

const CreateNftNavOptions = ({ showOptions, onClick }: IMiniUserProfile) => {
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
      {createNftLinks.map(({ icon, link, to }) => (
        <div
          key={link}
          className="mini-user-profile-links"
          onClick={() => {
            push(to);
            onClick(!showOptions);
          }}
        >
          {icon} <span className="mini-user-profile-link">{link}</span>
        </div>
      ))}
    </div>
  );
};

export default CreateNftNavOptions;
