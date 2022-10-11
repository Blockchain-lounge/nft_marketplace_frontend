import clsx from "clsx";
import { useState } from "react";
import Link from "next/link";
import CaretDown from "./vectors/caret-down";
import { useRouter } from "next/router";

const SidebarLink = ({ item }: { item: any }) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const handleOpenSubmenu = () => setOpenSubmenu(!openSubmenu);
  const { pathname } = useRouter();

  return item.subLinks ? (
    <div
      className={clsx("sidebar-menu", item.link === pathname && "bg-[#212346]")}
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
      </div>
      <div
        className={clsx(
          "sidebar-submenu",
          openSubmenu && "sidebar-sublink-open"
        )}
      >
        {item.subLinks &&
          item.subLinks.map((value: any) => (
            <Link key={value.label} href={value.link}>
              <a className="sidebar-submenu-wrapper">
                <div></div>
                <span>{value.label}</span>
              </a>
            </Link>
          ))}
      </div>
    </div>
  ) : (
    <Link href={item.link}>
      <a
        className={clsx(
          "sidebar-menu",
          item.link === pathname && "bg-[#212346]"
        )}
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
        </div>
      </a>
    </Link>
  );
};

export default SidebarLink;
