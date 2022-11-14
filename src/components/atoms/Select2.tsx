import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import clsx from "clsx";
import CaretDown from "./vectors/caret-down";

const Select2 = ({
  title,
  twClasses,
  icon,
  placeholder,
  lists,
  onClick,
  wt,
}: {
  title: string;
  wt?: string;
  twClasses?: string;
  icon?: any;
  placeholder: string;
  lists: Array<Record<string, string>>;
  onClick: Dispatch<SetStateAction<Record<string, string> | string>>;
}) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const handleOpenSubmenu = () => {
    setOpenSubmenu((prev) => !prev);
  };
  const handleSelect = (params: Record<string, string>) => {
    onClick(params);
    setOpenSubmenu((prev) => !prev);
  };

  return (
    <div className={clsx("relative", twClasses)}>
      <div className="select" onClick={handleOpenSubmenu}>
        <span className="flex space-x-2 items-center">
          {icon} {placeholder || title}
        </span>
        <span
          className={clsx(
            "sidebar-toggle-btn cursor-pointer",
            openSubmenu && "sidebar-open"
          )}
        >
          <CaretDown />
        </span>
      </div>
      <div
        className={clsx(
          "select-lists",
          wt ? wt : "w-[9rem]",
          !openSubmenu ? "hidden" : "flex"
        )}
      >
        {lists.map((label, i) => (
          <span
            key={label.name + i}
            className="py-[0.85rem] lg:py-4 px-2 lg:px-3 capitalize cursor-pointer hover:bg-bg-3 rounded-md"
            onClick={() => handleSelect(label)}
          >
            {label.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Select2;
