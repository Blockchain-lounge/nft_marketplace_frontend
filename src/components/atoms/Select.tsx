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
  onClick2,
}: {
  title: string;
  twClasses?: string;
  icon?: any;
  placeholder: string;
  lists: Array<any>;
  onClick: Dispatch<SetStateAction<string>>;
  onClick2?: (val: { label: string; id: string }) => void;
}) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const handleOpenSubmenu = () => {
    setOpenSubmenu((prev) => !prev);
  };
  const handleSelect = (params: string) => {
    onClick(params);
    setOpenSubmenu((prev) => !prev);
  };
  const handleSelect2 = (file: { label: string; id: string }) => {
    (onClick2 as (file: { label: string; id: string }) => void)(file);
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
                onClick={() =>
                  handleSelect2({ label: label.name, id: label._id })
                }
              >
                {label.collectionLogoImage ? (
                  <div className="relative h-12 w-12">
                    <Image
                      src={label.collectionLogoImage}
                      alt={label.name}
                      layout="fill"
                      className="rounded-full"
                    />
                  </div>
                ) : null}
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
