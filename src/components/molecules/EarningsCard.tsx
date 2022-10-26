import { useRouter } from "next/router";
import { BigCoinIcon, ViewHistoryArrowIcon } from "../atoms/vectors";
import clsx from "clsx";

const EarningsCard = ({
  label,
  coinsAmount,
  remainingAmount,
  history,
}: {
  history?: string;
  label: string;
  coinsAmount: number;
  remainingAmount: string;
}) => {
  const { push } = useRouter();
  //navigate to user earning history
  const handleNavigateToHistory = () => {
    push(history as string);
  };
  return (
    <div
      className={clsx(
        "earnings-card-wrapper",
        !history
          ? "bg-[#1a1c389d] drop-shadow-md"
          : "bg-transparent border-border-1-line border"
      )}
    >
      <span className="earnings-card-label">{label}</span>
      <div className="earnings-card-balance">
        <div className="earnings-card-coin-bal">
          <BigCoinIcon />{" "}
          <span className="earnings-card-coin-amt">{coinsAmount}</span>
        </div>
        <div className="earnings-card-amount-bal">
          <span className="earnings-card-remainig-amt-bal">
            ${remainingAmount}
          </span>
          {history && (
            <div
              className="earnings-card-view-history"
              onClick={handleNavigateToHistory}
            >
              <span className="earnings-card-history cursor-pointer">
                view history
              </span>
              <ViewHistoryArrowIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarningsCard;
