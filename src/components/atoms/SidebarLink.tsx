import clsx from "clsx";
import { useState } from "react";
import Link from "next/link";
import CaretDown from "./vectors/caret-down";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggleMobileModal } from "@/src/reducers/modalReducer";

const SidebarLink = ({ item }: { item: any }) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const dispatch = useDispatch();
  const handleOpenSubmenu = () => setOpenSubmenu(!openSubmenu);
  const { pathname, push } = useRouter();

  return item.subLinks ? //         openSubmenu && "sidebar-open", //         "sidebar-toggle-btn", //       className={clsx( //     <span //     </div> //       <span className="sidebar-label">{item.label}</span> //       <span className="sidebar-icon">{item.icon}</span> //     <div className="sidebar-title"> //   <div className="sidebar-title-wrapper"> // > //   className={clsx("sidebar-menu", item.link === pathname && "bg-[#212346]")} // <div
  //         !item.subLinks ? "hidden" : "block"
  //       )}
  //       onClick={handleOpenSubmenu}
  //     >
  //       <CaretDown />
  //     </span>
  //     {item.tag && <span className="sidebar-tag">{item.tag}</span>}
  //   </div>
  //   <div
  //     className={clsx(
  //       "sidebar-submenu",
  //       openSubmenu && "sidebar-sublink-open"
  //     )}
  //   >
  //     {item.subLinks &&
  //       item.subLinks.map((value: any) => (
  //         <Link key={value.label} href={value.link}>
  //           <a className="sidebar-submenu-wrapper">
  //             <div></div>
  //             <span>{value.label}</span>
  //           </a>
  //         </Link>
  //       ))}
  //   </div>
  // </div>
  null : (
    //  href={item.link}
    <div
      className={clsx("sidebar-menu", item.link === pathname && "bg-[#212346]")}
      onClick={() => {
        push(item.link);
        dispatch(toggleMobileModal());
      }}
    >
      <div className="sidebar-title-wrapper">
        <div className="sidebar-title">
          <span className="sidebar-icon">{item.icon}</span>
          <span className="sidebar-label">{item.label}</span>
        </div>
        <span
          className={clsx(
            "sidebar-toggle-btn",
            openSubmenu && "sidebar-open",
            !item.subLinks ? "hidden" : "block"
          )}
          onClick={handleOpenSubmenu}
        >
          <CaretDown />
        </span>
        {item.tag && <span className="sidebar-tag">{item.tag}</span>}
        {item.count && (
          <span className="connect-header-wrapper-count">{item.count}</span>
        )}
      </div>
    </div>
  );
};

export default SidebarLink;
