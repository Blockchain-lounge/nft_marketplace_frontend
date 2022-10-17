import clsx from "clsx";

import {
  CreateNftIcon,
  CreateCollectionIcon,
} from "@/src/components/atoms/vectors";

interface IMiniUserProfile {
  showOptions: boolean;
  onClick?: () => void;
}

const CreateNftNavOptions = ({ showOptions, onClick }: IMiniUserProfile) => {
  const createNftLinks = [
    {
      link: "Create NFT",
      icon: <CreateNftIcon />,
      to: "",
    },
    {
      link: "Create Collection",
      icon: <CreateCollectionIcon />,
      to: "",
    },
  ];
  return (
    <div
      className={clsx(
        "mini-user-profile-wrapper",
        showOptions
          ? "transition-[right] duration-300 right-20"
          : "transition-[right] ease-in-out duration-300 right-[-50rem]"
      )}
    >
      {createNftLinks.map(({ icon, link }) => (
        <div key={link} className="mini-user-profile-links" onClick={onClick}>
          {icon} <span className="mini-user-profile-link">{link}</span>
        </div>
      ))}
    </div>
  );
};

export default CreateNftNavOptions;
