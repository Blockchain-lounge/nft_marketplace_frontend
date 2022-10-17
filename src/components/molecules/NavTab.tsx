import { useState } from "react";
import clsx from "clsx";

import { CaretDown } from "@/src/components/atoms/vectors";

const NavTab = () => {
  const [active, setActive] = useState(0);
  const tabsArr = ["All", "Art", "CGI", "Gaming", "Utility"];
  return (
    <div className="nav-tab-wrapper">
      {tabsArr.map((tab, i) => (
        <div key={tab}>
          <span
            className={clsx("tab", i === active && "relative")}
            onClick={() => setActive(i)}
          >
            {tab}
          </span>
        </div>
      ))}
      <span className="tab-select">
        More <CaretDown color="#9f9f9f" />
      </span>
    </div>
  );
};

export default NavTab;
