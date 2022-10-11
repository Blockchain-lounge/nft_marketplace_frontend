import { ReactNode } from "react";

import clsx from "clsx";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import { NavBar } from "@/src/components/organisms";
import { Sidebar } from "@/src/components/molecules";

const DashboardLayout = ({
  children,
  active = true,
}: {
  children: ReactNode;
  active?: boolean;
}) => {
  const isMobileModal = useSelector(
    (state: RootState) => state.modal.isMobileModalOpen
  );

  return (
    <div className="flex flex-col w-full">
      <NavBar />
      <div className="layout-wrapper">
        {isMobileModal && <div className="layout-overlay"></div>}

        <aside
          className={clsx(
            "aside",
            isMobileModal ? "-left-[-2rem]" : "-left-[40rem]"
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
