import {
  LinkIcon,
  SecureIcon,
  GlobalIcon,
  CloseIcon,
} from "@/src/components/atoms/vectors";

import { Dispatch, SetStateAction } from "react";

interface IDisplayWallet {
  closeModal: (val: boolean) => void;
  setStage: Dispatch<SetStateAction<number>>;
}

const DisplayWallet = ({ closeModal, setStage }: IDisplayWallet) => {
  const handleCloseModal = () => {
    closeModal(false);
    setStage(0);
  };
  const guideArr = [
    {
      name: "link",
      icon: <LinkIcon />,
      description: "Connect to crypto apps with one click",
    },
    {
      name: "secure",
      icon: <SecureIcon />,
      description: "Your private key is stored securely",
    },
    {
      name: "global",
      icon: <GlobalIcon />,
      description: "Works with Ethereum, Polygon, and more",
    },
  ];
  return (
    <div className="display-wallet-wrapper">
      <div className="display-wallet-section-1">
        <div className="display-wallet-ext">
          <h1>Try the Coinbase Wallet extension</h1>
          <span>Install</span>
        </div>
        <div className="display-wallet-guide">
          <span>
            <CloseIcon onClick={handleCloseModal} />
          </span>
          <div className="display-wallet-guide-list">
            {guideArr.map(({ name, icon, description }) => (
              <div key={name} className="display-wallet-guide-name">
                <span className="display-wallet-guide-icon">{icon}</span>
                <span className="display-wallet-guide-description">
                  {description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="display-wallet-section-2 ">
        <div className="display-wallet-section-2-scan">
          <h1>Or scan to connect</h1>
          <span>
            Open <span className="text-[#2257E7]">Coinbase Wallet</span> on your
            mobile phone and scan
          </span>
        </div>
        <div className="display-wallet-section-2-qr">
          <img src="/vectors/qr.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default DisplayWallet;
