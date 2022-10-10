import React from "react";

import { Heading, Select } from "@/src/components/atoms";
import { ShortNextArrow } from "@/src/components/atoms/vectors";

interface INftheader {
  heading: string;
  selectTitle: string;
}

const NftHeader = ({ heading, selectTitle }: INftheader) => {
  return (
    <div className="nft-header-wrapper">
      <div className="flex flex-col w-full lg:w-[60%]">
        <div className="nft-head">
          <Heading
            title={heading}
            twClasses={`text-[1.75rem] leading-[2rem] lg:text-5xl lg:leading-[3.58rem] mt-0 whitespace-nowrap ${
              heading === "Explore Art" && "mb-4"
            }`}
          />
          {selectTitle && <Select title={selectTitle} />}
        </div>
        <div className="nft-head-bg"></div>
      </div>
      <div className="hidden lg:block">
        <span className="nft-tail">
          See All <ShortNextArrow />
        </span>
      </div>
    </div>
  );
};

export default NftHeader;
