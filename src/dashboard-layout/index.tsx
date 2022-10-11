import clsx from "clsx";

import NavBar from "../../components/organisms/nav-bar";
import AsideBar from "../../components/molecules/aside";
import "./layout-1.scss";
import { useSelector } from "react-redux";

const DashboardLayout = ({ children, active = true }) => {
  const isMobileModal = useSelector(({ modal }) => modal.isMobileModalOpen);

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
          <AsideBar />
        </aside>
        <div className="aside-2 text-white">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
