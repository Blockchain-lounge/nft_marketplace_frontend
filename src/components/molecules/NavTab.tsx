import { useState } from "react";
import clsx from "clsx";

import { CaretDown } from "@/src/components/atoms/vectors";

const NavTab = () => {
  const [active, setActive] = useState(0);
  const tabsArr = [
    "All",
    "Utility",
    "Art",
    "Collectibles",
    "Photography",
    "Virtual World",
  ];
  return (
    <div className="nav-tab-wrapper">
      {tabsArr.map((tab, i) => (
        <div key={tab}>
          <span
            className={clsx("tab", i === active && "border-b-2")}
            onClick={() => setActive(i)}
          >
            {tab}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NavTab;
