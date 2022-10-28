import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import clsx from "clsx";
import CaretDown from "./vectors/caret-down";

const Select = ({
  title,
  twClasses,
  icon,
  placeholder,
  lists,
  onClick,
}: {
  title: string;
  twClasses?: string;
  icon?: any;
  placeholder: string;
  lists: Array<string>;
  onClick: Dispatch<SetStateAction<string>>;
}) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const handleOpenSubmenu = () => {
    setOpenSubmenu((prev) => !prev);
  };
  const handleSelect = (params: string) => {
    onClick(params);
    setOpenSubmenu((prev) => !prev);
  };

  return (
    <div className={clsx("relative", twClasses)}>
      <div className="select" onClick={handleOpenSubmenu}>
        <span className="flex space-x-2 items-center">
          {icon} {title}
        </span>
        <span
          className={clsx("sidebar-toggle-btn", openSubmenu && "sidebar-open")}
        >
          <CaretDown />
        </span>
      </div>
      <div
        className={clsx(
          "select-lists w-full",
          !openSubmenu ? "hidden" : "flex"
        )}
      >
        {lists.map((label, i) => (
          <span
            key={label + i}
            className="py-[0.85rem] lg:py-4 px-2 lg:px-3 capitalize cursor-pointer hover:bg-bg-3 rounded-md"
            onClick={() => handleSelect(label)}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Select;
