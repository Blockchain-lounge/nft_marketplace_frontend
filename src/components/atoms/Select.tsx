import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import clsx from "clsx";
import CaretDown from "./vectors/caret-down";
import Image from "next/image";

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
  lists: Array<any>;
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
          {icon} {placeholder || title}
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
        {typeof lists[0] === "string"
          ? lists.map((label, i) => (
              <span
                key={label + i}
                className="py-[0.85rem] lg:py-4 px-2 lg:px-3 capitalize cursor-pointer hover:bg-bg-3 rounded-md"
                onClick={() => handleSelect(label)}
              >
                {label}
              </span>
            ))
          : lists.map((label, i) => (
              <div
                key={label._id}
                className="py-[0.85rem] lg:py-4 px-2 lg:px-3 cursor-pointer hover:bg-bg-3 rounded-md flex items-center gap-x-4"
                onClick={() => handleSelect(label.name)}
              >
                <div className="relative h-12 w-12">
                  <Image
                    src={label.collectionLogoImage}
                    alt={label.name}
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
                <span key={label + i} className="capitalize">
                  {label.name}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Select;
