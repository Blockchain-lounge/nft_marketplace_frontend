import React, { Dispatch, SetStateAction, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

//@ts-ignore
import TimePicker from "react-time-picker/dist/entry.nostyle";

interface IDateTimeProps {
  date: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  handleRange: () => void;
  time: Dispatch<SetStateAction<string>>;
}

const DateTime = () => {
  const [date, setDateSelected] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [timeSelected, setTimeSelected] = useState(
    new Date().toLocaleTimeString()
  );

  const handleRangeSelection = (ranges: any) => {
    setDateSelected(ranges.selection);
  };
  return (
    <div className="bidder-date-wrapper">
      <DateRange
        ranges={[date]}
        onChange={handleRangeSelection}
        showMonthAndYearPickers={false}
      />
      <div className="flex items-center justify-between">
        <span className="create-new-nft-wrapper-2-label">Select time</span>
        <TimePicker onChange={setTimeSelected} value={timeSelected} />
      </div>
    </div>
  );
};

export default DateTime;
