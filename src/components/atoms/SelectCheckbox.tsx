import React, { Dispatch, useState } from "react";
import clsx from "clsx";
import CaretDown from "./vectors/caret-down";
import Checkbox from "./Checkbox";
import Image from "next/image";

export interface ISelectCheckProps {
  label: string;
  isVerified?: boolean;
  img?: string;
  checked: boolean;
}

const SelectCheckbox = ({
  title,
  twClasses,
  selectedLists,
  lists,
  setLists,
  newLists,
}: {
  title: string;
  twClasses?: string;
  selectedLists: ISelectCheckProps[];
  setLists?: Dispatch<React.SetStateAction<ISelectCheckProps[]>>;
  lists: Array<ISelectCheckProps>;
  newLists: Dispatch<React.SetStateAction<ISelectCheckProps[]>>;
}) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const handleOpenSubmenu = () => {
    setOpenSubmenu((prev) => !prev);
  };

  const handleOnChange = (i: number) => {
    const updatedLists = lists.map((label, index) => {
      if (i === index) {
        label.checked = !label.checked;
      }
      return label;
    });

    //@ts-ignore
    setLists(updatedLists);

    const filteredLists = updatedLists
      .map((val) => {
        if (val.checked) {
          return val;
        }
      })
      .filter((val) => val !== undefined);
    newLists(filteredLists as ISelectCheckProps[]);
  };

  return (
    <div className={clsx("relative", twClasses)}>
      <div className="select" onClick={handleOpenSubmenu}>
        <span className="flex space-x-6 items-center">{title}</span>
        <span
          className={clsx("sidebar-toggle-btn", openSubmenu && "sidebar-open")}
        >
          <CaretDown />
        </span>
      </div>
      <div className={clsx("select-lists", !openSubmenu ? "hidden" : "flex")}>
        {lists.map(({ label, img, isVerified, checked }, i) => (
          <div
            key={label + i}
            className="py-[0.85rem] lg:py-4 px-2 lg:px-3 capitalize cursor-pointer hover:bg-bg-3 rounded-md flex items-center justify-between gap-x-10"
          >
            <div className="flex items-center gap-x-3">
              {img && (
                <span className="relative h-[2.375rem] w-[2.375rem]">
                  <Image
                    src={img as string}
                    alt={label}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </span>
              )}
              {label}
              {isVerified && (
                <span className="relative h-5 w-5">
                  <Image
                    src="/images/verify.svg"
                    alt={label}
                    layout="fill"
                    objectFit="cover"
                  />
                </span>
              )}
            </div>
            <Checkbox checked={checked} onChange={() => handleOnChange(i)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCheckbox;
