import React, { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

//@ts-ignore
import TimePicker from "react-time-picker/dist/entry.nostyle";

interface IDateTimeProps {
  startDate: Date;
  endDate: Date;
  time: String;
  handleRangeSelection: (range: any) => void;
  handleSelectedTime: Dispatch<SetStateAction<string>>;
}

const DateTime = ({
  startDate = new Date(),
  endDate = new Date(),
  time = new Date().toLocaleTimeString(),
  handleRangeSelection,
  handleSelectedTime,
}: IDateTimeProps) => {
  return (
    <div className="bidder-date-wrapper">
      <DateRange
        ranges={[{ startDate, endDate, key: "selection" }]}
        onChange={handleRangeSelection}
        showMonthAndYearPickers={false}
        calendarFocus="forwards"
        focusedRange={[0, 1]}
        initialFocusedRange={[0, 0]}
      />
      <div className="flex items-center justify-between">
        <span className="create-new-nft-wrapper-2-label">Select time</span>
        <TimePicker onChange={handleSelectedTime} value={time} />
      </div>
    </div>
  );
};

export default DateTime;
