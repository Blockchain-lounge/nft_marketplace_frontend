import { ReactNode, useCallback, useState } from "react";

import clsx from "clsx";

import { NavBar } from "@/src/components/organisms";
import { Sidebar } from "@/src/components/molecules";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { toggleMobileModal } from "../reducers/modalReducer";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const isMobileModal = useSelector(
    (state: RootState) => state.modal.isMobileModalOpen
  );

  const dispatch = useDispatch();
  const handleMobileModalToggle = () => {
    dispatch(toggleMobileModal());
  };
  const [showProfile, setShowProfile] = useState(false);
  const [showBal, setShowBal] = useState(false);
  const [showCreateNft, setShowCreateNft] = useState(false);

  const handleCloseAllModal = useCallback(() => {
    setShowBal(false);
    setShowProfile(false);
    setShowCreateNft(false);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <NavBar
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        showBal={showBal}
        setShowBal={setShowBal}
        showCreateNft={showCreateNft}
        setShowCreateNft={setShowCreateNft}
      />

      <div className="layout-wrapper">
        {isMobileModal && (
          <div
            className="layout-overlay"
            onClick={handleMobileModalToggle}
          ></div>
        )}

        <aside
          className={clsx(
            "aside",
            isMobileModal ? "hide-mobile-modal" : "show-mobile-modal"
          )}
        >
          <Sidebar />
        </aside>
        <div className="aside-2 text-white" onMouseEnter={handleCloseAllModal}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
