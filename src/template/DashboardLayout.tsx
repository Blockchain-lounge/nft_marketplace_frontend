import { ReactNode } from "react";

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

  return (
    <div className="flex flex-col w-full">
      <NavBar />

      <div className="layout-wrapper ">
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
        <div className="aside-2 text-white">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
