import { ReactNode, useCallback, useState } from "react";

import clsx from "clsx";

import { Footer, NavBar } from "@/src/components/organisms";
import { MiniUserWallet, Sidebar } from "@/src/components/molecules";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { toggleMobileModal } from "../reducers/modalReducer";
import Loader2 from "../components/atoms/Loader2";

const DashboardLayout = ({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading?: boolean;
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showBal, setShowBal] = useState(false);
  const [showCreateNft, setShowCreateNft] = useState(false);

  const isMobileModal = useSelector(
    (state: RootState) => state.modal.isMobileModalOpen
  );

  const dispatch = useDispatch();
  const handleMobileModalToggle = () => {
    dispatch(toggleMobileModal());
  };

  const handleCloseAllModal = useCallback(() => {
    setShowBal(false);
    setShowProfile(false);
    setShowCreateNft(false);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden w-full">
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
        <div className="lg:hidden">
          <MiniUserWallet showBal={showBal} onClick={setShowBal} />
        </div>
        <div
          className="aside-2 text-white scrollbar-hide"
          onMouseEnter={handleCloseAllModal}
        >
          {isLoading ? (
            <div className="h-[80vh] inset-0 flex justify-center items-center">
              <Loader2 />
            </div>
          ) : (
            <>
              <div className="scrollbar-hide pt-4 center">{children}</div>
              <Footer />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
