import clsx from "clsx";
import React, { Dispatch, SetStateAction } from "react";

const Tab = ({
  stages,
  setStage,
  placeholder,
}: {
  placeholder: string;
  stages: string[];
  setStage: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex gap-x-6 lg:gap-x-11 items-center border-b-[0.1px] border-border-2-line my-12 overflow-x-auto lg:overflow-hidden scrollbar-hide">
      {stages.map((stage: string) => (
        <span
          key={stage}
          onClick={() => setStage(stage)}
          className={clsx(
            "view-nft-stage whitespace-nowrap",
            stage.toLowerCase() === placeholder.toLowerCase() &&
              "text-white border-b-[2.5px]"
          )}
        >
          {stage}
        </span>
      ))}
    </div>
  );
};

export default Tab;
