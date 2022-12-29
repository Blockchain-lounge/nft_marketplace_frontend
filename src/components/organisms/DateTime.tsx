import React, { Dispatch, SetStateAction, useState } from "react";
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
  // const [date, setDateSelected] = useState({
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   key: "selection",
  // });
  // const [timeSelected, setTimeSelected] = useState(
  //   new Date().toLocaleTimeString()
  // );

  return (
    <div className="bidder-date-wrapper">
      <DateRange
        ranges={[{ startDate, endDate, key: "selection" }]}
        onChange={handleRangeSelection}
        showMonthAndYearPickers={false}
      />
      <div className="flex items-center justify-between">
        <span className="create-new-nft-wrapper-2-label">Select time</span>
        <TimePicker onChange={handleSelectedTime} value={time} />
      </div>
    </div>
  );
};

export default DateTime;
